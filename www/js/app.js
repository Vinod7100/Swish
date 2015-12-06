// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'directives.dropdown', 'uiGmapgoogle-maps', 'ionic.rating'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, uiGmapGoogleMapApiProvider) {
	
	uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCaN0fSsoEfiSyOvDFI3UaUX4-ouCyelQA',
       // v: '3.17',
        libraries: '',
        language: 'en',
        sensor: 'false',
    })
	
	
	$ionicConfigProvider.tabs.position('bottom'); // other values: top

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html', 
	controller: 'TabCtrl'
  })
  
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  
	.state('login', {
		url: "/login",
		templateUrl: "templates/login.html",
		controller: 'LoginCtrl'
	})
	
	.state('registration', {
		url: "/registration",
		templateUrl: "templates/registration.html",
		controller: 'RegistrationCtrl'
	})
	
	.state('recover', {
		url: "/recover",
		templateUrl: "templates/recover-password.html",
		controller: 'RecoverCtrl'
	})

	.state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
	
    .state('tab.chat-detail', {
      url: '/chats/:friendId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
	
	.state('tab.comments', {
      url: '/dash/comments/:postId',
		views: {
        'tab-dash': {
          templateUrl: 'templates/tab-comments.html',
          controller: 'PostCommentCtrl'
		}
		}
    })

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'AccountCtrl'
			}
		}
	})
  
	.state('tab.profile', {
		url: '/profile',
		views: {
			'tab-profile': {
				templateUrl: 'templates/tab-profile.html',
				controller: 'ProfileCtrl'
			}
		}
	})
	
	.state('tab.search', {
		url: '/search',
		views: {
			'tab-search': {
				templateUrl: 'templates/tab-search.html',
				controller: 'SearchCtrl'
			}
		}
	})
	
	.state('tab.friends', {
      url: '/profile/friends',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
	
	.state('tab.friendchat', {
      url: '/profile/friends/:friendId',
		views: {
        'tab-profile': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendChatCtrl'
		}
		}
    })
	
	.state('tab.maps', {
      url: '/profile/maps',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-maps.html',
          controller: 'MapsCtrl'
        }
      }
    });
	
	

	// if none of the above states are matched, use this as the fallback
	//$urlRouterProvider.otherwise('/tab/dash');
	$urlRouterProvider.otherwise('/login');

})

// All this does is allow the message
// to be sent when you tap return
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});
