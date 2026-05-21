(function(){
  'use strict';

  function onReady(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function(){

    // Scroll reveal
    var revealEls = document.querySelectorAll('.reveal, .stagger');
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // Sticky header backdrop
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function(){
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Mobile menu toggle
    var toggle = document.querySelector('.nav-toggle');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function(){
        mobileMenu.classList.toggle('open');
      });
      mobileMenu.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ mobileMenu.classList.remove('open'); });
      });
    }

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(function(link){
      var href = link.getAttribute('href');
      if (href.length <= 1) return;
      link.addEventListener('click', function(e){
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerH = header ? header.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // Current year in footer
    document.querySelectorAll('[data-year]').forEach(function(el){
      el.textContent = new Date().getFullYear();
    });

  });
})();
