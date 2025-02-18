// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

export default class App extends Component {

  apikey=process.env.REACT_APP_NEWS_API;

  state={
    progress:0,
  };
  
  setProgress=(progress)=>{
    this.setState({
      progress:progress,
    })
  }
  render() {
    return (<>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />

      <h1 className='container' style={{textAlign:'center' , marginTop:'65px'}}>Welcome to NewsDamoh</h1>
      
      <Routes>
          

          <Route exact path="/" element={<News setProgress={this.setProgress} key={'general'} apikey={this.apikey} pageSize={8} country={'in'} category={'general'}/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key={'business'} apikey={this.apikey} pageSize={8} country={'in'} category={'business'}/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key={'entertainment'} apikey={this.apikey} pageSize={8} country={'in'} category={'entertainment'}/>} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} key={'general'} apikey={this.apikey} pageSize={8} country={'in'} category={'general'}/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key={'health'} apikey={this.apikey} pageSize={8} country={'in'} category={'health'}/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key={'science'} apikey={this.apikey} pageSize={8} country={'in'} category={'science'}/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key={'sports'} apikey={this.apikey} pageSize={8} country={'in'} category={'sports'}/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key={'technology'} apikey={this.apikey} pageSize={8} country={'in'} category={'technology'}/>} />
    </Routes>

    </Router>
    </>
    )
  }
}
