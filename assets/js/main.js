$(function () {
  "use strict";

  // Cache DOM elements
  const $backToTop = $('.back-to-top');
  const $window = $(window);

  function smoothScroll(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800, 'swing');
  }

  $(document).on('click', 'a.scrollto', function (e) {
    e.preventDefault();
    smoothScroll($(this).attr('href'));
  });

  // Back to top button functionality with efficient scroll handling
  $window.on('scroll', function () {
    requestIdleCallback(() => {
      if ($window.scrollTop() > 100) {
        $backToTop.addClass('active');
      } else {
        $backToTop.removeClass('active');
      }

      // Set active state for navbar links on scroll
      const position = $window.scrollTop() + 200;
      $('#navbar .scrollto').each(function () {
        const section = $(this.hash);
        if (section.length) {
          $(this).toggleClass('active', position >= section.offset().top && position <= section.offset().top + section.outerHeight());
        }
      });
    });
  });

  $backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
  });

  // Mobile navigation toggle
  $('.mobile-nav-toggle').on('click', function () {
    $('body').toggleClass('mobile-nav-active');
    $(this).toggleClass('bi-list bi-x');
  });

  // Hero type effect initialization (only if element exists)
  if ($('.typed').length) {
    setTimeout(() => {
      new Typed('.typed', {
        strings: $('.typed').data('typed-items').split(','),
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }, 100);
  }

  // Skills animation using Waypoint (lazy load for better performance)
  if ($('.skills-content').length) {
    requestIdleCallback(() => {
      new Waypoint({
        element: $('.skills-content')[0],
        offset: '80%',
        handler: function () {
          $('.progress .progress-bar').each(function () {
            $(this).css('width', $(this).attr('aria-valuenow') + '%');
          });
        }
      });
    });
  }

  // Animation on scroll using AOS library (loaded asynchronously)
  setTimeout(() => {
    AOS.init({
      duration: 600, // Reduced for better performance
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, 200);

  // Lazy load visitor counter with error handling
  requestIdleCallback(() => {
    $.getJSON("https://api.counterapi.dev/v1/personal/visits/up", function (response) {
      $("#visits").text(response.count);
    }).fail(function () {
      $("#visits").text("0");
    });
  });

  // Contact Form Submission using Formspree
  $("#contact-form").on("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    $.ajax({
      url: "https://formspree.io/f/mblgawnw", // Corrected Formspree URL
      method: "POST",
      data: $(this).serialize(),
      dataType: "json",
      success: function (response) {
        alert("Message sent successfully! ✅");
        $("#contact-form")[0].reset();
      },
      error: function () {
        alert("Failed to send message. Please try again later.");
      }
    });
  });
});
