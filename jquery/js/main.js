(function ($) {

  const apiURL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
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
      method: type
    }).then(function(data) {
      console.log(data);
      callback(data);
    });
  };

  const setNewQuote = data => {
    const json = data;
    const newQuote = decodeHtmlEntity(removeHTMLTags(json[0].content.trim()))
    const newAuthor = json[0].title.trim();

    $('.quote p').text(newQuote);
    $('.citation span').text(newAuthor);

    changeTweet(newQuote, newAuthor);
  }

  $newQuoteBtn.on('click', function() {
    makeRequest('GET', apiURL, setNewQuote);
  });

  makeRequest('GET', apiURL, setNewQuote);
}(jQuery));
