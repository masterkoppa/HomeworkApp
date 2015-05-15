angular.module('homework.controllers', [])

.controller('HomeCtrl', function($scope, Classes, Assignments) {
	$scope.classes = Classes.all();

	$scope.getNextMeetingTime = function(classObject) {
		for (var i = 0; i < classObject.meetingTimes.length; i++) {
			var meetingTime = classObject.meetingTimes[i];

			if (meetingTime.day == moment().day() && meetingTime.end.hour > moment().hour() && meetingTime.end.minute > moment().minute() && meetingTime.start.hour <= moment().hour() && meetingTime.start.minute <= moment().minute()) {
				return 'Meeting Now';
			} else if (meetingTime.day == moment().day() && meetingTime.start.hour > moment().hour()) {
				if (meetingTime.start.hour > moment().hour()) {
					return 'Meets in ' + (meetingTime.start.hour - moment().hour() - 1) + ' hours ' + ((60 + meetingTime.start.minute) - moment().minute()) + ' minutes';
				} else {
					return 'Meets in ' + (meetingTime.start.minute - moment().minute()) + ' minutes';
				}
			} else if (meetingTime.day > moment().day()) {
				if (meetingTime.day - moment().day() == 1) {
					return 'Meets Tomorrow';
				} else {
					return 'Meets in ' + (meetingTime.day - moment().day()) + ' days';
				}
			} else if (i == classObject.meetingTimes.length - 1) {
				return 'Meets in ' + (meetingTime.day + 7 - moment().day()) + ' days';
			}
		};
	};
})

.controller('ClassDetailCtrl', function($scope, $stateParams, Classes) {
	$scope.class = Classes.get($stateParams.classId);

	$scope.getFormattedMeetingTime = function (meetingTime) {
		var start = moment().set({ 'hour': meetingTime.start.hour, 'minute': meetingTime.start.minute });
		var end = moment().set({ 'hour': meetingTime.end.hour, 'minute': meetingTime.end.minute });

		return moment().isoWeekday(meetingTime.day).format('dddd') + ' @ ' + moment(start).format('h:mm A') + ' - ' + moment(end).format('h:mm A');
	};

	$scope.calculateGrade = function () {
		var sum = 0, num = 0;
		for (var i = 0; i < $scope.class.assignments.length; i++) {
			if ($scope.class.assignments[i] && $scope.class.assignments[i].grade) {
				sum += $scope.class.assignments[i].grade;
				num += 1;
			}
		}

		if (num == 0) {
			return null
		}

		// TODO: Maybe add weights to assignments and calculate grade based off of that rather than a simple average
		return (sum / num);
	};
})

.controller('CalendarCtrl', function($scope) {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
})

.controller('AssignmentsCtrl', function($scope, Assignments) {
	$scope.assignments = Assignments.all();

	$scope.getTimeUntilDue = function(assignment) {
		var start = moment();
		var end = assignment.dueDate;

		return 'Due ' + end.from(start);
	};
})

.controller('AssignmentDetailCtrl', function($scope, $stateParams, Assignments) {
	$scope.assignment = Assignments.get($stateParams.assignmentId);
})

.controller('SettingsCtrl', function($scope) {

});