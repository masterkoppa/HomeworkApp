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

.controller('CalendarCtrl', function($scope, Classes, uiCalendarConfig) {

    /* Event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    $scope.events = [];
    $scope.classes = Classes.all();
    for (var i = 0; i < $scope.classes.length; i++) {
    	var date = new Date($scope.classes[i].start);
    	while (date.getTime() <= new Date($scope.classes[i].end).getTime()) {
    		for (var j = 0; j < $scope.classes[i].meetingTimes.length; j++) {
    			if (date.getDay() == $scope.classes[i].meetingTimes[j].day) {
    				$scope.events.push({
			    		title: $scope.classes[i].name,
			    		start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), $scope.classes[i].meetingTimes[j].start.hour, $scope.classes[i].meetingTimes[j].start.minute),
			    		end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), $scope.classes[i].meetingTimes[j].end.hour, $scope.classes[i].meetingTimes[j].end.minute),
			    		allDay: false,
			    		color: $scope.classes[i].color
			    	});
    			}
    		}
    		date.setDate(date.getDate() + 1);
    	}
    }

    /* Event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.selectedView = 'month';
    /* Change View */
    $scope.changeView = function (view, calendar) {
    	$scope.selectedView = view;
    	uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };

    /* Config object */
    $scope.uiConfig = {
      calendar:{
        height: 500,
        editable: false,
        header:{
          left: 'title',
          center: '',
          right: 'prev,next'
        }
      }
    };

    /* Event sources array */
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
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

})

.controller('NewClassCtrl', function($scope, Classes, $location) {

    $scope.createClass = function (classJson) {
        Classes.create(classJson);
        $location.path('/');
    }
})

.controller('NewAssignmentCtrl', function($scope, Assignments, Classes, $location) {

	$scope.classes = Classes.all();

    $scope.createAssignment = function (assignmentJson) {
    	var newAssignment = {
		    classId: assignmentJson.class.id,
		    name: assignmentJson.name,
		    dueDate: moment().set({
		    	'year': assignmentJson.dueDate.getFullYear(), 
		    	'month': assignmentJson.dueDate.getMonth(), 
		    	'date': assignmentJson.dueDate.getDate(), 
		    	'hour': assignmentJson.dueTime.getHours(), 
		    	'minute': assignmentJson.dueTime.getMinutes(), 
		    	'second': assignmentJson.dueTime.getSeconds()
		    }),
		    isCompleted: false,
		    notes: assignmentJson.notes,
		    grade: null
    	};

        Assignments.create(newAssignment);
        $location.path('/');
    }
});