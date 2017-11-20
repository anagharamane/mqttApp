const mqtt = require('mqtt');
const fs =  require("fs");
const client = mqtt.connect('mqtt://localhost');

var temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
var temp_c = temp/1000;
var temperature = temp_c.toString()+"°C";


var payload = {
    name: "Raspberry Pi",
    type: "Circuit Board",
    owners: ["Harsha","Varsha"],
    cpuTemp: temperature
}

console.log("Payload is "+payload);

client.on('connect',function(){
    console.log("Connecting......")
    client.subscribe('response');
    client.publish('postReq',JSON.stringify(payload));
});

// client.publish('getReq',' ');

client.on('message',function(topic,message){
    console.log("Topic: "+topic+" Message: ");
    if(topic == "response"){
        msg = JSON.parse(message);
        // msg = {};
        if(msg.type == 'GET'){
            if(msg.success){
                console.log("Success");
                console.log(msg.devices);
            }else{
                console.log("FAILED");
                console.log(msg.msg);
            }
        }
        if(msg.type == 'POST'){
            if(msg.success){
                console.log("Success");
                console.log(msg);
            }else{
                console.log("FAILED");
                console.log(msg);
            }
        }
    }
});