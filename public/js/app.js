$(function(){

    //INDEX BUTTON LINKS//
    const showParking = function () {
        window.location.href = '/parking'
    }
    
    const showWeather = function () {
        window.location.href = '/weather'
    }
    
    const showChat = function () {
        window.location.href = '/chat'
    }
    
    const showSignUp = function () {
        window.location.href = '/signup'
    }

    const showLogin = function () {
        window.location.href = '/login'
    }

    //BUTTON FOR TO SHOW AND HIDE NAVBAR//

    $(function() {
        $('.nav-button').on("click",
            function() {
                $(".navbar").addClass("d-none");
                $('.nav-button').addClass("d-none");
                $('.nav-button2').removeClass("d-none");
            }
        )
        
    })

    $(function() {
        $('.nav-button2').on("click",
            function() {
                $(".navbar").removeClass("d-none");
                $('.nav-button2').addClass("d-none");
                $('.nav-button').removeClass("d-none");
            }
        )
        
    })



//PARKING RELATED JS//


$(function(){
    $('.zoombtn').on("click",
    function(){
        $(".modal").removeClass("d-none");
    })

    $(".close").on("click",
    function(){
        $(".modal").addClass("d-none");
    })
})

//MAILING LIST RELATED JS//


const getInput = function(event){
    event.preventDefault();

    const input = function(){
        name = $('#name').val();
        email = $('#email').val();
        
    }
    input();
    
    const information = {
        userName: name,
        email: email
    }
  
    
    $('#name').val("");
    $('#email').val("");

    $.ajax({
        method: "POST",
        url: "api/signup",
        data: information
    })
}


$('.submit').on('click', getInput)


const showAdmin = function(event){
    event.preventDefault();
    window.location.href = '/admin'
    

}

$('.admin').on('click', showAdmin)


//WEATHER RELATED JS//

$(function(){
    $('.btn3').on("click",
    function(){
        $(".forecast").removeClass("d-none");
    })
})



//ADMIN RELATED JS//

const getList = function(event){
    event.preventDefault();

    const input = function(){
        name = $('#name').val();
        email = $('#email').val();
        
    }
    input();
    

  
    
    $('#name').val("");
    $('#email').val("");

    $.ajax({
        method: "GET",
        url: "api/signup"}).then(function(data){
            const admin = $('.adminPage');
            
            for (let i = 0; i < data.length; i++){
                
                let name = data[i].userName;
                let email = data[i].email;
                

                admin.append(`<div><b>${name}: ${email}</b></div><br><br>`);
                
            }
        })
}


$('.listbtn').on('click', getList)
    
    $('.parkingDir').on('click', showParking);
    $('.weatherDir').on('click', showWeather);
    $('.watsonDir').on('click', showChat);
    $('.signupDir').on('click', showSignUp);
    $('.loginDir').on('click', showLogin);
})

