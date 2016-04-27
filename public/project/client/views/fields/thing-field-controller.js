"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("thingFieldsController", thingFieldsController)
    // will change names slowly
    function thingFieldsController($rootScope, $routeParams,ThingService,$interval ) {

       console.log("hello form thingFieldsController");

        var vm = this;
        vm.updateThingStatus = updateThingStatus;
        vm.startTimer= startTimer;
        vm.currerntTime;
        vm.timerFlag = true;
        vm.getThingData = getThingData;


        vm.currentThing = $rootScope.thing;
        console.log("check : ");
        console.log(vm.currentThing);

        vm.currentUser = $rootScope.currentUser;
        console.log("user :"+vm.currentUser);
        
        function init() {
           console.log("init does nothing for now");
           getThingData(vm.currentThing);
        }init();




        function updateThingStatus() {
            console.log("this is working");
            if(vm.currentThing.status == 'off'){
                vm.currentThing.status = 'on';
                vm.currentThing.update = new Date();
            }else{
                vm.currentThing.status = 'off';
                vm.currentThing.update = new Date();
            }
            ThingService
                .updateThingStatus(vm.currentThing, vm.currentUser)
                .then(function (response) {
                    console.log("updated status on server");
                });


        }

        function startTimer() {
            vm.timerFlag = false;
            var time = vm.timer.value;
            // time in seconds
            vm.currentTime = time*60;
            timerDecrement(vm.currentTime);
        }

        function timerDecrement(time) {
            console.log("i am decreasing");
            $interval(timerHelper, 100, time);

        }

        // function timeUp() {
        //     console.log("I am done");
        //     vm.currentTime -= 1;
        // }
        function timerHelper() {
            if(vm.currentTime == 1){
                vm.currentTime -= 1;
                console.log("time Up");
                vm.timerFlag = true;
                updateThingStatus();
                return;
            }
            vm.currentTime -= 1;
        }

        // needs reconfiguration, as it is not good design to
        // get all the data for charts, will get heavy over time.
        function getThingData(thing) {
            console.log("calling data");
            ThingService
                .getThingData(thing)
                .then(function (response) {
                    console.log("got thing data");
                    console.log(response.data);
                })
        }




    }



})();
