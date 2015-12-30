angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, Posts, $ionicPopover, $ionicLoading, $ionicHistory, $timeout, UserService, $state) {
	
	$scope.posts = Posts.all();
	
	$ionicPopover.fromTemplateUrl('templates/menu.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	
	$scope.showMenu = function($event) {
		$scope.popover.show($event);
	};
  
	$scope.doLogout = function(){
		$ionicLoading.show();
		console.log('logging out...');
		$scope.popover.hide();
		$timeout(function() {
			UserService.removeItem();
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
			$state.go('login');
			$ionicLoading.hide();
		}, 1000);
	};
  
})

.controller('DashCtrl', function($scope, Posts, $ionicPopover) {
	
	$scope.posts = Posts.all();
	
	$scope.image = $scope.posts[0].face;
	
	$scope.doRefresh = function(){
		$scope.posts = Posts.all();
	};
  
})

.controller('ChatsCtrl', function($scope, Friends, $timeout, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	$scope.friends = [];
	$ionicLoading.show();
	Friends.getUsers().then(function(users){
		$scope.friends = users.data;
		$ionicLoading.hide();
	});
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

.controller('ChatDetailCtrl', function($scope, $stateParams, UserService, Friends, $timeout, $ionicScrollDelegate, Message) {
	console.log('ChatDetailCtrl');
	$scope.swishUser = {};
	$scope.swishUser = UserService.getUser();
	console.log($stateParams.friendId);
	$scope.friendId = $stateParams.friendId;
	//$scope.friend = [];
	/*Friends.getUser($stateParams.friendId).then(function(users){
		$scope.friend = users.data;
		
		console.log($scope.friend.id);
	});*/
	
	/**** Firebase Chats ****/
	
	$scope.messages = Message.all;
	
	$scope.sendMessage = function () {
		Message.create($scope.swishUser, $stateParams.friendId, $scope.data.message);
		delete $scope.data.message;
		$ionicScrollDelegate.scrollBottom(true);
	};

	/*$scope.remove = function (chat) {
		firebaseChats.remove(chat);
	}*/

	/**** Firebase Chats ****/
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

.controller('ProfileCtrl', function($scope, UserService, $ionicLoading, $timeout, $ionicPopup, $http, $q) {
	$scope.editProfileData = {};
	$scope.swishUser = {};
	$ionicLoading.show();
	$scope.swishUser = UserService.getUser();	
	
	UserService.setEditUser({
		id: $scope.swishUser.id,
		name: $scope.swishUser.name,
		dob: $scope.swishUser.dob,
		country: $scope.swishUser.country,
		state: $scope.swishUser.state,
		city: $scope.swishUser.city,
		picture: $scope.swishUser.image
	});
	$scope.editProfileData = UserService.getEditUser();
	
	/**** Popup code for edit profile starts here ****/
	// Triggered on a button click, or some other target
	$scope.showEditProfilePopup = function() {
		$scope.data = {}
	
		//popoevr
		var EditProfilePopup = $ionicPopup.show({
			template: '<form">'+
							'<div class="error" ng-if="editProfileData.error">'+
								'{{editProfileData.error}}'+
							'</div>'+
							'<div class="success" ng-if="editProfileData.success">'+
								'{{editProfileData.success}}'+
							'</div>'+
							'<label class="item item-input">'+
								'<input type="file" ng-model="editProfileData.picture" placeholder="Profile Image">'+
							'</label>'+
							'<label class="item item-input">'+
								'<input type="text" ng-model="editProfileData.name" placeholder="Name">'+
							'</label>'+
							'<label class="item item-input">'+
								'<i class="placeholder-icon">DOB</i>'+
								'<input type="date" ng-model="editProfileData.dob" placeholder="DOB">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="text" ng-model="editProfileData.country" placeholder="Country">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="text" ng-model="editProfileData.state" placeholder="State">'+
							'</label>'+
							'<label class="item item-input">'+
								
								'<input type="text" ng-model="editProfileData.city" placeholder="City">'+
							'</label>'+
						'</form>',
			title: 'Change you information',
			scope: $scope,
			buttons: [
				{ 
					text: 'Cancel',
					onTap: function(e) {
						console.log('Action cancled');
						$scope.editProfileData = UserService.getEditUser();
						EditProfilePopup.close();
						e.preventDefault();
					}
				},
				{
					text: '<b>Update</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.editProfileData) {
							//don't allow the user to close unless he enters wifi password
							//$scope.editProfileData.error = "Invalid Email Address";
							e.preventDefault();
							
						} else {
							//return $scope.editProfileData;
							//console.log('Tapped!', $scope.editProfileData);
							//$scope.doEditProfile();
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
	/**** Popup code for edit profile ends here ****/
	$ionicLoading.hide();
})

.controller('MapsCtrl', function($scope, Posts, $ionicLoading, $cordovaGeolocation) {
	
	$scope.myPosition = {};
	
	ionic.Platform.ready(function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
		
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function (position) {
			var lat  = position.coords.latitude;
			var long = position.coords.longitude;
			console.log(lat +", "+ long);
			
			
			//map variable containing the map details, will be referenced from the html
			$scope.map = {
				center: {
					latitude: lat,
					longitude: long
				},
				zoom: 14,
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
					for (var i = 0; i < 10; i++) {
						markers.push(createRandomMarker(i, $scope.map.bounds))
					}
					$scope.randomMarkers = markers;
				}
			}, true);
			
			
			
		}, function(err) {
				// error
		});
		
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

.controller('LoginCtrl', function($scope, $timeout, $state, $ionicPopup, $http, $ionicLoading, UserService, $q) {
	// Form data for the login modal
	$scope.loginData = {};
	$scope.registerData = {};
	$scope.registerDataFb = {};
	
	$scope.doRegistration = function(){
		$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Please wait!'
        });
		
		$scope.registerData.error = '';
		$scope.registerData.success = '';
		
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
			$http.post(SERVER_URL +'/registration', {data : $scope.registerData}).then(function (res){
				$scope.response = res.data;
				//console.log($scope.response);
				if($scope.response.type == 'error'){
					$scope.registerData.error = $scope.response.msg;
					$ionicLoading.hide();
				}else if($scope.response.type == 'success'){
					$scope.registerData = {};
					$scope.registerData.success = $scope.response.msg;
					$ionicLoading.hide();
				}
			});
		}
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		$scope.loginData.error = '';
		$scope.loginData.success = '';
		
		$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Please wait!'
        });
		
		console.log('Doing login', $scope.loginData);
		$http.post(SERVER_URL +'/login', {data : $scope.loginData}).then(function (res){
			$scope.response = res.data;
			//console.log($scope.response);
			if($scope.response.type == 'error'){
				$scope.loginData.error = $scope.response.msg;
				$ionicLoading.hide();
			}else if($scope.response.type == 'success'){
				
				UserService.setUser({
					swishUserID: $scope.response.data.id,
					name: $scope.response.data.name,
					email: $scope.response.data.email,
					dob: $scope.response.data.dob,
					country: $scope.response.data.country,
					state: $scope.response.data.state,
					city: $scope.response.data.city,
					picture : $scope.response.data.image
				});
				
				$scope.loginData.success = $scope.response.msg;
				$timeout(function() {
					$state.go('tab.dash')
					$ionicLoading.hide();
					$scope.loginData = {};
				}, 1000);
			}
		});
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
	
	
	/**** Popup code for registration starts here ****/
	// Triggered on a button click, or some other target
	$scope.showRegistrationPopup = function() {
		$scope.data = {};
	
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
	/**** Popup code for registration ends here ****/
	
	
	
	/***** Facebook Login Code Starts here ****/
	//This is the success callback from the login method
	var fbLoginSuccess = function(response) {
		if (!response.authResponse){
			fbLoginError("Cannot find the authResponse");
			return;
		}

		var authResponse = response.authResponse;

		getFacebookProfileInfo(authResponse)
		.then(function(profileInfo) {
			//for the purpose of this example I will store user data on local storage
			UserService.setUser({
				authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
				fullData: profileInfo,
				picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
			});
			
			$scope.registerDataFb.name = profileInfo.name;
			$scope.registerDataFb.email = profileInfo.email;
			$scope.registerDataFb.auth_id = profileInfo.id;
			$scope.registerDataFb.auth_type = "Facebook";
			$scope.registerDataFb.image = "http://graph.facebook.com/" + $scope.registerDataFb.auth_id + "/picture?type=large";
			
			$http.post(SERVER_URL +'/fbregistration', {data : $scope.registerDataFb}).then(function (res){
				//$scope.response = res.data;
				//console.log($scope.response);
			});
			
			$ionicLoading.hide();
			$state.go('tab.dash');

		}, function(fail){
			//fail get profile info
			console.log('profile info fail', fail);
		});
	};


	//This is the fail callback from the login method
	var fbLoginError = function(error){
		console.log('fbLoginError', error);
		$ionicLoading.hide();
	};

	//this method is to get the user profile info from the facebook api
	var getFacebookProfileInfo = function (authResponse) {
		var info = $q.defer();

		facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
			function (response) {
				console.log(response);
				info.resolve(response);
			},
			function (response) {
				console.log(response);
				info.reject(response);
			}
		);
		return info.promise;
	};

	//This method is executed when the user press the "Login with facebook" button
	$scope.facebookSignIn = function() {

		facebookConnectPlugin.getLoginStatus(function(success){
			if(success.status === 'connected'){
				// the user is logged in and has authenticated your app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed request, and the time the access token
				// and signed request each expire
				console.log('getLoginStatus', success.status);

				//check if we have our user saved
				var user = UserService.getUser('facebook');

				if(!user.userID)
				{
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {

						//for the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});
						
						$scope.registerDataFb.name = profileInfo.name;
						$scope.registerDataFb.email = profileInfo.email;
						$scope.registerDataFb.auth_id = profileInfo.id;
						$scope.registerDataFb.auth_type = "Facebook";
						$scope.registerDataFb.image = "http://graph.facebook.com/" + $scope.registerDataFb.auth_id + "/picture?type=large";
					
						
						$http.post(SERVER_URL +'/fbregistration', {data : $scope.registerDataFb}).then(function (res){
							//$scope.response = res.data;
							//console.log($scope.response);
						});
						
						$state.go('tab.dash');

					}, function(fail){
						//fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('tab.dash');
				}

			} else {
				//if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
				//else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
					template: 'Logging in...'
				});

				//ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
				facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
			}
		});
	};
	/***** Facebook Login Code ends here ****/
	
	
});
