const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

client.on('connect',function(){
    client.subscribe('response');
    client.publish('getReq','Send me all devices');
});

// client.publish('getReq',' ');

client.on('message',function(topic,message){
    console.log("Topic: "+topic+" Message: ");
    if(topic == "response"){
        msg = JSON.parse(message);
        // msg = {};
        if(msg.type == 'GET'){
            if(msg.success){
                console.log(msg.devices);
            }else{
                console.log(msg.msg);
            }
        }
    }
});