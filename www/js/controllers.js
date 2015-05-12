angular.module('homework.controllers', [])

.controller('HomeCtrl', function($scope, Classes) {
	$scope.classes = Classes.all();
})

.controller('ClassDetailCtrl', function($scope, $stateParams, Classes) {
	$scope.class = Classes.get($stateParams.classId);

	$scope.getNextMeetingTime = function() {
		// TODO: Use Moment.js to return a string containing the next meeting time of the class
	};
})

.controller('CalendarCtrl', function($scope) {

})

.controller('AssignmentsCtrl', function($scope, Assignments) {
	$scope.assignments = Assignments.all();
})

.controller('AssignmentDetailCtrl', function($scope, $stateParams, Assignments) {
	$scope.assignment = Assignments.get($stateParams.assignmentId);
})

.controller('SettingsCtrl', function($scope) {

});