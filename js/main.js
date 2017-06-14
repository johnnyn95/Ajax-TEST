$(function(){
    var $friends = $('#friends');
    var $name = $('#name');
    var $age = $('#age');

    /*Mustache template*/
    var friendTemplate = 
    "<li class='list-group-item text-left' >"+
    "<p><h4>Name: <strong>{{name}}</strong></h4></p>"+
    "</br>"+
    "<p><h4>Age: <strong>{{age}}</strong></h4></p>"+ 
    "<p class='text-right'><button type='submit' class='remove btn btn-default' data-id='{{id}}'><span class='glyphicon glyphicon-remove'></span></button></p>" +
    "</li>";

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
            },
            error: function(){
                alert('Error adding friend!');
            }
        });
        
    })

    /*Deleting the item with data-id in API,also deleting the li on button click within the li*/
    $friends.delegate(".remove", "click" ,function() {
            var $li = $(this).closest('li');

            $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/johnbob/friends/' + $(this).attr('data-id'),       
            success: function() {
                $li.remove();
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