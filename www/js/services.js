angular.module('starter.services', [])

.factory('Posts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var posts = [{
    id: 0,
    name: 'Vinod Kumar',
    posted_on: 'November 05, 1955',
	description: 'A facebook friend just joined Swish',
    face: 'http://parssv.com/swish/images/demo.jpg'
  }, {
    id: 1,
    name: 'Soru Khurana',
    posted_on: 'November 05, 1955',
	description: 'Accepted your friend request',
    face: 'img/ionic.png'
  }, {
    id: 2,
    name: 'Sonam',
    posted_on: 'November 05, 1955',
	description: 'Has checked in YMCA',
    face: 'http://parssv.com/swish/images/request-a-demo.png'
  }, {
    id: 3,
    name: 'Sajan',
    posted_on: 'November 05, 1955',
	description: 'Has checked in New York sport club',
    face: 'img/ionic.png'
  }, {
    id: 4,
    name: 'Ben Sparrow',
    posted_on: 'November 05, 1955',
	description: 'Has checked in New York sport club',
    face: 'img/ionic.png'
  }];

  return {
    all: function() {
      return posts;
    },
    remove: function(post) {
      posts.splice(chats.indexOf(post), 1);
    },
    get: function(postId) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === parseInt(postId)) {
          return posts[i];
        }
      }
      return null;
    }
  };
})



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ionic.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'http://parssv.com/swish/images/request-a-demo.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/ionic.png'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/ionic.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'http://parssv.com/swish/images/demo.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Friends', function($http) {
	// Might use a resource here that returns a JSON array
	var users = [];

	return {
		getUsers: function(){
			return $http.get(SERVER_URL +"/users").then(function(response){
				users = response;
				return users;
			});
		},
		getUser: function(index){
			return $http.get(SERVER_URL +"/user/"+ index).then(function(response){
				user = response;
				return user;
			});
		}
	};
})


.service('UserService', function() {

//for the purpose of this example I will store user data on ionic local storage but you should save it on a database

	var setUser = function(user_data) {
		window.localStorage.starter_facebook_user = JSON.stringify(user_data);
	};
  
	var removeItem = function(){
		window.localStorage.clear();
	};

	var getUser = function(){
		return JSON.parse(window.localStorage.starter_facebook_user || '{}');
	};
  
	var setEditUser = function(user_data) {
		window.localStorage.edit_user = JSON.stringify(user_data);
	};
  
	var getEditUser = function(){
		return JSON.parse(window.localStorage.edit_user || '{}');
	};

  return {
    getUser: getUser,
    getEditUser: getEditUser,
    setUser: setUser,
    removeItem: removeItem,
    setEditUser: setEditUser
  };
})

.factory('Message', ['$firebaseArray',
	function($firebaseArray) {
		var ref = new Firebase(firebaseUrl);
		var messages = $firebaseArray(ref.child('messages'));
 
		var Message = {
			all: messages,
			create: function (from, to, message) {
						if (from && to && message) {
							var chatMessage = {
								from: from.email,
								to: to,
								message: message,
								createdAt: Firebase.ServerValue.TIMESTAMP
							};
							return messages.$add(chatMessage);
						}
			},
			get: function (messageId) {
				return $firebaseArray(ref.child('messages').child(messageId));
			},
			delete: function (message) {
				return messages.$remove(message);
			}
		};
 
		return Message;
 
	}
]);