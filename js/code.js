jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
var form = $( "#contactForm" );
$(document).ready(function(){

    $("#contactForm").validate({

       rules:{

            name:{
                required: true,
                minlength: 3,
                maxlength: 60,
            },

            secondname:{
                required: true,
                minlength: 3,
                maxlength: 60,
            },
            email:{
                required: true,
                email: true,
            },
            gender:{
                required: true,
            },
            pass:{
                required: true,
                minlength: 6,
                maxlength: 10,
            },
            checkbox:{
                required: true,
            },

       }

    });
    $( "button" ).click(function() {
      if(form.valid()) {
            var msg   = $("#contactForm").serialize();
            console.log(msg);
            $.ajax({
              type: 'POST',
              url: 'http://codeit.pro/frontTestTask/user/registration',
              data: msg,
              success: function(data) {
                console.log(data);
                if (data.status === 'OK') {window.location.href='main.html'}
                else {alert(data.message)};
              }
            });
        };
    });

});
