const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

var device_type = "RaspberryPi"

client.on('connect',function(){
    client.subscribe('response');
    client.publish('getByTypeReq',device_type);
});

client.on('message',function(topic,message){
    console.log("Topic: "+topic+" Message: "+message);
    if(topic == "response"){
        msg = JSON.parse(message);
        // msg = {};
        if(msg.type == 'GET'){
            if(msg.success){
                console.log(msg.msg);
            }else{
                console.log("Some error");
            }
        }
    }
});