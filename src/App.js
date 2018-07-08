import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

//Importing the components
import Navbar from './components/Navbar';
import Switch from './Switch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
