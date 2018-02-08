(function ($) {

  // const apiURL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
  const apiURL = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1';
  const $newQuoteBtn = $('#newQuoteBtn');
  const twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp,javascript&text=';

  const decodeHtmlEntity = str => {
    return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  };

  const removeHTMLTags = str => str.replace(/<\/?[^>]+>/gi, '');

  const changeTweet = (quote, author) => {
    document.querySelector('.share .btn').href = twitterURL + encodeURIComponent('"' + quote.trim() + '" ' + author);
  };

  const makeRequest = (type, url, callback) => {
    $.ajax({
      url,
      method: type,
      headers: {
        'X-Mashape-Key': 'xqkRpA3gtDmsh7egtMLVWVy8Be1rp1BD4ysjsnbWaFxel0ZOPw'
      }
    }).then(function(data) {
      callback(data);
    });
  };

  const setNewQuote = data => {
    const json = data;
    const newQuote = json.quote;
    const newAuthor = json.author;

    $('.quote p').text(newQuote);
    $('.citation span').text(newAuthor);

    changeTweet(newQuote, newAuthor);
  }

  $newQuoteBtn.on('click', function() {
    makeRequest('GET', apiURL, setNewQuote);
  });

  makeRequest('GET', apiURL, setNewQuote);
}(jQuery));
