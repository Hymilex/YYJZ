
jQuery(document).ready(function() {

    $('#btn').click(function(){
        var username = $('.username').val();
        var password = $('.password').val();
        if(username == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $('.error').fadeIn('fast', function(){
                $('.username').focus();
            });
            return false;
        }
        if(password == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $('.error').fadeIn('fast', function(){
                $('.password').focus();
            });
            return false;
        }
        $.cookie('user',$('.username').val());
        window.location.href='main.htm';
    });
    //当有按键发生时 移除error样式
    $('.page-container form .username, .page-container form .password').keyup(function(){
        $('.error').fadeOut('fast');
    });

});
