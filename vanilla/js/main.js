(function() {
  const apiURL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
  const newQuoteBtn = document.getElementById('newQuoteBtn');
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
    const req = new XMLHttpRequest();
    let response = '';

    req.open(type, url, true);

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {

        callback(req.responseText);

      }
    }
    req.send(null);
  };

  const setNewQuote = data => {
    const json = JSON.parse(data);
    const newQuote = decodeHtmlEntity(removeHTMLTags(json[0].content.trim()))
    const newAuthor = json[0].title.trim();

    document.querySelector('.quote p').innerHTML = newQuote;
    document.querySelector('.citation span').innerHTML = newAuthor;

    changeTweet(newQuote, newAuthor);
  }

  newQuoteBtn.addEventListener('click', function () {

    makeRequest('GET', apiURL, setNewQuote);

  }, false);

  // run for the first time
  makeRequest('GET', apiURL, setNewQuote);

})();
