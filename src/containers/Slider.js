import React, { Component, Fragment } from 'react';
import axios from 'axios';

//Importing CSS file for the component
import './Slider.css';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            quotesPerPage: 5
        };
        this.handleRate = this.handleRate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleRate(e, quote) {
        try {
            const data = await axios.put('http://localhost:3001/api/quotestar', { quoteID: quote._id });
            if (data) {
                window.location.reload()
            }
        }
        catch (e) {
            console.log(e);
        }

    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        if (!this.props.quotes) {
            return (
                <div>Loading quotes...</div>
            );
        }
        else {
            const quotesArray = this.props.quotes.quote;
            const currentPage = this.state.currentPage;
            const quotesPerPage = this.state.quotesPerPage;

            // Logic for displaying current todos
            const indexOfLastQuote = currentPage * quotesPerPage;
            const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
            const currentQuotes = quotesArray.slice(indexOfFirstQuote, indexOfLastQuote);

            const renderQuotes = currentQuotes.map((quote, i) => {
                return (
                    <li key={i} className="collection-item avatar">
                        <div className="row">
                            <div className="col m2">
                                <img src="https://www.freeiconspng.com/uploads/quotation-icon-8.png" alt="" className="circle" />
                            </div>
                            <div className="col m8">
                                <span className="title">Author of Quote: {quote.author}</span>
                                <p>Quote: {quote.quote}<br />
                                    User: {quote.user} <br />
                                    Analysis: {quote.comment} <br />
                                </p>
                            </div>
                            <div className="col m2">
                                <p onClick={(e) => this.handleRate(e, quote)} className="upwote secondary-content"><i className="material-icons">grade</i>{quote.star}</p>
                            </div>
                        </div>



                    </li>
                );
            })

            //Rendering Pagination
            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(quotesArray.length / quotesPerPage); i++) {
                pageNumbers.push(i);
            }

            const renderPageNumbers = pageNumbers.map(number => {
                return (
                    <li
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                        className="myPagionationLI"

                    >
                        {number}
                    </li>
                );
            });

            return (
                <Fragment>
                    <div>
                        <ul className="collection">
                            {renderQuotes}
                        </ul>
                    </div>
                    <div className="centerIT">
                        <div className="paginationCont">
                            <ul className="myPagination">
                                <li className="myPagionationLI"><i className="material-icons">chevron_left</i></li>
                                {renderPageNumbers}
                                <li className="myPagionationLI"><i className="material-icons">chevron_right</i></li>
                            </ul>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

export default Slider;