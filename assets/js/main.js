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

  // PROFILE VIEWS - Using CounterAPI.dev for reliable counting
  function updateProfileViews() {
    // Show loading state
    $('#visits').text('Loading...');
    $('.profile-views-section').show();

    // CounterAPI.dev implementation - Try multiple approaches
    const workspaceId = '753';
    const counterSlug = 'visits';
    
    // Try the public API first (no authentication required)
    $.ajax({
      url: `https://api.counterapi.dev/hit/${workspaceId}/${counterSlug}`,
      method: 'GET',
      dataType: 'json',
      cache: false,
      timeout: 10000
    })
    .done(function (response) {
      if (response && response.data !== undefined) {
        $('#visits').text(response.data);
        
        // Add animation effect
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
        
        console.log('Profile views updated successfully:', response.data);
      } else {
        $('#visits').text('Error');
      }
    })
    .fail(function (xhr, status, error) {
      console.log('Public API failed:', error);
      
      // Try v2 API with POST
      $.ajax({
        url: `https://api.counterapi.dev/v2/workspaces/${workspaceId}/${counterSlug}/hit`,
        method: 'POST',
        dataType: 'json',
        cache: false,
        timeout: 10000
      })
      .done(function (response) {
        if (response && response.data !== undefined) {
          $('#visits').text(response.data);
        } else {
          $('#visits').text('Counter unavailable');
        }
      })
      .fail(function () {
        // Final fallback - hide the counter section
        $('.profile-views-section').hide();
        console.log('All CounterAPI attempts failed');
      });
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
