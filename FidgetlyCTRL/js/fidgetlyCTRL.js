//BLE
let service = '78adb061-470e-405d-a44d-817e559c8839';
let characteristicDeviceCustom  = 'e779f296-27f6-461b-8f96-6b0c3804bfc3';

// Data Offsets
let offset_revolutions = 0;
let offset_acc_x = 4;
let offset_acc_y = 8;
let offset_acc_z = 12;

let offset_gyro_x = 16;
let offset_gyro_y = 20;
let offset_gyro_z = 24;

let offset_spin_count = 28;
let offset_rpm = 30;
let offset_roll = 32;
let offset_pitch = 34;
let offset_yaw = 36;

// Data Values
let revs = 0;
let acc = [0.0,0.0,0.0];
let ang = [0,0,0];
let sc = 0;
let nu = 0;
let rpm = 0;
let roll = 0.0;
let pitch = 0.0;
let yaw = 0.0;
// derived from other values
let orientation = "";
let spinDirection = "notSpinning";

// let value_38 = 0;
// let value_40 = 0;
// let value_42 = 0;

window.onload = () => {
    document.getElementById('connect_fidgetlyCTRL').onclick = connectFidgetlyCTRL;
}

function connectFidgetlyCTRL(){
    //BLE setup. Connect and get service/characteristic notifications
    console.log('Calling requestDevice.');
    navigator.bluetooth.requestDevice({
    	filters: [
            {namePrefix: 'Fidgetly'},
            {services: [service]}
        ]
    })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService(service))
    .then(service => service.getCharacteristic(characteristicDeviceCustom))
    .then(characteristic => {
        return characteristic.startNotifications()
        .then(_ => {
            characteristic.addEventListener('characteristicvaluechanged',
                            handleCharacteristicValueChanged);
        });
    })
    .then(_ => {
        console.log('Notifications have been started.');
    })
    .catch(error => { console.log(error); });
}

 function handleCharacteristicValueChanged(event){
        var buffer = event.target.value.buffer;
        var view = new DataView(buffer);

        console.log(buffer);

        revs = view.getInt32(offset_revolutions, true);
        acc = [normalizeAcceleration(view.getInt32(offset_acc_x, true)), normalizeAcceleration(view.getInt32(offset_acc_y, true)), normalizeAcceleration(view.getInt32(offset_acc_z, true))];
        ang = [normalizeGyro(view.getInt32(offset_gyro_x, true)), normalizeGyro(view.getInt32(offset_gyro_y, true)), normalizeGyro(view.getInt32(offset_gyro_z, true))];
        sc = view.getInt16(offset_spin_count, true);

        da = getAngleFromAccelerometerZ(acc[2]);
        orientation = getOrientationFromDeviceAngle(da);
        spinDirection = getSpinDirectionFromGyroZ(ang[2]);

        rpm = view.getInt16(offset_rpm , true); // this is supposed to be a float?
        roll = view.getInt16(offset_roll, true) / 100;
        pitch = view.getInt16(offset_pitch, true) / 100;
        yaw = view.getInt16(offset_yaw, true) / 100;

        // Unknown values
        // value_38 = view.getInt16(38, true);
        // value_40 = view.getInt16(40, true);
        // value_42 = view.getInt16(42, true);

        // Update HTML Content
        document.getElementById("revs").innerHTML =  revs;
        document.getElementById("accX").innerHTML =  acc[0];
        document.getElementById("accY").innerHTML =  acc[1];
        document.getElementById("accZ").innerHTML =  acc[2];
        document.getElementById("angX").innerHTML =  ang[0];
        document.getElementById("angY").innerHTML =  ang[1];
        document.getElementById("angZ").innerHTML = ang[2];
        document.getElementById("sc").innerHTML =  sc;
        document.getElementById("orientation").innerHTML = orientation;
        document.getElementById("spinDirection").innerHTML =  spinDirection;

        document.getElementById("rpm").innerHTML = rpm;
        document.getElementById("roll").innerHTML = roll;
        document.getElementById("pitch").innerHTML = pitch;
        document.getElementById("yaw").innerHTML =  yaw;
        
        // document.getElementById("value_38").innerHTML = value_38;
        // document.getElementById("value_40").innerHTML = value_40;
        // document.getElementById("value_42").innerHTML =  value_42;
        

}

function normalizeAcceleration(value){
    return value.toPrecision() / 1000.0;
}

function normalizeGyro(value){
    return value / 1000;
}

function getAngleFromAccelerometerZ(accZ){
    accZ = Math.round(accZ * 10) / 10;
    if (accZ > 1.0){
        accZ = 1.0;
    } else if (accZ < -1.0){
        accZ = -1.0;
    }
    return accZ;
}

function getOrientationFromDeviceAngle(angle){
    if (angle > 0 ) {
        return "facingDown";
    } else {
        return "facingUp";
    }
}

function getSpinDirectionFromGyroZ(gyroZ){
    if(gyroZ >= 10){
        return "clockwise";
    } else if(gyroZ <= -10){
        return "counterClockwise";
    } else {
        return "notSpinning";
    }
}

function toShort(src, startIndex){
    startIndex = startIndex || 0;
    return ((src[startIndex] << 8 | src[startIndex + 1]) << 16) >> 16;
}

function toInteger(src, startIndex){
    startIndex = startIndex || 0;
    return src[startIndex] << 24
    | src[startIndex + 1] << 16
    | src[startIndex + 2] << 8
    | src[startIndex + 3];
}
