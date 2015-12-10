angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, Posts, $ionicPopover, $state) {
	
	$scope.posts = Posts.all();
	
	$ionicPopover.fromTemplateUrl('templates/menu.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	
	$scope.showMenu = function($event) {
		$scope.popover.show($event);
	}
  
	$scope.doLogout = function(){
		console.log('logging out...');
		$scope.popover.hide();
		$state.go('login');
		
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

.controller('MapsCtrl', function($scope, Posts, $ionicLoading) {
	
	ionic.Platform.ready(function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
		
		
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
	
	$ionicLoading.hide();
		
    });
	
	
})

.controller('SearchCtrl', function($scope, Posts, $ionicLoading) {
	
	ionic.Platform.ready(function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
		
		
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
	
	$ionicLoading.hide();
		
    });
  
})

.controller('LoginCtrl', function($scope, $timeout, $state, $ionicPopup) {
	// Form data for the login modal
	$scope.loginData = {};
	$scope.registerData = {};
	
	$scope.doRegistration = function(){
		$scope.registerData.error = '';
		console.log('Doing Registration', $scope.registerData);
		if(!$scope.registerData.name){
			$scope.registerData.error = "Please provide Name";
		}
		else if(!$scope.registerData.email){
			$scope.registerData.error = "Invalid email Id";
		}
		else if(!$scope.registerData.dob){
			$scope.registerData.error = "Please provide DOB";
		}
		else if(!$scope.registerData.country){
			$scope.registerData.error = "Please provide Country";
		}
		else if(!$scope.registerData.state){
			$scope.registerData.error = "Please provide State";
		}
		else if(!$scope.registerData.city){
			$scope.registerData.error = "Please provide City";
		}
		else if(!$scope.registerData.password || !$scope.registerData.rePassword){
			$scope.registerData.error = "Please provide Password";
		}
		else if($scope.registerData.password !== $scope.registerData.rePassword){
			$scope.registerData.error = "Password do not match";
		}else{
			$scope.registerData.success = "Successfully Registered";
		}
	}

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$state.go('tab.dash')
		}, 1000);
	};
	
	
	// Triggered on a button click, or some other target
	$scope.showRecoverPasswordPopup = function() {
		$scope.data = {}

		//popoevr
		var myPopup = $ionicPopup.show({
			template: '<form ng-submit="doRecovery()">'+
							'<label class="item item-input">'+
								'<i class="icon ion-at placeholder-icon"></i>'+
								'<input type="email" ng-model="data.email" placeholder="Email">'+
							'</label>'+
						'</form>',
			title: 'Enter registered email ID',
			subTitle: 'Please use normal things',
			scope: $scope,
			buttons: [
				{ text: 'Cancel' },
				{
					text: '<b>Recover</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.data.email) {
							//don't allow the user to close unless he enters wifi password
							e.preventDefault();
						} else {
							return $scope.data.email;
						}
					}
				}
			]
		});
		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});
		/*$timeout(function() {
			myPopup.close(); //close the popup after 3 seconds for some reason
		}, 3000);*/
	};
	
	
	// Triggered on a button click, or some other target
	$scope.showRegistrationPopup = function() {
		$scope.data = {}
	
		//popoevr
		var RegistrationPopup = $ionicPopup.show({
			template: '<form">'+
							'<div class="error" ng-if="registerData.error">'+
								'{{registerData.error}}'+
							'</div>'+
							'<div class="success" ng-if="registerData.success">'+
								'{{registerData.success}}'+
							'</div>'+
							'<label class="item item-input">'+
			
								'<input type="text" ng-model="registerData.name" placeholder="Name">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="email" ng-model="registerData.email" placeholder="Email">'+
							'</label>'+
							'<label class="item item-input">'+
								'<i class="placeholder-icon">DOB</i>'+
								'<input type="date" ng-model="registerData.dob" placeholder="DOB">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="text" ng-model="registerData.country" placeholder="Country">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="text" ng-model="registerData.state" placeholder="State">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="text" ng-model="registerData.city" placeholder="City">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="password" ng-model="registerData.password" placeholder="Password">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="password" ng-model="registerData.rePassword" placeholder="Re-Password">'+
							'</label>'+
						'</form>',
			title: 'Enter your information',
			scope: $scope,
			buttons: [
				{ 
					text: 'Cancel',
					onTap: function(e) {
						console.log('Action cancled');
						$scope.registerData.error = '';
						RegistrationPopup.close()
						e.preventDefault();
					}
				},
				{
					text: '<b>Register</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.registerData.email) {
							//don't allow the user to close unless he enters wifi password
							$scope.registerData.error = "Invalid Email Address";
							e.preventDefault();
							
						} else {
							//return $scope.registerData;
							//console.log('Tapped!', $scope.registerData);
							$scope.doRegistration();
							e.preventDefault();
						}
					}
				}
			]
		});
		/*RegistrationPopup.then(function(res) {
			console.log('Tapped!', res);
			$scope.doRegistration();
		});*/
		/*$timeout(function() {
			myPopup.close(); //close the popup after 3 seconds for some reason
		}, 3000);*/
	};
});
