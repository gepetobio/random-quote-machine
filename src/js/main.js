(function($){
  'use strict';

  function getQuote() {
    $.getJSON('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=', function(data) {
      $('blockquote').html(data[0].content + '<p>— ' + data[0].title + '</p>');
      $('.js-tweet-btn').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(data[0].content));
    });
  }

  getQuote();

  $('.js-new-quote').on('click', function() {
    getQuote();
  });
}(jQuery));
