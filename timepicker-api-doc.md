# Realtime Analog Clock/Timepicker API Documentation

## Constructor

### Syntax

```javascript
new Timepicker([isClockMode[, is24Hour[, isLightTheme[, hours[, minutes]]]]])
```

### Parameters
- **`isClockMode`** (optional)
	- `true`: clock mode
  - `false`: timepicker mode

  Default: `false`

- **`is24Hour`** (optional)
  - `true`: 24 hours format
  - `false`: 12 hours format

  Default: `false`

- **`isLightTheme`** (optional)
  - `true`: light theme
  - `false`: dark theme

  Default: `false`

- **`hours`** (optional)

  Initial hours for timepicker
	
	Default: current hours

- **`minutes`** (optional)

  Initial minutes for timepicker
	
	Default: current minutes

## Methods
- **`Timepicker.getHours()`**

  Returns current hours.

- **`Timepicker.getMillis()`**

  Returns current milliseconds.

- **`Timepicker.getMinutes()`**

  Returns current minutes.

- **`Timepicker.getSeconds()`**

  Returns current seconds.

- **`Timepicker.getTime()`**

  Returns the time portion of [Unix Time Stamp](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_16).

- **`Timepicker.tzOffset()`**

  Returns the time-zone offset in milliseconds for the current locale.


## `Timepicker` Instance Methods
- **`.attachTo(parentElement)`**

  Attach the widget element into a parent HTML element designated by `parentElement`.

- **`.destroy()`**

  Destroys the widget instance.

- **`getElement()`**

  Returns the widget element.

- **`getHours()`**

  Returns the selected hours in timepicker mode or current hours in clock mode.

- **`getMinutes()`**

  Returns the selected minutes in timepicker mode or current minutes in clock mode.

- **`getTimeString()`**

  Returns the string represents the selected time in timepicker mode or current time in clock mode.
	If 12 hours system was selected then the time string format is "HH:MM AM/PM". The format will be "HH:MM" if 24 hours system selected.

- **`hide()`**

  Hides the widget.

- **`is24Hour()`**

  Returns `true` if 24 hours format was used or `false` if 12 hours used.

- **`isClockMode()`**

  Returns `true` if the widget mode is a clock or `false` if a timepicker.

- **`isHidden()`**

  Returns `true` if the widget state is hidden or `false` if it is displayed.

- **`isLightTheme()`**

  Returns `true` if the light theme is used or `false` if the dark theme is used.

- **`set24Hour(is24Hour)`**

  Uses 24 hours format if `is24Hour = true` or 12 hours if `is24Hour = false`.

- **`setClock(isClockMode)`**

  Sets the widget mode to a clock if `isClockMode = true` or timepicker mode if `isClockMode = false`.

- **`setHours(hour)`**

  Sets the timepicker initial hours with `hour` value in the 24 hours system format.

- **`setLightTheme(isLightTheme)`**

  Uses light theme if `isLightTheme = true` or dark theme if `isLightTheme = false`.

- **`setMinutes(minute)`**

  Sets the timepicker initial minutes with `minute` value.

- **`show()`**

  Sets.

## `Timepicker` Instance Properties
- **`.onPicked`**

  Assign this property to a function that do some processes when a time was picked.

  For example:

  ```javascript
  let timepicker = new Timepicker();
  timepicker.onPicked = function() {
      // do stuff
  };
  ```

&nbsp;

&nbsp;

---
#### Designed By ZulNs
##### @Gorontalo, 25 February 2019
---
