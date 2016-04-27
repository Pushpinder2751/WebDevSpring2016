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
        vm.plotChart = plotChart;


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
            $interval(timerHelper, 1000, time);

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
                    refactorDataForCharts(response.data);
                })
        }

        function refactorDataForCharts(data) {
            var chartData = [];
            var details = data[0].details;
            console.log(details.length);
            var x = 0;
            vm.graphStartingTime = new Date(details[0].time);
            if(details.length >= 100){
                var req_length = 0;
                for(var i = (req_length); i < 100; i = i+1 ){
                   // console.log(details[i]);

                    var temp = [x, details[i].value];
                    x += 2;
                     console.log(temp);
                    chartData.push(temp);
                }
            }else{
                for(var i = 0; i < details.length; i = i+1 ){
                    // console.log(details[i]);
                    var temp = [x, details[i].value];
                    x +=2;
                    // console.log(temp);
                    chartData.push(temp);
                }



            }
            plotChart(chartData);

        }

        function plotChart(chartData) {

            google.charts.load('current', {packages: ['corechart', 'line']});
            google.charts.setOnLoadCallback(drawBasic);

            function drawBasic() {

                var data = new google.visualization.DataTable();
                data.addColumn('number', 'X');
                data.addColumn('number', vm.currentThing.title);

                data.addRows(chartData);

                var options = {
                    hAxis: {
                        title: 'Starting Time :'+vm.graphStartingTime.getMonth() + "/"+vm.graphStartingTime.getDay() + "/"+
                        vm.graphStartingTime.getFullYear() +" "+vm.graphStartingTime.getHours()+":"+
                        vm.graphStartingTime.getMinutes()+":"+vm.graphStartingTime.getSeconds()
                    },
                    vAxis: {
                        title: 'Intensity'
                    }
                };

                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

                chart.draw(data, options);
            }

        }




    }



})();
