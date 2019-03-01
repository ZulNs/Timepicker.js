# Analog Clock/Timepicker

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

---
#### Designed By ZulNs
##### @Gorontalo, 25 February 2019
---
