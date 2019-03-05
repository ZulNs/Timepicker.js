# Realtime Analog Clock/Timepicker API Documentation

&nbsp;

## Constructor
### Syntax
```javascript
new Timepicker([isClockMode[, is24Hour[, isLightTheme[, hours[, minutes]]]]]);
```

### Parameters
- **`isClockMode`** (optional)<br>
  Boolean value representing the widget mode to perform.<br>
  `true`: clock mode<br>
  `false`: timepicker mode<br>
  Default: `false`

- **`is24Hour`** (optional)<br>
  Boolean value representing the hour format to apply.<br>
  `true`: 24 hour<br>
  `false`: 12 hour<br>
  Default: `false`

- **`isLightTheme`** (optional)<br>
  Boolean value representing the widget appearance.<br>
  `true`: light theme<br>
  `false`: dark theme<br>
  Default: `false`

- **`hours`** (optional)<br>
  Integer value representing the hour of the day.<br>
  Default: current hour

- **`minutes`** (optional)<br>
  Initial value representing the minute segment of a time.<br>
  Default: current minute

## Methods
- **`Timepicker.getHours()`**<br>
  Returns the current hour (0-23).

- **`Timepicker.getMillis()`**<br>
  Returns the current millisecond (0-999).

- **`Timepicker.getMinutes()`**<br>
  Returns the current minute (0-59).

- **`Timepicker.getSeconds()`**<br>
  Returns current second (0-59).

- **`Timepicker.getTime()`**<br>
  Returns the "time" portion of [Unix Time Stamp](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_16) that is an integer value representing time elapsed since midnight in milliseconds.

- **`Timepicker.tzOffset()`**<br>
  Returns the time-zone offset in milliseconds for the current locale.


## `Timepicker` Instance Methods
- **`.attachTo(parentElement)`**<br>
  Attach this widget element into a parent HTML element designated by `parentElement`.

- **`.destroy()`**<br>
  Destroys the current instance of this widget.

- **`.getElement()`**<br>
  Returns this widget element.

- **`.getHours()`**<br>
  Returns the picked hour in timepicker mode or current hour in clock mode.

- **`.getMinutes()`**<br>
  Returns the picked minute in timepicker mode or current minute in clock mode.

- **`.getTimeString()`**<br>
  Returns the picked time in timepicker mode or current time in clock mode as a human readable string. If 12 hour format was applied then the time string format will be "HH:MM AM/PM". The format will be "HH:MM" if 24 hour format applied.

- **`.hide()`**<br>
  Hides this widget.

- **`.is24Hour()`**<br>
  Returns the applied hour format.<br>
  `true`: 24 hour<br>
  `false`: 12 hour

- **`.isClockMode()`**<br>
  Returns the current widget mode<br>
  `true`: clock<br>
  `false`: timepicker

- **`.isHidden()`**<br>
  Returns the current display state of this widget.<br>
  `true`: hidden<br>
  `false`: showed

- **`.isLightTheme()`**<br>
  Returns the appearance of this widget.<br>
  `true`: light theme<br>
	`false`: dark theme

- **`.set24Hour(is24Hour)`**<br>
  Sets the hour format to apply with a boolean value pointed by `is24Hour`.<br>
  `true`: 24 hour<br>
  `false`: 12 hour

- **`.setClock(isClockMode)`**<br>
  Sets the widget mode with a boolean value pointed by `isClockMode`.<br>
  `true`: clock<br>
  `false`: timepicker

- **`.setHours(hour)`**<br>
  Sets the hour (0-23) with an integer value pointed by `hour` if the widget mode is timepicker, ignored in clock mode.

- **`.setLightTheme(isLightTheme)`**<br>
  Sets the appearance of the widget with a boolean value pointed by `isLightTheme`.<br>
  `true`: light theme<br>
  `false`: dark theme

- **`.setMinutes(minute)`**<br>
  Sets the minute (0-59) with an integer value pointed by `minute` if the widget mode is timepicker, ignored in clock mode.

- **`.show()`**<br>
  Shows this widget.

## `Timepicker` Instance Properties
- **`.onPicked`**<br>
  Assign this property to a function that do some processes when a time was picked. Please note that every time a time is picked, the `.hide()` method always called afterwards.<br>
  For example:
  ```javascript
  let timepicker = new Timepicker();
  timepicker.onPicked = function() {
      // do stuff
  };
  ```

&nbsp;

&nbsp;

&nbsp;

---
#### Designed By ZulNs
##### @Gorontalo, 25 February 2019
---
