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
        $('body').prepend('<div id="svg"></div>');
        //  $('#svg').load('/images/cloud.svg');
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
          //  element.attr("class", "cloud");
            s.append(element);
            element.drag();
           
           

            var containerHeight = s.node.offsetHeight,
                numberOfClouds = 16;
            cloudWidth = $(window).width();
            
            var clouds = s.g();
            
            for (i = numberOfClouds; i >= 0; i--) {
                
                //randomise our new cloud variables
                var x = Math.floor(Math.random() * cloudWidth),
                y = Math.floor(Math.random() * containerHeight),
                newCloud = element.use(),
                randomScale = Math.random() * (3 - 0.5) + 0.5;
                
                newCloud.attr({
                  x: x,
                  y: y,
                  transform: 's' + randomScale
                });
                newCloud.attr("class", "cloud");
                
                float(newCloud, randomScale, x);
                
                
                clouds.add(newCloud);
            }
                   
            s.append(clouds);
        });
        
        function float(newCloud, randomScale, x){
          newCloud.animate({x:-x}, 20000*randomScale, function(){
                    newCloud.attr({x: $(document).width()}); 
                    float(newCloud, randomScale, x);
            });
        };
      
    });
   
}

if(Meteor.isServer) {
    Meteor.startup(function() {});
    Meteor.methods({});
}