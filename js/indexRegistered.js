// Authors: Owiny Ayorech
// Date: July 31,2019
// Version: 2.5
// Functionality: Sets up carousel, modals, and vacation package cards

$(document).ready(function () {
    // addAccordionEvents();
    if ($(window).width() > 530) {
        $('#cardCarousel').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            arrows: false
        });
    } else {
        $('#cardCarousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            arrows: false
        });
    }
    // Click event for accordion on cards
    $('.title').on('click', function () {
        if ($('#travelImageSection').css('margin-bottom') == '200px') {
            $('#travelImageSection').css('margin-bottom', '30px');
        } else {
            $('#travelImageSection').css('margin-bottom', '200px');
        }
        // Makes accordion show/hide content (by adding/removing active class)
        if ($(this).attr("class") == 'title') {
            $(this).attr("class", "active title");
            $(this).next().attr("class", "active content");
            $('#cardCarousel').slick('slickPause'); // Pauses carousel
        } else {
            $(this).attr("class", "title");
            $(this).next().attr("class", "content");
            $('#cardCarousel').slick('slickPlay'); // Resumes carousel
        }
    });

    // Shows order modal on order button click
    $(".modalButton").click(function () {
        var pkgId = $(this).val().split("&")[0];
        var pkgName = $(this).val().split("&")[1];

        $('#submit').val(pkgId);
        $('#modalMessage').html("Are you sure you would like to order the " + pkgName + " package?");
        $("#modalConfirm").modal('show');
        document.cookie = "pkgId=" + pkgId;
        document.cookie = "pkgName=" + pkgName;
        
        
    })

    // Creates a cookie with selected trip type
    $('.TripTypeIdRegistered').on('change', function () {
        document.cookie = "tripType=" + this.value;
        document.cookie = "tripTypeFull=" + $("option:selected", this).html();

        // Destroy the trip type and triptype name cookies if no triptype is selected on the indexRegistered page
        if(this.value === "")
        {
            document.cookie = "tripType= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "tripTypeFull= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        }

        //create a cookie for the currently selected triptype value, to be compared against the submitted triptype value on the index registered
        var selectedPackageId = $(this).parent().siblings().last().val().split("&")[0];
        document.cookie = "selectedPackageId=" + selectedPackageId;
    });   

});