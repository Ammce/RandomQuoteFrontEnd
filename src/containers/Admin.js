import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.deleteQuote = this.deleteQuote.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem('adminData')) {
            this.props.history.push('/admin/login');
        }
    }

    componentDidMount() {
        this.handleReload();
    }

    async handleReload() {
        try {
            const token = localStorage.getItem('adminData');
            const url = 'http://localhost:3001/admin'
            const data = await axios.get(url, { headers: { 'Authorization': `Token ${token}` } });
            if (data.status == 200) {
                this.setState({
                    quotes: data.data
                });
            }
            else {
                localStorage.clear();
                this.props.history.push('/admin/login');
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async deleteQuote(e, quote) {
        e.preventDefault();
        let quoteID = quote._id;
        let url = 'http://localhost:3001/admin/delete/' + quoteID;
        const token = localStorage.getItem('adminData');
        try {
            const deleted = await axios.delete(url, { headers: { 'Authorization': `Token ${token}` } });
            this.handleReload();
        }
        catch (e) {
            console.log(e);
        }
    }



    render() {

        let quotes = <p>Loading quotes...</p>
        if (this.state.quotes) {
            quotes = <div>
                <table>
                    <thead>
                        <tr>
                            <th>Quote</th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.quotes.data.map(quote => {
                            return (
                                <tr key={quote._id}>
                                    <td>{quote.quote.slice(0, 60)}...</td>
                                    <td>{quote.user}</td>
                                    <td>{quote.comment}</td>
                                    <td><button onClick={(e) => this.deleteQuote(e, quote)} className="waves-effect waves-light btn">Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        }
        return (
            <div>
                {quotes}
            </div>
        );
    }
}
export default Admin;