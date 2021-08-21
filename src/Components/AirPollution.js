import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
import arrowIconLeft from '../Res/chevron-left.svg';
import loadingVid from '../Res/Loading.mp4';
import spinner from '../Res/spinner.gif';

const AirPollution = () => {
    const { airPollutionData, toWeatherMapScreenOnClick, convertUnixToTime, mainData } = useContext(Context);
    const [airPollutionDataKeys, setAirPollutionDataKeys] = useState(undefined);
    const [airPollutionDataValues, setAirPollutionDataValues] = useState(undefined);

    useEffect(() => {
        if(airPollutionData){
            setAirPollutionDataKeys(Object.keys(airPollutionData.list[0].components));
            setAirPollutionDataValues(Object.values(airPollutionData.list[0].components));
        }
    }, [airPollutionData])

    return (
        <div className='airPollution screen center'>
            {
                airPollutionData && airPollutionDataKeys && airPollutionDataValues ? 
                <div className='airPollution__inner col'>
                    <h1>Air Pollution for {mainData.timezone} at {convertUnixToTime(airPollutionData.list[0].dt)}</h1>

                    <div className='airPollution__grid translucentBack round'>
                        {
                            airPollutionDataKeys.map((curr, index) => 
                                <div key={index} className='col'>
                                    <h1>{curr}</h1>
                                    <h2>{airPollutionDataValues[index]}</h2>
                                </div>
                            )
                        }
                    </div>

                    <Link to='/WeatherMap' exact='true' className='link-left center' onClick={toWeatherMapScreenOnClick}>
                        <img src={arrowIconLeft} alt='arrow-icon-left' className='transition'/>
                    </Link>
                </div> :
                <div className='airPollution__inner col'>
                    <Link to='/WeatherMap' exact='true' className='link-left center' onClick={toWeatherMapScreenOnClick}>
                        <img src={arrowIconLeft} alt='arrow-icon-left' className='transition'/>
                    </Link>

                    <video className='airPollution__background' loop={true} muted={true} autoPlay={true} src={loadingVid}/>

                    <img src={spinner} alt='spinner' className='spinner'/>

                    <h1>Fetching Air Pollution Data....</h1>
                </div>
            }
        </div>
    )
}

export default AirPollution;