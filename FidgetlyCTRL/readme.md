## FidgetlyCTRL - Web Bluetooth API

**BLE Service ID:** 78adb061-470e-405d-a44d-817e559c8839

**BLE Custom Characteristic**: e779f296-27f6-461b-8f96-6b0c3804bfc3


## Data messages:

*Note: my device sends 44 bytes, however based on the Android APK code, conditions are in place to check for lengths of 24, 28, and 32. It is currently unknown what devices have this limitation and how they would be identified.*

| Index | Data Type | Description
|--|--|--|
| 00 | Int32 | Revolutions |
| 04 | Int32 | Acceleration X |
| 08 | Int32 | Acceleration Y |
| 12 | Int32 | Acceleration Z |
| 16 | Int32 | Angle X |
| 20 | Int32 | Angle Y |
| 24 | Int32 | Angle Z |
| 28 | Int32 | Spin Count |
| 30 | Float16 ? | RPM |
| 32 | Int16 | Roll |
| 34 | Int16 | Pitch |
| 36 | Int16 | Yaw |
| 38-43 | Unknown | Unknown |


## Derived Values:


**Orientation** - Z axis angle
> positive = facing up

**Spin Direction** - Z axis acceleration 
> positive = clockwise, -10 - 10 = not spinning

**Distance** - in meters
> revolutions * 0.154

**Speed** - meters per hour
> ( (rpm / 60) * 0.154 * 2.24 ) * 1.609 * 1000
> 
> in the app code they are converting it to miles first, then to kilometers, then meters.
