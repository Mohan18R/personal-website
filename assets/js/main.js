// Wait for document ready
$(document).ready(function() {
  "use strict";

  // Cache DOM elements
  const $body = $('body');
  const $backToTop = $('.back-to-top');
  const $window = $(window);
  const $navLinks = $('.nav-link.scrollto');
  const $mobileNavToggle = $('.mobile-nav-toggle');

  // NAVIGATION - Handle click on nav links
  $navLinks.on('click', function(e) {
    e.preventDefault();
    
    // Get the target section
    const target = $(this).attr('href');
    const $targetElement = $(target);
    
    if ($targetElement.length) {
      // Close mobile nav if open
      $body.removeClass('mobile-nav-active');
      $('.mobile-nav-toggle').removeClass('bi-x').addClass('bi-list');
      
      // Smooth scroll to section
      const offset = $targetElement.offset().top - 30;
      $('html, body').animate({
        scrollTop: offset
      }, 500, 'swing');
      
      // Update active state
      $navLinks.removeClass('active');
      $(this).addClass('active');
    }
    
    return false;
  });

  // BACK TO TOP - Handle click on back-to-top button
  $backToTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 500, 'swing');
    return false;
  });

  // MOBILE NAV - Toggle mobile navigation
  $mobileNavToggle.on('click', function() {
    $body.toggleClass('mobile-nav-active');
    $(this).toggleClass('bi-list bi-x');
  });

  // SCROLL HANDLER - Update UI based on scroll position
  function handleScroll() {
    const scrollPos = $window.scrollTop();
    
    // Show or hide back-to-top button
    if (scrollPos > 100) {
      $backToTop.addClass('active');
    } else {
      $backToTop.removeClass('active');
    }
    
    // Update active nav link based on scroll position
    $navLinks.each(function() {
      const section = $($(this).attr('href'));
      if (section.length) {
        const sectionTop = section.offset().top - 100;
        const sectionBottom = sectionTop + section.outerHeight();
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          $navLinks.removeClass('active');
          $(this).addClass('active');
        }
      }
    });
  }

  // Attach scroll handler with throttling
  $window.on('scroll', function() {
    handleScroll();
  });

  // PROFILE VIEWS - Simple counter that works when deployed
  function updateProfileViews() {
    // Always try to use the real counter API
    $.ajax({
      url: "https://api.counterapi.dev/v1/personal/visits/up",
      method: "GET",
      dataType: "json",
      cache: false,
      success: function(response) {
        if (response && response.count !== undefined) {
          $("#visits").text(response.count);
        }
      },
      error: function() {
        // Keep showing "Loading..." if there's an error
        // This will be replaced once deployed to production
      }
    });
  }

  // ABOUT TABS - Handle tab switching
  $('.tab-btn').on('click', function() {
    const tabId = $(this).attr('data-tab');
    if ($('#' + tabId).length) {
      $('.tab-btn').removeClass('active');
      $('.tab-content').removeClass('active');
      $(this).addClass('active');
      $('#' + tabId).addClass('active');
    }
  });

  // TYPING EFFECT - Initialize 
  const $typed = $('.typed');
  if ($typed.length) {
    new Typed('.typed', {
      strings: $typed.data('typed-items').split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // AOS - Initialize animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // CONTACT FORM - Handle submission
  $("#contact-form").on("submit", function(e) {
    e.preventDefault();
    
    $.ajax({
      url: "https://formspree.io/f/mblgawnw",
      method: "POST",
      data: $(this).serialize(),
      dataType: "json"
    })
    .done(function() {
      alert("Message sent successfully! ✅");
      $("#contact-form")[0].reset();
    })
    .fail(function() {
      alert("Failed to send message. Please try again later.");
    });
  });

  // Initialize on page load
  handleScroll();
  updateProfileViews();
});
