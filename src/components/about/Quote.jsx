import "./Quote.css";
import quoteLeft from '@/assets/left_quote.svg';
import quoteRight from '@/assets/right_quote.svg';

export default function Quote() {
    return (
        <div className="quote-container">
            <h1 className="quote-text">
                <img src={quoteLeft} alt="left" className="quote-left" />
                The purpose of Living Grace Ministry <br />
                is to nurture <span className="highlight-text">genuine</span> Christian <br />
                discipleship through <i>grace</i>.
                <img src={quoteRight} alt="left" className="quote-right" />
            </h1>
            <hr className="quote-line"/>
        </div>
    )
}