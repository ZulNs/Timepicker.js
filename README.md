# JavaScript Realtime Analog Clock/Timepicker Library

&nbsp;

## Overview
This widget can be used to display a **Realtime Analog Clock** besides as a **Timepicker**. As a timepicker, this widget can be directly draggable at both
***hour hand*** and ***minute hand***. Drag at behind the axis of both hands which causes reverse rotation is also supported. Dragging on touch devices are
supported well. Dragging at the both clock hands are very smoothly, no matter how much angle of rotation have been made by your finger or mouse pointer,
over there the appropriate hand will point at without lagging nor leading even a little.

## Demo
Demo [here](https://zulns.github.io/Timepicker.js/).

## Dependencies
No dependencies even css file. 

## Usage
Simply put this code snippet to anywhere you want in the body of your html file:

### Offline
```html
<div id="timepicker"></div>
<script type="text/javascript" src="timepicker.js"></script>
<script type="text/javascript">
    let timepicker = new Timepicker();
    document.getElementById('timepicker').appendChild(timepicker.getElement());
    // or use
    // timepicker.attachTo(document.getElementById('timepicker'));
    // other code
</script>
```

### Online
```html
<div id="timepicker"></div>
<script type="text/javascript" src="https://zulns.github.io/Timepicker.js/timepicker.js"></script>
<script type="text/javascript">
    let timepicker = new Timepicker();
    document.getElementById('timepicker').appendChild(timepicker.getElement());
    // or use
    // timepicker.attachTo(document.getElementById('timepicker'));
    // other code
</script>
```

## API Documentation
API doc [here](timepicker-api-doc.md).

&nbsp;

&nbsp;

&nbsp;

---
#### Designed By ZulNs
##### @Gorontalo, 25 February 2019
---
