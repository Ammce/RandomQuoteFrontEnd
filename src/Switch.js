import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Login from './containers/Login';
import Admin from './containers/Admin';

const Switcher = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
            <Route path="/admin/login" component={Login} />
            <Route path="/admin" component={Admin} />
        </Switch>
    );
}

export default Switcher 