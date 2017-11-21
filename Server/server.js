const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const mongoose = require('mongoose');
const db = mongoose.connection
mongoose.connect('mongodb://localhost/iotServer');

const Devices = require('./devices');

client.on('connect',function(){
    client.subscribe('getReq');
    client.subscribe('getByTypeReq');
    client.subscribe('postReq');    
    client.subscribe('response');
});

client.on('message',function(topic,message){
    
    if(topic=="getReq"){
        console.log("Topic: "+topic+" Message: "+message);
        Devices.getDevice((err,devices)=>{
            console.log("in getDevice function");
            if(err){
                console(err);
                client.publish("response",JSON.stringify({
                    success:false,
                    type:'GET',
                    msg:"Error Occured"
                }));
            }else
            client.publish("response",JSON.stringify({
                success:true,
                type:'GET',
                devices:devices
            }));
        });
    }
    if(topic=="postReq"){
        console.log("Topic: "+topic+" Message: "+message);
        var type = message.type;
        Devices.getDevicebyType(type,(err,device)=>{
        	console.log("Devices are....\n");
        	console.log("*****************************");
        	console.log(device)
        	console.log("*****************************");
            if (device.length != 0){                
                client.publish("response",JSON.stringify({
                    success:false,
                    type:'POST',
                    msg:"Device already Present"
                }));
            }else{
                var newDevice = JSON.parse(message);
                Devices.addDevice(newDevice,(err,device)=>{
                    if (err){
                        console.error(err);                        
                        client.publish("response",JSON.stringify({
                            success:false,
                            type:'POST',
                            msg:"Error Occured"
                        }));
                    } else {  
                        console.log("******************************8")
                        console.log(newDevice)                      
                        console.log("******************************8")
                        client.publish("response",JSON.stringify({
                            success:true,
                            type:'POST',
                            msg:"Device added successfully"
                        })); 
                    }
                });
            }
        })
    }

    if(topic=="getByTypeReq"){
    	console.log("in server....");
    	console.log("Topic: "+topic+" Message: "+message);
    	type = message
    	Devices.getDevicebyType(type,(err,device)=>{
    		console.log("type "+type);
    		if (err){
    			console.log("1111111111");
    			client.publish("response",JSON.stringify({
                    success:false,
                    type:'GET',
                    msg:"Error Occured"
                }));
    		}else{
    			console.log("2222222222");
    			console.log("devices are .... \n"+device);
    			client.publish("response",JSON.stringify({
                    success:true,
                    type:'GET',
                    msg:device
                }));
    		}
    	})
    }
})
