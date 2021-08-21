import React, { useContext, useState } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar.js';
import ForecastComp from './ForecastComp.js';
import { videoBackgrounds } from '../VideoBackgrounds.js';
import loadingVid from '../Res/Loading.mp4';
import spinner from '../Res/spinner.gif';
import arrowIconRight from '../Res/chevron-right.svg';

const Home = () => {
    const { mainData, currDate, convertUnixToTime, convertTemp, allCountriesData } = useContext(Context);
    const [allCountriesShown, setAllCountriesShown] = useState(false);

    const allCountriesBtnOnClick = () => {
        setAllCountriesShown(!allCountriesShown);
    }

    return (
        <div className='home screen center'>
            {
                mainData ?
                <div className='home__inner col'>
                    <video className='home__background' loop={true} muted={true} autoPlay={true} src={
                        videoBackgrounds.find(curr => curr.weather === mainData.current.weather[0].main).video
                    }/>
    
                    <Searchbar className='searchbar'/>
    
                    <div className='col'>
                        <h1>{mainData.timezone}</h1>
        
                        <h2>{currDate}</h2>
                    </div> 

                    <div className='row' style={{width: '70%', height:'15%'}}>
                        <div className='row'>   
                            <img src={`http://openweathermap.org/img/wn/${mainData.current.weather[0].icon}@2x.png`} alt='weather-icon'/>

                            <div className='col'>
                                <h1 style={{fontWeight: '300'}}>{convertTemp(mainData.current.temp)}</h1>

                                <h2>{mainData.current.weather[0].main}</h2>
                            </div>
                        </div>

                        <div className='home__grid translucentBack round'>
                            <div className='col'>
                                <h3>Humidity</h3>

                                <h4>{mainData.current.humidity}%</h4>
                            </div>

                            <div className='col'>
                                <h3>Visibility</h3>

                                <h4>{mainData.current.visibility}m</h4>
                            </div>

                            <div className='col'>
                                <h3>Wind SPD</h3>

                                <h4>{mainData.current.wind_speed}m/s</h4>
                            </div>

                            <div className='col'>
                                <h3>Sunrise</h3>

                                <h4>{convertUnixToTime(mainData.current.sunrise)}</h4>
                            </div>

                            <div className='col'>
                                <h3>Sunset</h3>

                                <h4>{convertUnixToTime(mainData.current.sunset)}</h4>
                            </div>

                            <div className='col'>
                                <h3>UV RAD</h3>

                                <h4>{mainData.current.uvi}</h4>
                            </div>
                        </div>
                    </div>

                    <div className='home__forecast col'>
                        <h2>Forecast</h2>

                        <div className='home__forecast-row row'>
                            {
                                mainData.hourly.map((curr, index) => 
                                    <ForecastComp
                                        key={index}
                                        dateTime={convertUnixToTime(curr.dt)}
                                        icon={curr.weather[0].icon}
                                        temp={convertTemp(curr.temp)}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className='home__allCountries translucentBack round col'>
                        <h2 style={{textDecoration: 'underline', marginBottom: '5px'}}>All Available Countries:</h2>

                        {
                            allCountriesShown ? 
                            allCountriesData.map((curr,index) => 
                                <h5 key={index}>{curr.name}</h5>
                            ) :
                            <span style={{lineHeight: '0px'}}>&nbsp;</span>
                        }

                        {
                            allCountriesShown ?
                            <button onClick={allCountriesBtnOnClick}>Hide Country Names</button> :
                            <button onClick={allCountriesBtnOnClick}>All Country Names</button>
                        }
                    </div>

                    <Link to='/WeatherGraph' exact='true' className='link-right center'>
                        <img src={arrowIconRight} alt='arrow-icon-right' className='transition'/>
                    </Link>
                </div> :
                <div className='home__inner col'>
                    <video className='home__background' loop={true} muted={true} autoPlay={true} src={loadingVid}/>

                    <img src={spinner} alt='spinner' className='spinner'/>

                    <h1>Fetching Weather Data....</h1>
                </div>
            }  
        </div>
    )
}

export default Home;