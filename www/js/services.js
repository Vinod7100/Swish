angular.module('starter.services', [])

.factory('Posts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var posts = [{
    id: 0,
    name: 'Vinod Kumar',
    posted_on: 'November 05, 1955',
	description: 'A facebook friend just joined Swish',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 1,
    name: 'Soru Khurana',
    posted_on: 'November 05, 1955',
	description: 'Accepted your friend request',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 2,
    name: 'Sonam',
    posted_on: 'November 05, 1955',
	description: 'Has checked in YMCA',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 3,
    name: 'Sajan',
    posted_on: 'November 05, 1955',
	description: 'Has checked in New York sport club',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Ben Sparrow',
    posted_on: 'November 05, 1955',
	description: 'Has checked in New York sport club',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
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
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
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

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'http://parssv.com/swish/images/3j5HUXMY.png'
  }];

  return {
    all: function() {
      return friends;
    },
    remove: function(friend) {
      friends.splice(friends.indexOf(friend), 1);
    },
    get: function(friendId) {
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].id === parseInt(friendId)) {
          return friends[i];
        }
      }
      return null;
    }
  };
})
