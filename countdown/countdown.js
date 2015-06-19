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
    
    var getTimeLeft = function () {
        var end = new Date('08/01/2015 12:00');
        var now = new Date();

        return end - now;
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
    
    //Animation
    Template.sky.onRendered(function() {
        var s = Snap('.sky');
    
        Snap.load('/images/cloud.svg', function (response) {
            console.log(response);
            console.log(s);
            var cloud = response;
            
            s.append(cloud);
        });
    });

}

if(Meteor.isServer) {
    Meteor.startup(function() {
        
    });
    Meteor.methods({
        
    });
}