angular.module('homework.controllers', [])

.controller('HomeCtrl', function($scope, Classes) {
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
})

.controller('CalendarCtrl', function($scope) {

})

.controller('AssignmentsCtrl', function($scope, Assignments) {
	$scope.assignments = Assignments.all();

	$scope.getTimeUntilDue = function(assignment) {
		var now = new Date();

		var start = moment([now.getYear(), now.getMonth(), now.getDate()]);
		var end = moment([assignment.dueDate.getYear(), assignment.dueDate.getMonth(), assignment.dueDate.getDate()]);

		return 'Due ' + end.from(start);
	};
})

.controller('AssignmentDetailCtrl', function($scope, $stateParams, Assignments) {
	$scope.assignment = Assignments.get($stateParams.assignmentId);
})

.controller('SettingsCtrl', function($scope) {

});