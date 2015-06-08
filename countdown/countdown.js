if (Meteor.isClient) {
    
  // counter starts at 0
  Session.setDefault('counter', 0);
    
    var _second = 1000,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24;
    
        
    var getTimeLeft = function () {
        var end = new Date('07/24/2015 16:00');
        var now = new Date();

        return end - now;
    };   
      

   Template.countdown.helpers({
     
   getDays: function(){
       var days = Math.floor(getTimeLeft() / _day);
       return days;
    },
   getHours: function(){
       var hours = Math.floor((getTimeLeft() % _day) / _hour);
       return hours;
    },
    getMinutes: function(){
       var minutes = Math.floor((getTimeLeft() % _hour) / _minute);
       return minutes;
    },
    getSeconds: function(){
       var seconds = Math.floor((getTimeLeft() % _minute) / _second);
       return seconds;
    }
      
  });
    
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
