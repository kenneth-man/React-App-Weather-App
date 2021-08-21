import React from 'react';

const ForecastComp = ({ dateTime, icon, temp}) => {
    return (
        <div className='forecastComp col translucentBack round'>
            <h3>{dateTime}</h3>

            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather-icon'/>

            <h3>{temp}</h3>
        </div>
    )
}

export default ForecastComp;