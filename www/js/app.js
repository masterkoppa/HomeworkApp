// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('homework', ['ionic', 'ui.calendar', 'jcs-autoValidate' ,'homework.controllers', 'homework.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.class-detail', {
    url: '/classes/:classId',
    views: {
      'tab-home': {
        templateUrl: 'templates/class-detail.html',
        controller: 'ClassDetailCtrl'
      }
    }
  })
  .state('tab.calendar', {
    url: '/calendar',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  })
  .state('tab.assignments', {
    url: '/assignments',
    views: {
      'tab-assignments': {
      templateUrl: 'templates/tab-assignments.html',
      controller: 'AssignmentsCtrl'
      }
    }
  })
  .state('tab.assignment-detail', {
    url: '/assignments/:assignmentId',
    views: {
      'tab-assignments': {
      templateUrl: 'templates/assignment-detail.html',
      controller: 'AssignmentDetailCtrl'
      }
    }
  })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
      templateUrl: 'templates/tab-settings.html',
      controller: 'SettingsCtrl'
      }
    }
  })
  .state('tab.new-class', {
    url: '/new/class',
    views: {
      'tab-home': {
      templateUrl: 'templates/new-class.html',
      controller: 'NewClassCtrl'
      }
    }
  })
  .state('tab.edit-class', {
    url: '/edit/class/:classId',
    views: {
      'tab-home': {
      templateUrl: 'templates/edit-class.html',
      controller: 'EditClassCtrl'
      }
    }
  })
  .state('tab.new-assignment', {
    url: '/new/assignment',
    views: {
      'tab-assignments': {
      templateUrl: 'templates/new-assignment.html',
      controller: 'NewAssignmentCtrl'
      }
    }
  })
  .state('tab.edit-assignment', {
    url: '/edit/assignment/:assignmentId',
    views: {
      'tab-assignments': {
      templateUrl: 'templates/edit-assignment.html',
      controller: 'EditAssignmentCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
