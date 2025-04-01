$(function () {
  "use strict";

  // Cache DOM elements once
  const $body = $('body');
  const $backToTop = $('.back-to-top');
  const $window = $(window);
  const $navbar = $('#navbar');
  const $mobileNavToggle = $('.mobile-nav-toggle');
  const $heroSection = $('#hero');

  // Initialize critical UI elements immediately
  function initializeCriticalUI() {
    // Mobile navigation
    $mobileNavToggle.on('click', function() {
      $body.toggleClass('mobile-nav-active');
      $(this).toggleClass('bi-list bi-x');
    });

    // Smooth scroll
    function smoothScroll(target) {
      if ($(target).length) {
        const offset = $(target).offset().top - 30;
        $('html, body').animate({
          scrollTop: offset
        }, 400, 'swing');
      }
    }

    // Navigation click handler
    $('.nav-link.scrollto').on('click', function(e) {
      e.preventDefault();
      const target = $(this).attr('href');
      
      if ($(target).length) {
        $body.removeClass('mobile-nav-active');
        $mobileNavToggle.toggleClass('bi-list bi-x');
        smoothScroll(target);
      }
    });

    // Back to top button
    $backToTop.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 400, 'swing');
    });
  }

  // Initialize non-critical features after page load
  function initializeNonCritical() {
    // Typed.js initialization (only if element exists)
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

    // Initialize AOS with optimized settings
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    // About section tabs
    $('.tab-btn').on('click', function() {
      const tabId = $(this).attr('data-tab');
      if ($('#' + tabId).length) {
        $('.tab-btn').removeClass('active');
        $('.tab-content').removeClass('active');
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
      }
    });

    // Lazy load visitor counter
    $.getJSON("https://api.counterapi.dev/v1/personal/visits/up")
      .done(function(response) {
        $("#visits").text(response.count);
      })
      .fail(function() {
        $("#visits").text("0");
      });

    // Contact Form Submission
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
  }

  // Optimized scroll handler using requestAnimationFrame
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        const scrollPos = $window.scrollTop();
        
        // Update back to top button visibility
        $backToTop.toggleClass('active', scrollPos > 100);
        
        // Update navbar active state
        $('.nav-link.scrollto').each(function() {
          const section = $($(this).attr('href'));
          if (section.length) {
            const sectionTop = section.offset().top - 100;
            const sectionBottom = sectionTop + section.outerHeight();
            $(this).toggleClass('active', scrollPos >= sectionTop && scrollPos < sectionBottom);
          }
        });
        
        ticking = false;
      });
      ticking = true;
    }
  }

  // Attach scroll handler with throttling
  $window.on('scroll', handleScroll);

  // Initialize critical UI immediately
  initializeCriticalUI();

  // Initialize non-critical features after window load
  $window.on('load', function() {
    // Remove any loading states
    $body.removeClass('loading');
    
    // Initialize non-critical features
    initializeNonCritical();
  });
});
