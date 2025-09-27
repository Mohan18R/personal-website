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

  // PROFILE VIEWS - Global counter across all devices
  function updateProfileViews() {
    // Show loading state immediately
    $('#visits').text('Loading...');
    $('.profile-views-section').show();

    // Use a reliable global counter API
    const counterUrl = 'https://api.countapi.xyz/hit/mohan-portfolio-global/visits';
    const getUrl = 'https://api.countapi.xyz/get/mohan-portfolio-global/visits';

    // Try the counter API
    tryCountAPI();

    function tryCountAPI() {
      $.ajax({
        url: counterUrl,
        method: 'GET',
        dataType: 'json',
        cache: false,
        timeout: 8000
      })
      .done(function (response) {
        if (response && response.value !== undefined) {
          $('#visits').text(response.value);
          
          // Add a nice animation effect
          $('#visits').css({
            'color': '#149ddd',
            'font-weight': 'bold',
            'transition': 'all 0.3s ease'
          });
          
          setTimeout(function() {
            $('#visits').css({
              'color': '',
              'font-weight': '',
              'transition': ''
            });
          }, 1500);
          
          console.log('Profile views updated successfully:', response.value);
        } else {
          $('#visits').text('Error');
        }
      })
      .fail(function (xhr, status, error) {
        console.log('Counter API failed:', error);
        
        // Try to get current count without incrementing
        $.ajax({
          url: getUrl,
          method: 'GET',
          dataType: 'json',
          cache: false,
          timeout: 5000
        })
        .done(function (response) {
          if (response && response.value !== undefined) {
            $('#visits').text(response.value + ' (read-only)');
          } else {
            showFallbackMessage();
          }
        })
        .fail(function () {
          showFallbackMessage();
        });
      });
    }

    function showFallbackMessage() {
      $('#visits').text('Counter unavailable');
      $('.profile-views-section h1').html(
        'Profile Views: <span style="color: #999; font-size: 0.8em;">Counter temporarily unavailable</span>'
      );
      console.log('All counter APIs failed - showing fallback message');
    }
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
