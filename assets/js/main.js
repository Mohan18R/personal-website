$(function () {
  "use strict";

  // Smooth scrolling for navigation links
  $('a.scrollto').on('click', function (e) {
    e.preventDefault();
    const target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800, 'swing');
  });

  // Back to top button functionality
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').addClass('active');
    } else {
      $('.back-to-top').removeClass('active');
    }
  });
  $('.back-to-top').on('click', function (e) {
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

  // Website visit counter
  $.getJSON("https://api.counterapi.dev/v1/personal/visits/up", function (response) {
    $("#visits").text(response.count);
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
    $("#visits").text("Error loading count");
  });

  // Animation on scroll using AOS library
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});

// Set active state for navbar links on scroll
$(window).on('scroll', function () {
  const position = $(this).scrollTop() + 200;
  $('#navbar .scrollto').each(function () {
    const section = $(this.hash);
    if (section.length) {
      if (position >= section.offset().top && position <= (section.offset().top + section.outerHeight())) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    }
  });
});