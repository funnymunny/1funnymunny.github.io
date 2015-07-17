/**
 * VK Application script
 */

/**
 *
 * @type {Object}
 */
var Application = {

    /**
     * Run application
     */
    run : function()
    {
        $('#app-status').html('Application active');
    }
       // load current user info
        VK.api('users.get', { fields : 'first_name, last_name, photo_50'  }, this.onUserInfoResponse.bind(this));

        // load user friends
        VK.api('friends.get', {
            fields : 'first_name, last_name, photo_50, online, last_seen',
            order : 'random'
        }, this.onFriendsResponse.bind(this));

    },

    onUserInfoResponse  : function(data)
    {
        var users = data.response;
        var currentUser = users[0];

        $('#firstname').text(currentUser.first_name);
        $('#lastname').text(currentUser.last_name);
        $('#user-photo').attr('src', currentUser.photo_50);

    },


    onFriendsResponse   : function(data)
    {
        var users = data.response.items;
        var usersHtml = '';
        for(var i = 0; i < users.length; i++)
        {
            usersHtml += this._getUserInfoHtml(users[i]);
        }

        $('#friends').html(usersHtml);
    },


    _getUserInfoHtml    : function(user)
    {
        return '<div class="friend online-' + user.online +'">'
                + '<img class="avatar" src="' + user.photo_50 + '" />'
                + '<span class="username">' + user.first_name + ' ' + user.last_name + '</span>'
            + '</div>';
    }

};
