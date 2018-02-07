// this would go to another file, tested and imported
const updateURL = (q, a) => {
  console.log('running updateURL', twitterURL + encodeURIComponent('"' + q.trim() + '" ' + a));
  return twitterURL + encodeURIComponent('"' + q.trim() + '" ' + a);
}

const apiURL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp,javascript&text=';
const initialQuote = 'I contend that we are both atheists. I just believe in one fewer god than you do. When you understand why you dismiss all the other possible gods, you will understand why I dismiss yours.';
const initialAuthor = 'Stephen Roberts';
const initialURL = updateURL(initialQuote, initialAuthor);

// this would go to another file, tested and imported
const decodeHtmlEntity = str => {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

// this would go to another file, tested and imported
const removeHTMLTags = str => str.replace(/<\/?[^>]+>/gi, '');

// this would go to another file, tested and imported
const makeRequest = url => axios({
  url,
  method: 'get'
});

Vue.component('app-footer', {
  template: '<footer class="mainFooter">by <a href="http://gledsleymuller.com" target="_blank">Gledsley Müller</a></footer>',
});

Vue.component('the-quote', {
  props: ['quote', 'author', 'share'],
  template: `<blockquote class="quote">
    <p>{{quote}}</p>
    <footer>
      <div class="citation"><cite>– {{author}}</cite></div>
      <div class="share">
        <a class="btn" :href="share" target="_blank"><svg width="12" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.191 15.8H5.058l-.087-.006c-2.81-.255-4.69-2.368-4.673-5.242V2.658C.298 1.63 1.128.8 2.156.8c1.027 0 1.857.83 1.857 1.858v2.74l5.393.052a1.856 1.856 0 0 1 1.84 1.875 1.86 1.86 0 0 1-1.857 1.84H9.37l-5.358-.052v1.445c-.006 1.318.819 1.486 1.22 1.527H9.19c1.028 0 1.858.83 1.858 1.857 0 1.028-.83 1.858-1.858 1.858z" fill="#FFF" fill-rule="nonzero"/></svg></a>
      </div>
    </footer>
  </blockquote>`
});

Vue.component('new-quote-button', {
  template: `<button class="generate btn" @click="onNewQuoteRequest">New quote</button>`,
  methods: {
    onNewQuoteRequest() {
      this.$emit('new-quote-requested');
    }
  }
});

new Vue({
  el: '#root',
  data: {
    author: initialAuthor,
    quote: initialQuote,
    share: initialURL,
  },
  methods: {
    onNewQuoteRequest() {
      var self = this;
      // request new quote
      makeRequest(apiURL)
        .then(response => {
          const newQuote = decodeHtmlEntity(removeHTMLTags(response.data[0].content.trim()));
          const newAuthor = response.data[0].title.trim();
          const newURL = updateURL(newQuote, newAuthor);

          self.quote = newQuote;
          self.author = newAuthor;
          self.share = updateURL(newQuote, newAuthor);
        })
        .catch(function (error) {
          console.error(error);
        });

    }
  }
});
