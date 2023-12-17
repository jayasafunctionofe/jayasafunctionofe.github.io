# RadonEye RD200 Bluetooth enabled radon detector

## DataFormats

Note: Data is sent in Bq/m³

For conversion purposes, 1 pCi/ℓ = 37 Bq/m³


### Send Commands
| Command ID | Hex | Command | Use | 
| --- | --- | --- | --- | 
| 64 | 0x40 | cmd_BLEV2_QUERY_ALL | Get current data |
| 65 | 0x41 | cmd_BLEV2_LOG_SEND | Get data log | 
| 161 | 0xA1 | cmd_BLE_RD200_Date_Time_Set | Sent on initial connection |
| 162 | 0xA2 | cmd_BLE_RD200_UNIT_Set |   |
| 170 | 0xAA | cmd_BLE_WARNING_SET | seems to get settings back |
| 224 | 0xE0 | cmd_EEPROM_LONG_DATA_CLEAR | clear data? |


### DataCallbacks

| Callback ID | Purpose | Command Trigger |
| --- | --- | --- |
| 64 | FTLabLargeDataCallback | 64 |
| 78 | FTLabMeasDataCallBack | 65 | 
| 81 | ??? | 81 |
| 172 | Settings | 162, 170 |  


### DataCallBack 64 (FTLabMeasDataCallBack)
###### reply to 64 (0x40)

| Start Index | Length / Format | Data| 
| --- | --- | --- |
| 00 | byte | echo back command |
| 01 | byte | length of reply |
| 02 | 6 - string (from char codes) | snDate |
| 08 | 3 - string (from char codes) | SN.Type |
| 11 | 4 - string (from char codes) | SN.No |
| 15 | byte  | modelNameLength (1) |
| 16 | 6 - string (from char codes) | modelName |
| 22 | 6 - string (from char codes)  | fwversion |
| 28 | byte  | unit (0 = pCi/l 1 = Bq/m^3) |
| 29 | byte  | Alarm Status (boolean) | 
| 30 | float  | Alarm Value |
| 32 | 1  | Alarm Interval (1, 6, 36) |
| 33 | float | S_pCi (read value) |
| 35 | float | M_pCi (day value) |
| 37 | float | L_pCi (month value) |
| 39 | float | Pulse Count |
| 41 | float | PulseCount 10min |
| 43 | uInt32 (little endian) | Proc Time |
| 47 | uInt32 (little endian) | DC_Value |
| 51 | float | Peak Value |
| 53 | byte | Status |
| 54 | byte | VibStatus |
| 55 | float | Hour Value |
| 57 | uInt16 (little endian) | DataNo |
| 59 | byte | CheckSum |
| 60 | float32 (little endian) | Module Factor |
| 64 | float32 (little endian) | Factor | 


### DataCallBack 78 (FTLabLargeDataCallback)
###### reply to 65 (0x41)

TBD


### DataCallBack 81 (TBD)
###### reply to 81 (0x51)

| Start Index | Length / Format | Data| 
| --- | --- | --- |
| 00 | byte | echo back command |
| 01 | byte | length of reply |
| 02 | byte | VibStatus | 
| 03 | byte | ? | 
| 04 | uInt32 (little endian) | Time |
| 08 | uInt32 (little endian) | DC_Value |
| 12 | ?? | peakValue |


### DataCallBack 172 (Settings)
###### reply to 170 (0xAA) and 162 (0xA2)

| Start Index | Length / Format | Data| 
| --- | --- | --- |
| 00 | byte | echo back command |
| 01 | byte | length of reply |
| 02 | byte | RecUnit |
| 03 | byte | RecAlarmStatus |
| 04 | float | RecAlarmValue |
| 06 | byte | RecAlarmInterval |
