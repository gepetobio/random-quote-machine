(function($){
  'use strict';

  function getQuote() {
    $.getJSON('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=', function(data) {
      $('blockquote').html(data[0].content + '<p>— ' + data[0].title + '</p>');
    });
  }

  getQuote();

  $('.js-new-quote').on('click', function() {
    getQuote();
  });
}(jQuery));
