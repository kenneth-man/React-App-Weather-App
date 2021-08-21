import React, { useContext } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
import loadingVid from '../Res/Loading.mp4';
import spinner from '../Res/spinner.gif';
import arrowIconLeft from '../Res/chevron-left.svg';
import arrowIconRight from '../Res/chevron-right.svg';

const WeatherMap = () => {
    const { weatherMapDataShown, setWeatherMapSelection, weatherMapSelection, weatherMapOptions } = useContext(Context);

    const weatherMapBtnOnClick = (eventObj) => {
        setWeatherMapSelection(eventObj.textContent.replace(' ', '_'));
    }

    return (
        <div className='weatherMap screen center'>
            {
                weatherMapDataShown.length === 256 ?
                <div className='weatherMap__grid'>
                    <Link to='/WeatherGraph' exact='true' className='link-left center'>
                        <img src={arrowIconLeft} alt='arrow-icon-left' className='transition'/>
                    </Link>

                    <Link to='/AirPollution' exact='true' className='link-right center'>
                        <img src={arrowIconRight} alt='arrow-icon-right' className='transition'/>
                    </Link>

                    <div className='weatherMap__btns row'>
                        {
                            weatherMapOptions.map((curr, index) => 
                                <button key={index} onClick={e => weatherMapBtnOnClick(e.target)} 
                                    className={weatherMapSelection === curr ? 'weatherMap__btn weatherMap__btn--active' : 'weatherMap__btn'}>{curr.replace('_', ' ')}</button>
                            )
                        }
                    </div>

                    {
                        weatherMapDataShown.map((curr, index) => 
                            <img src={curr} alt='weatherMap-tile' key={index}/>
                        )
                    }
                </div> :
                <div className='weatherMap__inner col'>
                    <Link to='/WeatherGraph' exact='true' className='link-left center'>
                        <img src={arrowIconLeft} alt='arrow-icon-left' className='transition'/>
                    </Link>

                    <Link to='/AirPollution' exact='true' className='link-right center'>
                        <img src={arrowIconRight} alt='arrow-icon-right' className='transition'/>
                    </Link>

                    <video className='weatherMap__background' loop={true} muted={true} autoPlay={true} src={loadingVid}/>

                    <img src={spinner} alt='spinner' className='spinner'/>

                    <h1>Fetching Weather Map Data....</h1>
                </div>
            }
        </div>
    )
}

export default WeatherMap;