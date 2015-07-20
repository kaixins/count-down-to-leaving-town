if(Meteor.isClient) {
    //Countdown
    var _second = 1000,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24;
    Meteor.startup(function() {
        updateTimeLeft();
        setInterval(function() {
            updateTimeLeft();
        }, 1000);
    });
    var getTimeLeft = function() {
        var end = new Date('08/01/2015 12:00');
        var now = new Date();
        return end - now;meteor
        
    };
    var updateTimeLeft = function() {
        var days = Math.floor(getTimeLeft() / _day);
        Session.set('Days', days);
        var hours = Math.floor((getTimeLeft() % _day) / _hour);
        Session.set('Hours', hours);
        var minutes = Math.floor((getTimeLeft() % _hour) / _minute);
        Session.set('Minutes', minutes);
        var seconds = Math.floor((getTimeLeft() % _minute) / _second);
        Session.set('Seconds', seconds);
    };
    Template.countdown.helpers({
        getDays: function() {
            return Session.get("Days");
        },
        getHours: function() {
            return Session.get("Hours");
        },
        getMinutes: function() {
            return Session.get("Minutes");
        },
        getSeconds: function() {
            return Session.get("Seconds");
        }
    });
    
    //Set up clouds
    Template.sky.onRendered(function() {
        
        var s = new Snap("#sky");
        
        Snap.load("/images/cloud.svg", function(fragment) {
            
            var element = fragment.select(".cloud");
            s.append(element);
           
            //set our sky values
            var containerHeight = s.node.offsetHeight,
                numberOfClouds = 16;
                containerWidth = $(window).width(),
                    randomScale = getRandomScale();
                              
            //set up our cloud clones
            var cloudGroup = s.g();
            for (i = numberOfClouds; i >= 0; i--) {
                
                //randomise our new cloud variables
                var x = randomise(containerWidth),
                    y = randomise(containerHeight),
                    newCloud = element.use(),
                    newCloudRandomScale = getRandomScale();
                
                //set our cloud size, position, and class
                newCloud.attr({
                  x: x,
                  y: y,
                  transform: 's' + newCloudRandomScale
                });
                newCloud.attr("class", "cloud");
                
                //set up the animation for this cloud
                float(newCloud, 30000 * newCloudRandomScale, x);  
                
                cloudGroup.add(newCloud);
            }  
            s.append(cloudGroup);
            $('#sky').find('.cloud').first().hide();
        });
        
        function randomise(num){
            return Math.floor(Math.random() * num);
        }
        
        function getRandomScale(){
            return Math.random() * (5 - 0.5) + 1;
        }
        
        function float(cloud, time, xStart){
          cloud.animate({x:-(xStart/4)}, time, function(){
                    //when done, reset to the right side of the screen and start the animation again
                    cloud.attr({x: $(window).width()}); 
                    float(cloud, time, xStart);
            });
        };
      
    });
   
}

if(Meteor.isServer) {
    Meteor.startup(function() {});
    Meteor.methods({});
}