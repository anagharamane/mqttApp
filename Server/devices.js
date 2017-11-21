const mongoose = require('mongoose');

const moment = require("moment");
const devicesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },    
    owners:{
        type:Array,
        required:true
    },
    cpuTemp:{
        type:String,
        required: true
    },
    timestamp:{
        type: String,
        default: moment().format('llll')        
    }
});

const Device = module.exports = mongoose.model('Devices', devicesSchema);

module.exports.addDevice = (device, callback) => {    
    Device.create(device, callback);
}

module.exports.getDevice = (callback) => {
    Device.find(callback);
}

module.exports.getDevicebyType = (devicetype, callback) => {
    query={
        type:devicetype
    }

    Device.find(query,callback);
}