(function() {
  const apiURL = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1';
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
    req.setRequestHeader('X-Mashape-Key', 'xqkRpA3gtDmsh7egtMLVWVy8Be1rp1BD4ysjsnbWaFxel0ZOPw');

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {

        callback(req.responseText);

      }
    }
    req.send(null);
  };

  const setNewQuote = data => {
    const json = JSON.parse(data);
    const newQuote = json.quote;
    const newAuthor = json.author;

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
