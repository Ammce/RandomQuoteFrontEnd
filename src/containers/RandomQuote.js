import React, { Component, Fragment } from 'react';
import axios from 'axios';

//Importing CSS
import './RandomQuote.css';

class RandomQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            comment: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetEverything = this.resetEverything.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    async handleSubmit(e) {
        e.preventDefault();
        let data = {
            author: this.props.quote.author,
            quote: this.props.quote.quote,
            user: this.state.user,
            comment: this.state.comment
        }
        const url = 'http://localhost:3001/api/quotes'
        const respMsg = await axios.post(url, data);
        if (respMsg) {
            this.props.getData();
            this.props.resetEverything();
            this.resetEverything();
        }

    }

    resetEverything() {
        this.setState({
            user: '',
            comment: ''
        });
    }

    render() {
        if (!this.props.quote) {
            return (
                <div></div>
            );
        }
        else {
            return (
                <Fragment>
                    <div className="row">
                        <div className="col s12 m3"></div>
                        <div className="col s12 m6">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">{this.props.quote.author}</span>
                                    <p>{this.props.quote.quote}</p>
                                </div>
                                <hr />
                                <div className="myForm">
                                    <form>
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input name='user' onChange={this.handleChange} value={this.state.user} id="first_name2" type="text" className="validate" />
                                                <label className="active" htmlFor="first_name2">First Name</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea name='comment' onChange={this.handleChange} value={this.state.comment} id="textarea1" className="materialize-textarea"></textarea>
                                                <label htmlFor="textarea1">Your analysis about quote</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-action">
                                    <a href="#" onClick={this.handleSubmit}>Publish</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            );
        }
    }
}
export default RandomQuote;