import React from 'react';

import { IoSunnyOutline } from 'react-icons/io5';
import { BiCloudLightRain } from 'react-icons/bi'

function Banner({ weather, isError }) {
  const KelvinToCelciusNum = 273;

  const dateBuilder = (d) => {
    const months = ["Yan", "Fev", "Mart", "Apr", "May", "Iyun", "Iyul", "Aug", "Sent", "Okt", "Noy", "Dek"];
    const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString();
    const hour = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours();
    const minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes();

    return `${hour}:${minutes} ${day}, ${date} ${month} '${year.substring(2,4)}`
  }

  return (
    <div className="banner">
      <a href="/" className="logo">ob-havo</a>
      {
        isError
          ? <p>No data for this location</p>
          : (
            <div className="degree__wrapper">
              <span className="degree">
                {`${Math.round(weather.main.temp) - KelvinToCelciusNum}°`}
              </span>
              <div className="degree__details">
                <span className="degree__city">{weather.name}</span>
                <span className="degree__date">{dateBuilder(new Date())}</span>
              </div>
              <div className="degree__icon">
                <span>
                  {weather.weather[0].main === 'Clouds'
                    ? <BiCloudLightRain fontSize={60} />
                    : <IoSunnyOutline fontSize={60} />}
                </span>
                <span className="degree__status">{
                  weather.weather[0].main === 'Clouds'
                  ? 'Bulutli'
                  : 'Quyoshli'
                }</span>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default Banner;
