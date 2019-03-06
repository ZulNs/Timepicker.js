/*
 * Directly Draggable Analog Clock Timepicker
 *
 * Design by ZulNs @Yogyakarta, February 2016
 *
 * Revised on 25 February 2019:
 *    - Drops timepicker.css
 *    - Adds/changes clock theme
 *    - Changes some public methods
 */
'use strict';
function Timepicker(isClk,is24H,isLight,hour,minute){
	isClk=!!isClk;
	is24H=!!is24H;
	isLight=!!isLight;
	hour=hour==undefined?Timepicker.getHours():~~hour%24;
	minute=minute==undefined?Timepicker.getMinutes():~~minute%60;
	let self=this,
		tpick=document.createElement('div'),
		clkFace=document.createElement('canvas'),
		hourHand=document.createElement('canvas'),
		minuteHand=document.createElement('canvas'),
		secondHand=document.createElement('canvas'),
		timeStr=document.createElement('div'),
		pickBtn=document.createElement('button'),
		isHidden=true,
		isPM=hour>=12,
		isHourHand,
		isReverseRotate,
		isDragging=false,
		isFiredByMouse=false,
		touchId,
		lastHourDeg,
		lastMinuteDeg,
		centerX,
		centerY,
		cssTransform=Timepicker.getSupportedTransformProp(),
		timerId,
		second=Timepicker.getSeconds(),
	onMouseDown=function(e){
		if(!isDragging){
			e=e||window.event;
			e.preventDefault();
			e.stopPropagation();
			isFiredByMouse=true;
			isHourHand=e.target==hourHand;
			onPtrStart(e.pageX,e.pageY)
		}
	},
	onMouseMove=function(e){
		if(isDragging&&isFiredByMouse){
			e=e||window.event;
			e.preventDefault();
			onPtrMove(e.pageX,e.pageY)
		}
	},
	onMouseUp=function(e){
		if(isDragging&&isFiredByMouse){
			e=e||window.event;
			e.preventDefault();
			isDragging=false
		}
	},
	onTouchStart=function(e){
		e=e||window.event;
		if(isDragging&&!isFiredByMouse&&e.touches.length==1)isDragging=false;
		if(!isDragging){
			let touch=e.changedTouches[0];
			e.preventDefault();
			//e.stopPropagation();
			isFiredByMouse=false;
			touchId=touch.identifier;
			isHourHand=touch.target==hourHand;
			onPtrStart(touch.pageX,touch.pageY)
		}
	},
	onTouchMove=function(e){
		if(isDragging&&!isFiredByMouse){
			e=e||window.event;
			let touches=e.changedTouches,touch;
			for(let i=0;i<touches.length;i++){
				touch=touches[i];
				if(touch.identifier==touchId){
					e.preventDefault();
					onPtrMove(touch.pageX,touch.pageY);
					break
				}
			}
		}
	},
	onTouchEnd=function(e){
		if(isDragging&&!isFiredByMouse){
			e=e||window.event;
			let touches=e.changedTouches,touch;
			for(let i=0;i<touches.length;i++){
				touch=touches[i];
				if(touch.identifier==touchId){
					e.preventDefault();
					isDragging=false;
					return
				}
			}
		}
	},
	onPtrStart=function(x,y){
		isDragging=true;
		centerX=tpick.offsetLeft+hourHand.offsetLeft+10;
		centerY=tpick.offsetTop+hourHand.offsetTop+70;
		let last=isHourHand?lastHourDeg:lastMinuteDeg,
			deg=-Math.atan2(centerX-x,centerY-y)*180/Math.PI,
			dif=Math.abs(deg-last);
		isReverseRotate=(160<dif&&dif<200)
	},
	onPtrMove=function(x,y){
		let deg,last,target;
		if(x!=centerX||y!=centerY){
			deg=-Math.atan2(centerX-x,centerY-y)*180/Math.PI;
			if(isReverseRotate)deg=deg-180;
			if(deg<0)deg+=360;
			target=isHourHand?hourHand:minuteHand;
			rotateElm(target,deg);
			if(isHourHand){
				if((0<=deg&&deg<90&&270<lastHourDeg&&lastHourDeg<360)||(0<=lastHourDeg&&lastHourDeg<90&&270<deg&&deg<360))isPM=!isPM;
				lastHourDeg=deg;
				lastMinuteDeg=deg%30*12;
				rotateElm(minuteHand,lastMinuteDeg)
			}else{
				if((270<lastMinuteDeg&&lastMinuteDeg<360&&0<=deg&&deg<90)||(270<deg&&deg<360&&0<=lastMinuteDeg&&lastMinuteDeg<90)){
					lastHourDeg=lastHourDeg+(deg-lastMinuteDeg-Timepicker.sign(deg-lastMinuteDeg)*360)/12;
					if(lastHourDeg<0)lastHourDeg+=360;
					lastHourDeg%=360;
					if(345<lastHourDeg||lastHourDeg<15)isPM=!isPM
				}else{
					lastHourDeg=lastHourDeg+(deg-lastMinuteDeg)/12;
					if(lastHourDeg<0)lastHourDeg+=360;
					lastHourDeg%=360
				}
				lastMinuteDeg=deg;
				rotateElm(hourHand,lastHourDeg)
			}
			minute=6*lastHourDeg/180;
			hour=~~minute;
			minute=Math.floor((minute-hour)*60);
			if(isPM)hour+=12;
			updPickedTm()
		}
	},
	onPick=function(){
		self.hide();
		if(typeof self.onPicked=='function')self.onPicked()
	},
	updPickedTm=function(){
		timeStr.innerText=getTmStr()
	},
	updClkTm=function(){
		second=Timepicker.getSeconds();
		if(isClk)timerId=setTimeout(updClkTm,1e3-Timepicker.getMillis());
		if(second==0){
			minute=Timepicker.getMinutes();
			hour=Timepicker.getHours();
			updPickedTm()
		}
		updClkPtrs()
	},
	updClkPtrs=function(){
		let sec=second*6;
		lastMinuteDeg=(minute+sec/360)*6;
		lastHourDeg=(hour%12+lastMinuteDeg/360)*30;
		rotateElm(hourHand,lastHourDeg);
		rotateElm(minuteHand,lastMinuteDeg);
		rotateElm(secondHand,sec)
	},
	getTmStr=function(){
		let s=('0'+(is24H?hour:hour%12==0?12:hour%12)).slice(-2)+':'+('0'+minute).slice(-2);
		if(!is24H)s+=' '+(isPM?'PM':'AM');
		return s
	},
	rotateElm=function(elm,deg){elm.style[cssTransform]='rotate('+deg+'deg)'},
	scrollToFix=function(){
		let dw=document.body.offsetWidth,
			vw=window.innerWidth,
			vh=window.innerHeight,
			rect=tpick.getBoundingClientRect(),
			hsSpc=dw>vw?20:0,
			scrollX=rect.left<0?rect.left:0,
			scrollY=rect.bottom-rect.top>vh?rect.top:rect.bottom>vh-hsSpc?rect.bottom-vh+hsSpc:0;
		window.scrollBy(scrollX,scrollY)
	},
	addEvts=function(){
		Timepicker.addEvent(hourHand,'mousedown',onMouseDown);
		Timepicker.addEvent(minuteHand,'mousedown',onMouseDown);
		Timepicker.addEvent(document,'mousemove',onMouseMove);
		Timepicker.addEvent(document,'mouseup',onMouseUp);
		if('touchstart' in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0){
			Timepicker.addEvent(hourHand,'touchstart',onTouchStart);
			Timepicker.addEvent(hourHand,'touchmove',onTouchMove);
			Timepicker.addEvent(hourHand,'touchcancel',onTouchEnd);
			Timepicker.addEvent(hourHand,'touchend',onTouchEnd);
			Timepicker.addEvent(minuteHand,'touchstart',onTouchStart);
			Timepicker.addEvent(minuteHand,'touchmove',onTouchMove);
			Timepicker.addEvent(minuteHand,'touchcancel',onTouchEnd);
			Timepicker.addEvent(minuteHand,'touchend',onTouchEnd)
		}
	},
	remEvts=function(){
		Timepicker.removeEvent(hourHand,'mousedown',onMouseDown);
		Timepicker.removeEvent(minuteHand,'mousedown',onMouseDown);
		Timepicker.removeEvent(document,'mousemove',onMouseMove);
		Timepicker.removeEvent(document,'mouseup',onMouseUp);
		if('touchstart' in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0){
			Timepicker.removeEvent(hourHand,'touchstart',onTouchStart);
			Timepicker.removeEvent(hourHand,'touchmove',onTouchMove);
			Timepicker.removeEvent(hourHand,'touchcancel',onTouchEnd);
			Timepicker.removeEvent(hourHand,'touchend',onTouchEnd);
			Timepicker.removeEvent(minuteHand,'touchstart',onTouchStart);
			Timepicker.removeEvent(minuteHand,'touchmove',onTouchMove);
			Timepicker.removeEvent(minuteHand,'touchcancel',onTouchEnd);
			Timepicker.removeEvent(minuteHand,'touchend',onTouchEnd)
		}
	},
	create=function(){
		// Initialize
		clkFace.setAttribute('width',240);
		clkFace.setAttribute('height',240);
		hourHand.setAttribute('width',20);
		hourHand.setAttribute('height',90);
		minuteHand.setAttribute('width',12);
		minuteHand.setAttribute('height',110);
		secondHand.setAttribute('width',8);
		secondHand.setAttribute('height',120);
		tpick.style.cssText='position:relative;width:240px';
		clkFace.style.cssText='position:absolute;left:0px;top:0px';
		hourHand.style.cssText='position:absolute;left:110px;top:50px;transform-origin:50% 70px';
		minuteHand.style.cssText='position:absolute;left:114px;top:30px;transform-origin:50% 90px';
		secondHand.style.cssText='position:absolute;left:116px;top:30px;transform-origin:50% 90px';
		timeStr.style.cssText='position:absolute;left:60px;top:248px;width:120px;text-align:center;font:24px Verdana;cursor:default';
		pickBtn.style.cssText='position:absolute;left:90px;top:288px;width:60px;height:32px;font:18px Verdana;cursor:pointer';
		pickBtn.innerHTML='Pick';
		tpick.style.display='none';
		tpick.appendChild(clkFace);
		tpick.appendChild(hourHand);
		tpick.appendChild(minuteHand);
		tpick.appendChild(secondHand);
		tpick.appendChild(timeStr);
		tpick.appendChild(pickBtn);
		tpick.style.height=isClk?'240px':'320px';
		if(isClk){
			timeStr.style.display=pickBtn.style.display='none';
			updClkTm()
		}
		else{
			addEvts();
			Timepicker.setCursor(hourHand,true);
			Timepicker.setCursor(minuteHand,true);
			secondHand.style.display='none'
		}
		Timepicker.addEvent(pickBtn,'click',onPick);
		updClkPtrs();
		updPickedTm();
		setClkTheme()
	},
	setClkTheme=function(){
		// Create clock surface
		let ctx=clkFace.getContext('2d');
		ctx.strokeStyle=isLight?'#000':'#fff';
		ctx.beginPath();
		ctx.arc(120,120,119,0,2*Math.PI);
		ctx.stroke();
		let radGrd=ctx.createRadialGradient(120,120,1,120,120,120);
		radGrd.addColorStop(0,isLight?'#e7e7e7':'#000');
		radGrd.addColorStop(1,isLight?'#fff':'#171717');
		ctx.fillStyle=radGrd;
		ctx.beginPath();
		ctx.arc(120,120,118,0,2*Math.PI);
		ctx.fill();
		ctx.translate(120,120);
		ctx.fillStyle=isLight?'#000':'#fff';
		for(let i=0;i<12;i++){
			ctx.beginPath();
			ctx.arc(0,-110,2,0,2*Math.PI);
			ctx.fill();
			ctx.rotate(Math.PI/30);
			for(let j=0;j<4;j++){
				ctx.beginPath();
				ctx.arc(0,-110,1,0,2*Math.PI);
				ctx.fill();
				ctx.rotate(Math.PI/30);
			}
		}
		ctx.font='18px Verdana';
		ctx.textAlign='center';
		ctx.textBaseline='middle';
		for(let i=1;i <= 12;i++){
			ctx.fillText(i,94*Math.sin(i*Math.PI/6),-94*Math.cos(i*Math.PI/6));
		}
		ctx.translate(-120,-120);
		// Create hour hand
		ctx=hourHand.getContext('2d');
		ctx.fillStyle=isLight?'#000':'#2196F3';
		ctx.beginPath();
		ctx.moveTo(10,0);
		ctx.lineTo(0,90);
		ctx.lineTo(20,90);
		ctx.lineTo(10,0);
		ctx.fill();
		// Create minute hand
		ctx=minuteHand.getContext('2d');
		ctx.fillStyle=isLight?'#7f7f7f':'#ffeb3b';
		ctx.beginPath();
		ctx.moveTo(6,0);
		ctx.lineTo(0,110);
		ctx.lineTo(12,110);
		ctx.lineTo(6,0);
		ctx.fill();
		ctx.fillStyle='#000';
		ctx.beginPath();
		ctx.arc(6,90,2,0,2*Math.PI);
		ctx.fill();
		// Create second hand
		ctx=secondHand.getContext('2d');
		ctx.fillStyle='#f44336';
		ctx.beginPath();
		ctx.moveTo(4,0);
		ctx.lineTo(0,120);
		ctx.lineTo(8,120);
		ctx.lineTo(4,0);
		ctx.fill();
		ctx.fillStyle='#000';
		ctx.beginPath();
		ctx.arc(4,90,2,0,2*Math.PI);
		ctx.fill()
	};
	this.attachTo=function(el){if(el.appendChild&&!tpick.parentNode){el.appendChild(tpick);return true}return false};
	this.destroy=function(){
		tpick.remove();
		self=null
	};
	this.getElement=function(){return tpick};
	this.getHours=function(){return hour};
	this.getMinutes=function(){return minute};
	this.getTime=function(){return hour*36e5+minute*6e4};
	this.getTimeString=function(){return getTmStr()};
	this.hide=function(){
		if(!isHidden){
			isHidden=!isHidden;
			tpick.style.display='none';
		}
	};
	this.is24Hour=function(){return is24H};
	this.isClockMode=function(){return isClk};
	this.isHidden=function(){return isHidden};
	this.isLightTheme=function(){return isLight};
	this.onPicked;
	this.set24Hour=function(h){
		if(typeof h=='boolean'&&h!=is24H){
			is24H=h;
			updPickedTm()
		}
	};
	this.setClockMode=function(m){
		if(typeof m=='boolean'&&m!=isClk){
			isClk=m;
			Timepicker.setCursor(hourHand,!isClk);
			Timepicker.setCursor(minuteHand,!isClk);
			secondHand.style.display=isClk?'':'none';
			timeStr.style.display=pickBtn.style.display=isClk?'none':'';
			tpick.style.height=isClk?'240px':'320px';
			if(isClk){
				remEvts();
				hour=Timepicker.getHours();
				minute=Timepicker.getMinutes();
				updClkTm();
				updPickedTm()
			}else{
				second=0;
				window.clearInterval(timerId);
				addEvts()
			}
		}
	};
	this.setHours=function(h){
		if(!isClk&&!isNaN(h)){
			hour=parseInt(h)%24;
			second=0;
			updClkPtrs();
			updPickedTm()
		}
	};
	this.setLightTheme=function(t){
		if(typeof t=='boolean'&&t!=isLight){
			isLight=t;
			setClkTheme();
		}
	};
	this.setMinutes=function(m){
		if(!isClk&&!isNaN(m)){
			minute=parseInt(m)%60;
			second=0;
			updClkPtrs();
			updPickedTm()
		}
	};
	this.show=function(){
		if(typeof tpick.parentNode=='undefined'){alert("Timepicker element hasn't attached yet!");return;}
		if(isHidden){
			isHidden=!isHidden;
			tpick.style.display='';
			scrollToFix()
		}
	};
	if(!cssTransform){
		self.destroy();
		alert("Sorry, your browser doesn't support CSS transform!");
		return
	}
	if(!clkFace.getContext){
		self.destroy();
		alert("Sorry, your browser doesn't support HTML canvas!");
		return
	}
	create()
}
Timepicker.addEvent=function(el,ev,cb){
	if(window.addEventListener)el.addEventListener(ev,cb);
	else el.attachEvent('on'+ev,cb)
};
Timepicker.removeEvent=function(el,ev,cb){
	if(window.addEventListener)el.removeEventListener(ev,cb);
	else el.detachEvent('on'+ev,cb)
};
Timepicker.setCursor=function(e,p){e.style.cursor=p?'pointer':'default'};
Timepicker.getSupportedTransformProp=function(){
	let props=['transform','MozTransform','WebkitTransform','msTransform','OTransform'],
		root=document.documentElement;
	for(let i=0;i<props.length;i++)
		if(props[i] in root.style)return props[i];
	return null
};
Timepicker.tzOffset=Date.parse('01 Jan 1970');
Timepicker.getTime=function(){return (Date.now()-Timepicker.tzOffset)%864e5};
Timepicker.getHours=function(){return parseInt(Timepicker.getTime()/36e5)};
Timepicker.getMinutes=function(){return parseInt(Timepicker.getTime()/6e4)%60};
Timepicker.getSeconds=function(){return parseInt(Timepicker.getTime()/1e3)%60};
Timepicker.getMillis=function(){return Timepicker.getTime()%1e3};
Timepicker.sign=function(n){
	if(isNaN(n))return NaN;
	if(n==0)return 0;
	if(n<0)return -1;
	return 1
};
