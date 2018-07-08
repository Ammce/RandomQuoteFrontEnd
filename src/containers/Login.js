import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('adminData')) {
            this.props.history.push('/');
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }

    async handleForm(e) {
        e.preventDefault();
        let url = 'http://localhost:3001/admin/login'
        let data = this.state;
        const response = await axios.post(url, data);
        localStorage.setItem('adminData', response.data);
        this.props.history.push('/admin');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleForm}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input name='email' onChange={this.handleChange} id="first_name2" type="text" className="autocomplete" />
                            <label className="active" htmlFor="first_name2">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input name='password' onChange={this.handleChange} id="first_name1" type="text" className="autocomplete" />
                            <label className="active" htmlFor="first_name1">First Name</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Submit
    <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default Login