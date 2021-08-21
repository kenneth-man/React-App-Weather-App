import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
//need both 'npm install chart.js' and 'npm install react-chartjs-2', to use react version
import {Line} from 'react-chartjs-2';
import { videoBackgrounds } from '../VideoBackgrounds.js';
import loadingVid from '../Res/Loading.mp4';
import arrowIconLeft from '../Res/chevron-left.svg';
import arrowIconRight from '../Res/chevron-right.svg';

const WeatherGraph = () => {
    const { mainData, convertUnixToTime, convertTemp, initWeatherMapData, weatherMapData, toWeatherMapScreenOnClick } = useContext(Context);
    const [dataChartHours, setDataChartHours] = useState(undefined);

    useEffect(() => {
        if(mainData){
            setDataChartHours({
                labels: mainData.hourly.map(curr => convertUnixToTime(curr.dt)),
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(255,0,0,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: mainData.hourly.map(curr => convertTemp(curr.temp, true))
                    },
                    {
                        label: 'Humidity (%)',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(32,178,178,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: mainData.hourly.map(curr => curr.humidity)
                    },
                    {
                        label: 'UV Radiation (uvi)',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(0,255,0,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: mainData.hourly.map(curr => curr.uvi)
                    },
                    {
                        label: 'Wind Speed (m/s)',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(255,165,0,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: mainData.hourly.map(curr => curr.wind_speed)
                    },
                    {
                        label: 'Cloudiness (%)',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(255,105,180,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: mainData.hourly.map(curr => curr.clouds)
                    }
                ]
            });
        }
    }, [mainData])

    return (
        <div className='weatherGraph screen center'>
            {
                mainData ? 
                <div className='col'>
                    <video className='weatherGraph__background' loop={true} muted={true} autoPlay={true} style={{filter : 'brightness(70%)'}}src={
                        videoBackgrounds.find(curr => curr.weather === mainData.current.weather[0].main).video
                    }/>

                    <h1>Weather Graph</h1>

                    <Line
                        data={dataChartHours}
                        options={{
                            scales: {
                                y: {
                                    ticks: {
                                        color: 'rgb(255,255,255)',
                                        font: {
                                            family: 'Heebo',
                                            weight: '300',
                                            size: 16,
                                        }
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: 'rgb(255,255,255)',
                                        font: {
                                            family: 'Heebo',
                                            weight: '300',
                                            size: 16,
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            family: 'Heebo',
                                            weight: '300',
                                            size: 16,
                                        }
                                    },
                                }
                            },
                            events: ['click'],
                            color: 'rgb(255,255,255)',
                            maintainAspectRatio: false
                        }}
                        className='chart'
                    />

                    <Link to='/' exact='true' className='link-left center'>
                        <img src={arrowIconLeft} alt='arrow-icon-left' className='transition'/>
                    </Link>

                    <Link to='/WeatherMap' exact='true' className='link-right center' onClick={toWeatherMapScreenOnClick}>
                        <img src={arrowIconRight} alt='arrow-icon-right' className='transition'/>
                    </Link>
                </div> :
                <div className='weatherGraph__inner col'>
                    <video className='weatherGraph__background' loop={true} muted={true} autoPlay={true} src={loadingVid}/>

                    <h1>Fetching data....</h1>
                </div>
            }
        </div>
    )
}

export default WeatherGraph;