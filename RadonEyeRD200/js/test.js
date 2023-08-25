function hex2a(hex) 
{
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}     
var buffer = new Uint8Array([64, 66, 50, 50, 48, 51, 49, 53, 82, 85, 50, 48, 55, 48, 52, 6, 82, 68, 50, 48, 48, 78, 86, 50, 46, 48, 46, 50, 1, 0, 148, 0, 36, 69, 0, 35, 0, 0, 0, 7, 0, 8, 0, 38, 6, 0, 0, 19, 28, 8, 0, 74, 0, 2, 0, 0, 0, 31, 0, 0, 41, 92, 79, 63, 102, 102, 134, 63
]).buffer

var view = new DataView(buffer);

snDate = String.fromCharCode(view.getInt8(02), 
                view.getInt8(03),
                view.getInt8(04),
                view.getInt8(05),
                view.getInt8(06),
                view.getInt8(07)
      );

snType = String.fromCharCode(view.getInt8(08), 
                view.getInt8(09),
                view.getInt8(10)
      );

snNo = String.fromCharCode(view.getInt8(11), 
                view.getInt8(12),
                view.getInt8(13),
                view.getInt8(14)
      );

modelName = String.fromCharCode(view.getInt8(16), 
                view.getInt8(17),
                view.getInt8(18),
                view.getInt8(19),
                view.getInt8(20),
                view.getInt8(21)
      );

fwVersion = String.fromCharCode(view.getInt8(22), 
                view.getInt8(23),
                view.getInt8(24),
                view.getInt8(25),
                view.getInt8(26),
                view.getInt8(27)
      );

unit = view.getUint8(28);
alarmStatus = view.getUint8(29);
alarmValue = view.getUint8(30) + (view.getUint8(31) / 100);
alarmInterval = view.getUint8(32);
S_pCi = view.getUint8(33) + (view.getUint8(34) / 100);
M_pCi = view.getUint8(35) + (view.getUint8(36) / 100);
L_pCi = view.getUint8(37) + (view.getUint8(38) / 100);
pulseCount = view.getUint8(39) + (view.getUint8(40) / 100);
pulseCount10Min = view.getUint8(41) + (view.getUint8(42) / 100);
time = view.getUint32(43,true);
dcValue = view.getUint32(47,true);
peak = view.getUint8(51) + (view.getUint8(52) / 100);
status = view.getUint8(53);
vibStatus = view.getUint8(54);
dataNo = view.getUint8(57);


let debugString = 'snDate = ' + snDate + ' , fwversion ' + fwVersion + '\n' + 
'SN.No = ' + snNo + ' , SN.Type ' + snType + '\n' + 
'ModelName = ' + modelName + '\n' + 
'unit = ' + unit + '\n' + 
'alarmStatus ' + alarmStatus + '\n' + 
'alarmInterval ' + alarmInterval + ' alarmValue ' + alarmValue + '\n' + 
'PulseCount : ' + pulseCount + ' , PulseCount 10min : ' + pulseCount10Min + ' , S_pCi : ' + S_pCi + ' , hour : ' + 'tbd' + ' , M_pCi : ' + M_pCi + ' , L_pCi : ' + L_pCi + ' , peak: ' + peak + '\n' + 
', time : ' + time + ' , DC_Value : ' + dcValue + ' , Status : ' + status + ' , VibStatus : ' + vibStatus + ' , DataNo : ' + dataNo + ' , logChecksum : 0 ';

console.log('snDate = ' + snDate + ' , fwversion ' + fwVersion);
console.log('SN.No = ' + snNo + ' , SN.Type ' + snType);
console.log('ModelName = ' + modelName);
console.log('unit = ' + unit);
console.log('alarmStatus ' + alarmStatus);
console.log('alarmInterval ' + alarmInterval + ' alarmValue ' + alarmValue);
console.log('PulseCount : ' + pulseCount + 
' , PulseCount 10min : ' + pulseCount10Min + 
' , S_pCi : ' + S_pCi + 
' , hour : ' + 'tbd' + 
' , M_pCi : ' + M_pCi + 
' , L_pCi : ' + L_pCi + 
' , peak: ' + peak
)
console.log(', time : ' + time + 
' , DC_Value : ' + dcValue + 
' , Status : ' + status + 
' , VibStatus : ' + vibStatus + 
' , DataNo : ' + dataNo + 
' , logChecksum : 0 '
)


console.log(
  String.fromCharCode(
    41, 92, 79, 63, 102, 102, 134, 63
  )
);
