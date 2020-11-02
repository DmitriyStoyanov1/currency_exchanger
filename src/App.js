import React from 'react';
import './App.css';
import Currency from './components/currencies';
import Quantity from './components/quantity';

function App() {
  return (
    <div className="App">
      <div className="exchange-wrapper">

        <div className="headers">
          <p>Украинская гривня</p>
          <h1>28 грн</h1>
        </div>

        <div className="currencies-quantity">
          <Quantity/>
          <Currency/>
          <Quantity/>
          <Currency/>
        </div>

      </div>
      <div className="graphic-wrapper"></div>
    </div>
  );
}

export default App;
