$(function () {
  "use strict";

  // Cache DOM elements once
  const $body = $('body');
  const $backToTop = $('.back-to-top');
  const $window = $(window);
  const $navbar = $('#navbar');
  const $mobileNavToggle = $('.mobile-nav-toggle');

  // Initialize UI elements with balanced approach
  function initializeUI() {
    // Mobile navigation
    $mobileNavToggle.on('click', function() {
      $body.toggleClass('mobile-nav-active');
      $(this).toggleClass('bi-list bi-x');
    });

    // Smooth scroll with slightly longer duration for smoother feel
    function smoothScroll(target) {
      if ($(target).length) {
        const offset = $(target).offset().top - 30;
        $('html, body').animate({
          scrollTop: offset
        }, 600, 'easeInOutQuad'); // Smoother easing
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

    // Back to top button with smoother animation
    $backToTop.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 700, 'easeInOutQuad');
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

    // Initialize typing effect with slight delay for smoother start
    const $typed = $('.typed');
    if ($typed.length) {
      setTimeout(function() {
        new Typed('.typed', {
          strings: $typed.data('typed-items').split(','),
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }, 300);
    }

    // Initialize AOS with balanced settings
    setTimeout(function() {
      AOS.init({
        duration: 800,  // Slightly longer for smoother animations
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }, 100);

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

  // Balanced scroll handler with minor throttling
  let scrollTimeout;
  function handleScroll() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        // Update back to top button visibility with smooth transition
        if ($window.scrollTop() > 100) {
          $backToTop.addClass('active');
        } else {
          $backToTop.removeClass('active');
        }
        
        // Update navbar active state
        $('.nav-link.scrollto').each(function() {
          const section = $($(this).attr('href'));
          if (section.length) {
            const sectionTop = section.offset().top - 100;
            const sectionBottom = sectionTop + section.outerHeight();
            $(this).toggleClass('active', $window.scrollTop() >= sectionTop && $window.scrollTop() < sectionBottom);
          }
        });
        
        scrollTimeout = null;
      }, 50); // Small timeout for smoother performance
    }
  }

  // Attach scroll handler
  $window.on('scroll', handleScroll);

  // Visitor counter with slight delay
  setTimeout(function() {
    $.getJSON("https://api.counterapi.dev/v1/personal/visits/up")
      .done(function(response) {
        $("#visits").text(response.count);
      })
      .fail(function() {
        $("#visits").text("0");
      });
  }, 1000);

  // Initialize everything with a small delay to ensure smooth initial load
  setTimeout(function() {
    initializeUI();
    // Trigger initial scroll handler to set correct active states
    handleScroll();
    // Remove any loading states
    $body.removeClass('loading');
  }, 100);
});
