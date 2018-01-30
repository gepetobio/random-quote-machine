const rootElement = document.getElementById('root');
const apiURL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp,javascript&text=';
const initialQuote = 'I contend that we are both atheists. I just believe in one fewer god than you do. When you understand why you dismiss all the other possible gods, you will understand why I dismiss yours.';
const initialAuthor = 'Stephen Roberts';

// this would go to another file, tested and imported
const decodeHtmlEntity = str => {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

// this would go to another file, tested and imported
const removeHTMLTags = str => str.replace(/<\/?[^>]+>/gi, '');

// this would go to another file, tested and imported
const updateURL = (q, a) => {
  return twitterURL + encodeURIComponent('"' + q.trim() + '" ' + a);
}

// this would go to another file, tested and imported
const makeRequest = url => axios({
  url,
  method: 'get'
});

// this would go to another file, tested and imported
const Blockquote = props => (
  <blockquote className="quote">
    {props.children}
    <footer>
      <div className="citation"><cite>– {props.author}</cite></div>
      <div className="share">
        <a className="btn" href={props.shareURL} target="_blank"><svg width="12" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.191 15.8H5.058l-.087-.006c-2.81-.255-4.69-2.368-4.673-5.242V2.658C.298 1.63 1.128.8 2.156.8c1.027 0 1.857.83 1.857 1.858v2.74l5.393.052a1.856 1.856 0 0 1 1.84 1.875 1.86 1.86 0 0 1-1.857 1.84H9.37l-5.358-.052v1.445c-.006 1.318.819 1.486 1.22 1.527H9.19c1.028 0 1.858.83 1.858 1.857 0 1.028-.83 1.858-1.858 1.858z" fill="#FFF" fillRule="nonzero" /></svg></a>
      </div>
    </footer>
  </blockquote>
);

// this would go to another file, tested and imported
const SectionQuotes = props => (
  <section className="sectionQuotes">
    <div className="quoteWrapper">
      <Blockquote author={props.author} shareURL={props.shareURL}><p>{props.quote}</p></Blockquote>
      <footer className="sectionFooter">
        <button className="generate btn" onClick={props.onClick}>New quote</button>
      </footer>
    </div>
  </section>
);
//TODO: implement this
const AutomaticGenerator = props => (
  <div className="automaticGeneration">
    <form>
      <input type="checkbox" id="enable-random" onChange={props.onChange} />
      <label htmlFor="enable-random">Enable automatic generation</label>
    </form>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: initialQuote,
      author: initialAuthor,
      shareURL: updateURL(initialQuote, initialAuthor),
    }
  }

  updateState = (newStateObj) => {
    this.setState(prevState => newStateObj);
  }

  handleClick = () => {
    makeRequest(apiURL)
      .then(response => {
        const newQuote = decodeHtmlEntity(removeHTMLTags(response.data[0].content.trim()));
        const newAuthor = response.data[0].title.trim();

        this.updateState({
          quote: newQuote,
          author: newAuthor,
          shareURL: updateURL(newQuote, newAuthor)
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <SectionQuotes
          quote={this.state.quote}
          author={this.state.author}
          onClick={this.handleClick}
          shareURL={this.state.shareURL}
        />

        <footer className="mainFooter">by <a href="http://gledsleymuller.com" target="_blank">Gledsley Müller</a></footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, rootElement);

