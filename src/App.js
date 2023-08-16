import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTwitter } from "react-icons/fa";

import "./styles.css";

export default function QuoteMachine() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/quotes/random");
      const quoteObj = await response.json();
      setQuote(quoteObj[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);
  const getTweetLink = () => {
    return (
      "https://twitter.com/intent/tweet?text=" +
      `"${quote.content}" ` +
      quote.author
    );
  };
  return (
    <div className="App">
      {!loading && (
        <div id="quote-box">
          <div className="top">
            <div className="quote-text">
              <span id="text">{quote.content}</span>
            </div>
            <div className="quote-author">
              <span id="author">- {quote.author}</span>
            </div>
          </div>
          <div className="bottom">
            <Button id="tweet-quote" href={getTweetLink()} target="_blank">
              <FaTwitter />
            </Button>
            <Button variant="primary" id="new-quote" onClick={getQuote}>
              New Quote
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
