import React, { useState } from 'react';
import uuid from 'react-uuid';

import { FiSearch } from 'react-icons/fi'

function Sidebar({ weather, isError, setQuery }) {
  const regions = ["Andijon", "Buxoro", "Farg'ona", "Jizzax", "Namangan", "Navoiy", "Qashqadaryo", "Nukus", "Samarqand", "Sirdaryo", "Toshkent"];

  // const [regNames, setRegNames] = useState([...regions]);
  const [inputVal, setInputVal] = useState('');
  
  // const filter = (val) => {
  //   if (val !== '') {
  //     setRegNames(regNames.filter(i => i.startsWith(val)));
  //   }
  // }
  
  const search = (event) => {
    if (event.key === 'Enter') {
      setInputVal('');
      setQuery(event.target.value);
    }
  };

  // const handleBackspace = (event) => {
  //   if (event.code === 'Backspace') {
  //     filter(inputVal);
  //   }
  // }

  return (
    <aside className="location">
      <div className="location__wrapper">
        <div>
          <input
            type="text"
            className="location__search-input"
            placeholder="Another location"
            onKeyPress={search}
            // onKeyUp={handleBackspace}
            value={inputVal}
            onChange={(e) => {
                setInputVal(e.target.value);
                // filter(e.target.value);
              }
            }
          />
          <button
            className="location__search-button"
            onClick={() => {
              setQuery(inputVal);
              setInputVal('');
            }}
          >
            <FiSearch fontWeight="light" fontSize={35} />
          </button>
        </div>
        <div>
          <ul className="location__places-list">
            {regions.map(i => 
              <li className="location__places-item" key={uuid()}>
                <button onClick={e => setQuery(e.target.innerText)}>{i}</button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="weather__details">
        <p className="weather__details-title">Weather Details</p>
          {isError
            ? <p className="error-msg">No data for this location</p>
            : (
              <ul className="weather__details-list"> 
                <li className="weather__details-item">
                  <span>Bulutlilik</span>
                  <span className="weather__details-indicator">{weather.clouds.all}%</span>
                </li>
                <li className="weather__details-item">
                  <span>Namlik</span>
                  <span className="weather__details-indicator">{weather.main.humidity}%</span>
                </li>
                <li className="weather__details-item">
                  <span>Shamol</span>
                  <span className="weather__details-indicator">{Math.round(weather.wind.speed)}km/h</span>
                </li>
                <li className="weather__details-item">
                  <span>Yomg'ir</span>
                  <span className="weather__details-indicator">0mm</span>
                </li>
              </ul>
            )
          }
      </div>
    </aside>
  );
}

export default Sidebar;
