angular.module('homework.Directives', [])

.directive('addBackButton', function(){
	return {
		link: function($scope, $element, $attrs){
			console.log("Got here");
		}
	}
})