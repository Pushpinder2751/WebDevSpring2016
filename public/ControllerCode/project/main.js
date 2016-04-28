var request = require('request');
console.log("I am in");

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
    io:new Edison()
});
/*request
    .get('http://10.0.0.23:8080/edison')
    .on('response', function(error, response, body){
    console.log("something should come here");
    console.log(body);
}) */
var openshiftURL = 'http://webdev2016-singhpushpinder.rhcloud.com/';
board.on("ready", function() {
    
    var globalLightSensorFlag = false;
    var globalTempSensorFlag = false;
    var globalSoundSensorFlag = false;
    
    var vm = this;
   // make all initializations here
    
    var x={};
    var light = new five.Sensor("A0");
    var led = new five.Led(4);
    var lcd = new five.LCD({
    controller: "JHD1313M1"
  });
    var temperature = new five.Temperature({
        pin: "A1",
        controller: "GROVE"
    });
    
     var sound = new five.Sensor("A2");
    // use loop here in the end. 
     var button = new five.Button(3);
      button.on("release", function(){
          console.log("going to check for updates");
          // toggles the state of
          initialState(vm);
          //checkForUpdates();
      });
    initialState(vm);  
    this.loop(5000, function(){
        console.log("print this");
        checkForUpdates();
        sendLightSensorData(vm, globalLightSensorFlag);
        sendTempSensorData(vm, globalTempSensorFlag);
         sendSoundSensorData(vm, globalSoundSensorFlag);
    })
    function initialState(vm){
        lcd.cursor(0,0).print("Getting inital updates from server!");
        request({
            //url: 'http://10.0.0.23:8080/edison/initialUpdate', //URL to hit
            url: openshiftURL+'edison/initialUpdate',
            method: 'GET', //Specify the method
            //body: [light.value]
            }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                console.log(response.statusCode, body);
                var parse = JSON.parse(body);
                console.log(parse);
                for(var i in parse){
                    var sensor = parse[i].title;
                    var status = parse[i].status;
                    if(sensor != null){
                    console.log("taking action");
                    takeAction(sensor, status);
                }
                    
                }
            }
    });
//        console.log("before loop function");
//        vm.loop(1000, function(){
//                console.log("in loop");
//                checkForUpdates();
//                });
    }
    
    function takeAction(sensor, status){
        
        console.log("sensor : "+sensor);
        console.log("status : "+status);
        
        if(sensor == "led"){
                    
                    if(status == 'on'){
                        console.log("led to turn on");
                        led.on();
                    }else{
                        console.log("could not match strings, turning led off");
                        led.off();
                    }
                }
                if(sensor == "lightSensor"){
                    
                    if(status == 'on'){
                        console.log("lightSensor on");
                        lcd.cursor(0,0).print("Light sensor on");
                        globalLightSensorFlag = true;
                        //sendLightSensorData(vm, true);
                       
        
                    }else if(status == 'off'){
                        lcd.cursor(0,0).print("light sensor off");
                        console.log("lightSensor off");
                        //sendLightSensorData(vm, false);
                        globalLightSensorFlag = false;
                    }
                }
                
                if(sensor == "tempSensor"){
                    
                    if(status == "on"){
                        console.log("tempSensor on");
                        lcd.cursor(0,0).print("Temp Sensor on");
                        globalTempSensorFlag = true;
                        //sendTempSensorData(vm, true);
                    }else if(status == "off"){
                        console.log("tempSensor off");
                        lcd.cursor(0,0).print("temp sensor off");
                        globalTempSensorFlag = false;
                    }
                }
                
                if(sensor == "soundSensor"){
                    
                    if(status == "on"){
                        console.log("soundSensor on");
                        lcd.cursor(0,0).print("sound Sensor on");
                        globalSoundSensorFlag = true;
                    }else if(status == "off"){
                        console.log("soundSensor off");
                        lcd.cursor(0,0).print("sound sensor off");
                        //sendSoundSensorData(vm, false);
                        globalSoundSensorFlag = false;
                    }
                }
        
    }
    //this.loop(2000, checkForUpdates);
    
    function checkForUpdates(){
         
        request({
            // url: 'http://10.0.0.23:8080/edison', //URL to hit
            url: openshiftURL+'edison',
            method: 'GET', //Specify the method
            //body: [light.value]
            }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                console.log(response.statusCode, body);
                var parse = JSON.parse(body);
                 /*x = {
                    led : parse.led,
                    lightSensor: parse.lightSensor, 
                    lcd : parse.lcd
                }*/
                x = {
                    lcd: parse.lcd,
                    data : parse.data
                }
                console.log("parsed body");
                console.log(x);
                console.log("ready to test");
                lcd.cursor(0,0).print(x.lcd.value);
                console.log("title : "+parse.data.title);
                console.log("status : "+parse.data.status);
                if(parse.data.title != null){
                    console.log("taking action");
                    takeAction(parse.data.title, parse.data.status);
                }
                
                
            }
        });
}
    
        
    function sendLightSensorData(vm, flag){
            console.log("flag : "+flag);
                //flag = true;
                if(flag){
                    //console.log("exiting");
                    //exit(0);
                    
                    var s_value = light.value;
                request({
                //url: 'http://10.0.0.23:8080/edison/lightSensor',
                    url: openshiftURL+'edison/lightSensor',
                method: 'POST',
                json: {"value": light.value}
                //body: [light.value]
                },function(error, response, body){
                if(error){
                    console.log(error);
                }else{
                    console.log(response.statusCode, body);
                }
                }); 
                          
                }
                      
    }    
    
    
    
    

    
    function sendTempSensorData(vm, flag){
                console.log("flag: "+flag);
                if(flag) {
                    //console.log("extraFlag: "+extraFlag);
                    var s_value = Math.round(temperature.celsius);
                    request({
                    //url: 'http://10.0.0.23:8080/edison/tempSensor',
                    url: openshiftURL+'edison/tempSensor',
                    method: 'POST',
                    json: {"value": s_value}
                    },function(error, response, body){
                    if(error){
                    console.log("there was an error");
                    console.log(error);
                    }else{
                        console.log(response.statusCode, body);
                    }
                });      
                    
                }
                
        
    }
    
    function sendSoundSensorData(vm, flag){
        
      
                console.log("sound sensor flag : "+flag);
                if(flag){
                        
                        var s_value = sound.value;
                        request({
                        //url: 'http://10.0.0.23:8080/edison/soundSensor',
                        url: openshiftURL+'edison/soundSensor',
                        method: 'POST',
                        json: {"value": s_value}
                        },function(error, response, body){
                        if(error){
                            console.log(error);
                        }else{
                            console.log(response.statusCode, body);
                        }
                });

                }          
    }    
    
});


