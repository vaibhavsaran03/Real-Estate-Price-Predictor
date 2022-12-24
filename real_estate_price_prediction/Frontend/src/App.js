import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Form from './components/Form';
import './App.css'



export class App extends Component {

  render() {
    return (
      <div className='App'>
        <Navbar icon='fa fa-anchor' title='Real Estate Predictor'/>
        <div className='container'>
          <Form title='Please enter the following details:' result=''/>
        </div> 
      </div>
    )
  }
}

export default App
