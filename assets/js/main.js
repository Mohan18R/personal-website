$(function () {
  "use strict";

  // Cache DOM elements
  const $backToTop = $('.back-to-top');
  const $window = $(window);

  // Smooth scrolling for navigation links
  function smoothScroll(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, {
      duration: 800,
      easing: 'swing',
      complete: function () {
        requestAnimationFrame(smoothScroll);
      }
    });
  }

  $('a.scrollto').on('click', function (e) {
    e.preventDefault();
    const target = $(this).attr('href');
    smoothScroll(target);
  });

  // Back to top button functionality with debouncing scroll events
  let scrollTimeout;
  $window.on('scroll', function () {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      // Back to top button
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
          if (position >= section.offset().top && position <= section.offset().top + section.outerHeight()) {
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
        }
      });
    }, 50); // Adjust the timeout as needed
  });

  $backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'swing');
  });

  // Mobile navigation toggle
  $('.mobile-nav-toggle').on('click', function (e) {
    $('body').toggleClass('mobile-nav-active');
    $(this).toggleClass('bi-list bi-x');
  });

  // Hero type effect initialization
  if ($('.typed').length) {
    new Typed('.typed', {
      strings: $('.typed').data('typed-items').split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  // Skills animation using Waypoint
  if ($('.skills-content').length) {
    new Waypoint({
      element: $('.skills-content')[0],
      offset: '80%',
      handler: function (direction) {
        $('.progress .progress-bar').each(function () {
          $(this).css('width', $(this).attr('aria-valuenow') + '%');
        });
      }
    });
  }

  // Animation on scroll using AOS library
  AOS.init({
    duration: 800, // Reduced for better performance
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Uncomment the visitor counter code if needed, with error handling
  $.getJSON("https://api.counterapi.dev/v1/personal/visits/up", function (response) {
    $("#visits").text(response.count);
  }).fail(function () {
    $("#visits").text("0"); // Default fallback in case of failure
  });

});
