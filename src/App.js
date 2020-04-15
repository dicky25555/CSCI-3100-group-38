import React from 'react';

import './App.css';
import Navbar from './components/Navbar'

function App() {
  return (


    <div className="App">
       <Navbar />
      <div className='div1'>
       
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
           <div className='h1text'><h1>Search the service you need</h1></div>
          <div class='searchbox'>
                <div className='searchboxsub'>
                  <h4> Services </h4><input name="searchInput" placeholder="Types of Services"></input>
                  </div>
                  <div className='searchboxsub'>
                  <h4> Location </h4><input name="searchInput" placeholder="Location"></input>      <button>Search</button>
                  </div>
          </div> 
        </div>
      </div>
  );
}

export default App;