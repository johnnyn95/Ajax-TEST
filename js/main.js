$(function(){
    var $friends = $('#friends');
    var $name = $('#name');
    var $age = $('#age');
    var $photos = $('#photos');
    var $albumId = $('#albumId');

    /*Mustache template*/
    var friendTemplate = 
    "<li class='list-group-item text-left' >"+
    "<p><h4>Name: <strong>{{name}}</strong></h4></p>"+
    "</br>"+
    "<p><h4>Age: <strong>{{age}}</strong></h4></p>"+ 
    "<p class='text-right'><button type='submit' class='remove btn btn-default' data-id='{{id}}'><span class='glyphicon glyphicon-remove'></span></button></p>" +
    "</li>";

    /*Mustache template*/
    var photoTemplate = 
    "<li id='{{id}}'>"+
        "<div>" +
            "<div class='container col-md-4'>" +
                    "<img src='{{thumbnailUrl}}' class=' img-circle'></img>" +
            "</div>" +

            "<div class='row'>" +
                "<div class='container col-md-6'>" +
                    "<p><h4>Title:{{title}}</h4></p>"+ 
                "</div>" +
                
            "</div>" +
        "</div>" +
    "</li>" +
    "<br>";

    /*Get pictures from API*/
    $.ajax({
    type: 'GET',
    url: 'https://jsonplaceholder.typicode.com/photos',
    success: function(data) {
        $.each(data,function(i,photo) {
            if(photo.id < 10)
            $photos.append(Mustache.render(photoTemplate,photo));      
        });
    }
    });

    /*Filling the ul with items which are not empty*/
    $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/johnbob/friends',
    success: function(data) {
        $.each(data,function(i,friend) {
            if(friend.name && friend.age != null)
            $friends.append(Mustache.render(friendTemplate,friend));
        });
    }
    });

    /*Taking inputs from the form,posting the to the API and appending/adding li in the ul*/
    $('#add-friend').on('click',function(){
        var $addFriend = {
            name: $name.val(),
            age: $age.val(),
        };

            $.ajax({
                type:'POST',
                url: 'http://rest.learncode.academy/api/johnbob/friends/',
                data: $addFriend,
                success:function(addFriend) {
                    $("#friends").append(Mustache.render(friendTemplate,addFriend));
                }
            });
        
    });

    /*Deleting the item with data-id in API,also deleting the li on button click within the li*/
    $friends.delegate(".remove", "click" ,function() {
            var $li = $(this).closest('li');
            var self = this;
            $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/johnbob/friends/' + $(this).attr('data-id'),       
            success: function() {
                $(self);
                $li.fadeOut(300,function(){
                    $(this).remove();
                });
            },
            error: function(){
                alert('Error removing friend!');
            }});
    });

    /*Div scroll animation*/
    $(window).scroll(function(){
    $('#inputForm').stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginRight":($(window).scrollLeft()) + "px"}, "slow" );
    });
        
});