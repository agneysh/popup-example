$(document).ready(function () {

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    $(function () {
        if (localStorage.getItem("email") === null) {

            $('.pop-up').hide();
            $('.pop-up').fadeIn(1000);
        }
        else {
            $('.pop-up').hide();
            $('#overlay').removeClass('blur-in');
        }

        $('.close-button').click(function (e) {
            $('.pop-up').fadeOut(700);
            $('#overlay').removeClass('blur-in');
            $('#overlay').addClass('blur-out');
            e.stopPropagation();
        });
    });

    $('a#button').click(function () {
        var emailAddress = $('input[data-id=emailAddress]').val();

        if (validateEmail(emailAddress) !== true) {
            alert('Invalid Email');
        }
        else {
            var myArray = { email: emailAddress };
            $.ajax({
                url: "receiver.php",
                type: "post",
                data: myArray,
                success: function (data) {
                    if (200 == data.status) {
                        $('.pop-up').fadeOut(700);
                        $('#overlay').removeClass('blur-in');
                        $('#overlay').addClass('blur-out');
                        localStorage.setItem("email", true);
                    }
                    if (400 == data.status) {
                        alert('Invalid Email');
                    }

                },
                fail: function (data) {
                    alert('Unfortunately could not save your data.');
                }
            });
        }
    });
});