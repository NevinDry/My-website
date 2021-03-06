/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });


});


/*----------------------------------------------------*/
/*	Translate
------------------------------------------------------*/

function TransMod(){
	this.translate = function(lang, token) {
		return library[lang][token];
	}
	
	var library = new Array();
	
    // EN
	library["en"] = new Array();
	library["en"]["translatable.menuHome"] = "Home";
	library["en"]["translatable.menuResume"] = "Resume";
	library["en"]["translatable.menuWorks"] = "Works";
	library["en"]["translatable.menuContact"] = "Contact";
	library["en"]["translatable.menuAbout"] = "About";
	library["en"]["translatable.objectif"] = "I am looking to be part of development team to share my experience, bring my skills, improve them and enrich my knowledge.";
	library["en"]["translatable.aboutTtitle"] = "About";
	library["en"]["translatable.aboutText"] = "After 3 years of part-time training in software development, I obtained my Master degree in computer science in France at the engineering school EPSI Bordeaux. After that I decided to go working in a foreign country where I could discover new technologies and new ways of work. I decided to go to Australia where I have been part of many projects at 1ICT, a cutting edge IT company based in Brisbane where I enriched my technical skills and my communication abilities. During my 6 years work experiences I have been able to bring my skills and enrich my knowledge on different companies and projects, from the multinationnal like Pernod-Ricard or Dominos Pizza where I worked on many scaling softwares, to some smaller dynamic companies like Solicis or 1ICT where I join full-stack development teams. I learned and worked on many tecnhologies like native mobile, frontend and backend framework using many langages or even unusual and challenging technologies like Google Glass and Beacons. <br> Coming back to Europe after this amazing experience, I am looking for a dynamic development team where I can bring my skills and enrich my knowledge.";
	
    // FR
	library["fr"] = new Array();
	library["fr"]["translatable.menuHome"] = "Acceuil";
	library["fr"]["translatable.menuResume"] = "CV";
	library["fr"]["translatable.menuWorks"] = "Projets";
	library["fr"]["translatable.menuContact"] = "Contact";
	library["fr"]["translatable.menuAbout"] = "A propos";
	library["fr"]["translatable.objectif"] = "Je recherche une équipe de dévelopement pour partager mon expérience, apporter mes compétences, les améliorer et enrichir mes conaissances";
	library["fr"]["translatable.aboutTtitle"] = "Mon histoire";
	library["fr"]["translatable.aboutText"] = "";

	
}

( function(){
	
	function InitStaticText(lang){
		var langModule = new TransMod();
		$("#menuHome").html(langModule.translate(lang, $("#menuHome").attr("data-token")));
      $("#menuResume").html(langModule.translate(lang, $("#menuResume").attr("data-token")));
		$("#menuContact").html(langModule.translate(lang, $("#menuContact").attr("data-token")));
		$("#menuWorks").html(langModule.translate(lang, $("#menuWorks").attr("data-token")));
		$("#menuAbout").html(langModule.translate(lang, $("#menuAbout").attr("data-token")));
		$("#objectif").html(langModule.translate(lang, $("#objectif").attr("data-token")));
		$("#aboutTtitle").html(langModule.translate(lang, $("#aboutTtitle").attr("data-token")));
		$("#aboutText").html(langModule.translate(lang, $("#aboutText").attr("data-token")));

	}	
	
	InitStaticText("en");

	$("#frButton").click(function(){ 
		InitStaticText("fr");
	});
	$("#enButton").click(function(){ 
		InitStaticText("en");
	});
	
})();






