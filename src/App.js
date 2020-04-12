import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';

function App() {
  return (
    <div>
        <Navbar />
        <div className='div1'>
            <li>
            </li>
            <div className='h1text'><h1>Search the service you need</h1></div>
                <div class='searchbox'>
                    <div className='searchboxsub'>
                        <h4> Services </h4><input className='searchboxinput' name="searchInput" placeholder=" Types of Services"></input>
                    </div>
                    <div className='searchboxsub'>
                        <h4> Location </h4><input className='searchboxinput' name="searchInput" placeholder=" Location"></input>    <button className="searchboxbutton">Search</button>
                        <br></br>
                    </div>
            </div> 
        </div>
        <div className='div2'>
            <div className = 'h2text'>
                <br></br>
                <h2>Ranking</h2>
                <div class="tab">
                    <button>Category 1</button>
                    <button>Category 2</button>
                    <button>Category 3</button>
                </div>
            </div>
        </div>
        <div className='div3'>
            <div className = 'h3text'>
                <h3>We serve to make sure you get the service you need, in</h3>
                <h3>the most convenient way possible</h3>
            </div>
        </div>
    </div>
    
  );
}

export default App;