import React, { Component } from 'react';
import axios from 'axios';
import SkyLight from 'react-skylight';

//Importing components
import GenerateButton from '../components/GenerateButton';
import RandomQuote from './RandomQuote';
import Slider from './Slider';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingQuotes: false,
            displayButton: true,
            displayQuote: false,
        }
        this.handleGenerate = this.handleGenerate.bind(this);
        this.getData = this.getData.bind(this);
        this.resetOutlook = this.resetOutlook.bind(this);
    }


    resetOutlook() {
        this.setState({
            loadingQuotes: false,
            displayButton: true,
            displayQuote: false,
        });
        this.simpleDialog.show();
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const data = await axios.get('http://localhost:3001/api/quotes');
        this.setState({
            allQuotes: data.data
        });
    }

    async handleGenerate(e) {
        e.preventDefault();
        let data = await axios.get('https://talaikis.com/api/quotes/random/');
        this.setState({
            randomQuote: data.data,
            displayButton: false,
            displayQuote: true
        });
    }

    render() {
        let button = <GenerateButton clickIT={this.handleGenerate} />;
        let randomQuote = <RandomQuote quote={this.state.randomQuote} getData={this.getData} resetEverything={this.resetOutlook} />;
        if (this.state.displayQuote === false) {
            randomQuote = null;
        }
        if (this.state.displayButton === false) {
            button = null;
        }
        return (
            <div>
                {button}
                {randomQuote}
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Congrats!">
                    Your opinion about this quote has been saved and it will be visible to all visitors of website. Thank you for cooperation.
</SkyLight>
                <Slider quotes={this.state.allQuotes} />
            </div>
        );
    }
}

export default Home;