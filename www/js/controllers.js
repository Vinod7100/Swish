angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, Posts, $ionicPopover) {
	
	$scope.posts = Posts.all();
	
	$ionicPopover.fromTemplateUrl('templates/menu.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
  $scope.showMenu = function($event) {
    $scope.popover.show($event);
  }
  
})

.controller('DashCtrl', function($scope, Posts, $ionicPopover) {
	
	$scope.posts = Posts.all();
	
	$scope.image = $scope.posts[0].face;
	
	$scope.doRefresh = function(){
		$scope.posts = Posts.all();
	}
  
})

.controller('ChatsCtrl', function($scope, Friends) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.friends = Friends.all();
  $scope.remove = function(friend) {
    Friends.remove(friend);
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.friends = Friends.all();
  $scope.remove = function(friend) {
    Friends.remove(friend);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Friends, $timeout, $ionicScrollDelegate) {
	console.log('ChatDetailCtrl');
	$scope.friend = Friends.get($stateParams.friendId);
	
	
	/* Chat Message code starts here */
	$scope.hideTime = true;

	var alternate,
	isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

	$scope.sendMessage = function() {
		alternate = alternate;

		var d = new Date();
		d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

		$scope.messages.push({
			userId: alternate ? '12345' : '54321',
			text: $scope.data.message,
			time: d
		});

		delete $scope.data.message;
		$ionicScrollDelegate.scrollBottom(true);
	
	};


	$scope.inputUp = function() {
		if (isIOS) $scope.data.keyboardHeight = 216;
		$timeout(function() {
			$ionicScrollDelegate.scrollBottom(true);
		}, 300);
	};

	$scope.inputDown = function() {
		if (isIOS) $scope.data.keyboardHeight = 0;
		$ionicScrollDelegate.resize();
	};

	$scope.closeKeyboard = function() {
		// cordova.plugins.Keyboard.close();
	};

	$scope.data = {};
	$scope.myId = '12345';
	$scope.messages = [];
})

.controller('FriendChatCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
  
  // set the rate and max variables
  $scope.rate = 3;
  $scope.max = 5;
})

.controller('PostCommentCtrl', function($scope, $stateParams) {
  $scope.postId = $stateParams.postId;
  $scope.comments = [{
    id: 0,
    name: 'Ben Sparrow',
    commented_on: 'November 05, 1955',
    face: 'http://ionicframework.com/img/docs/mcfly.jpg',
	text: 'This is a "Facebook" styled Card'
  }, {
    id: 1,
    name: 'Ben Sparrow',
    commented_on: 'November 05, 1955',
    face: 'http://ionicframework.com/img/docs/mcfly.jpg',
	text: 'This is a "Facebook" styled Card'
  }, {
    id: 2,
    name: 'Ben Sparrow',
    commented_on: 'November 05, 1955',
    face: 'http://ionicframework.com/img/docs/mcfly.jpg',
	text: 'This is a "Facebook" styled Card'
  }, {
    id: 3,
    name: 'Ben Sparrow',
    commented_on: 'November 05, 1955',
    face: 'http://ionicframework.com/img/docs/mcfly.jpg',
	text: 'This is a "Facebook" styled Card'
  }, {
    id: 4,
    name: 'Ben Sparrow',
    commented_on: 'November 05, 1955',
    face: 'http://ionicframework.com/img/docs/mcfly.jpg',
	text: 'This is a "Facebook" styled Card'
  }];
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ProfileCtrl', function($scope) {
  
})

.controller('MapsCtrl', function($scope, Posts) {
	//map variable containing the map details, will be referenced from the html
    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 4,
      bounds: {}
    };
    $scope.options = {
      scrollwheel: false
    };
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
		idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createRandomMarker(i, $scope.map.bounds))
        }
        $scope.randomMarkers = markers;
      }
    }, true);
})

.controller('SearchCtrl', function($scope) {
  
})

.controller('RegistrationCtrl', function($scope) {
  
})

.controller('RecoverCtrl', function($scope) {
  
})

.controller('LoginCtrl', function($scope, $timeout, $state) {
	// Form data for the login modal
	$scope.loginData = {};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$state.go('tab.dash')
		}, 1000);
	};
});
