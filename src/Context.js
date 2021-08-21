import React, { createContext, useState, useEffect, useRef } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [mainData, setMainData] = useState(undefined);
    const [currDate, setCurrDate] = useState(undefined);
    const [initialLat, setInitialLat] = useState(undefined);
    const [initialLng, setInitialLng] = useState(undefined);
    const [searchbarValue, setSearchbarValue] = useState('');
    const [allCountriesData, setAllCountriesData] = useState(undefined);
    const [weatherMapData, setWeatherMapData] = useState([]);
    const [weatherMapDataShown, setWeatherMapDataShown] = useState([]);
    const [weatherMapOptions, setWeatherMapOptions] = useState(['clouds_new', 'precipitation_new', 'pressure_new', 'wind_new', 'temp_new']);
    const [weatherMapSelection, setWeatherMapSelection] = useState('temp_new');
    const [weatherMapXCoord, setWeatherMapXCoord] = useState(undefined);
    const [weatherMapYCoord, setWeatherMapYCoord] = useState(0);
    const [airPollutionData, setAirPollutionData] = useState(undefined);

    const isWeatherMapDataInit = useRef(false);
    const isWeatherMapXCoordInit = useRef(false);
    const isWeatherMapYCoordInit = useRef(false);
    const isWeatherMapSelectionInit = useRef(false);
 
    const key = 'b77722ccfc08cfad8e4e4cd2586a8ba6';

    const fetchMainData = async (lat, lng) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}`);
            const data = await response.json();
            setMainData(data);
        } catch(error){
            console.log(error);
        }
    }

    const fetchWeatherMapData = async (weatherMapSel) => {
        try {
            const response = await fetch(`https://tile.openweathermap.org/map/${weatherMapSel}/4/${weatherMapXCoord}/${weatherMapYCoord}.png?appid=${key}`);
            setWeatherMapData([...weatherMapData, response.url]);
        } catch(error){
            console.log(error);
        }
    }

    const fetchAirPoullutionData = async (lat, lng) => {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${key}`);
            const data = await response.json();
            setAirPollutionData(data);
            console.log(data);
        } catch(error){
            console.log(error);
        }
    }

    const fetchInitialLatLng = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    //'position' parsed in is a 'GeolocationPosition' object, which has a property called 'coords'
                    setInitialLat(position.coords.latitude);
                    setInitialLng(position.coords.longitude);
                }, 
                () => alert('couldn\'t get your position')
            );
        }
    }

    const fetchAllCountriesData = async () => {
        try {
            const response = await fetch(`https://restcountries.eu/rest/v2/all`);
            const data = await response.json();
            setAllCountriesData(data);
        } catch(error){
            console.log(error);
        }
    }

    const getDate = () => {
        //Date() returns an object
        const strDate = String(new Date());
        //getting day so i can show full name e.g. 'Sunday' instead of 'Sun'
        let day =  String(strDate.split(' ').slice(0, 1));

        if(day === 'Wed') day = 'Wednes';
        if(day === 'Thu') day = 'Thurs';
        if(day === 'Sat') day = 'Satur';
        
        setCurrDate(`${day}day ${strDate.split(' ').slice(1, 3).join(' ')}`);
    }

    //convert unix timestamp to time 
    const convertUnixToTime = unix => {
        const date = new Date(unix * 1000);
        return `${String(date.getHours()).padStart(2,0)}:${String(date.getMinutes()).padStart(2,0)}`;
    }

    //convert kalvins to celsius
    const convertTemp = (temp, usingChart = false) => {
        if(!usingChart) return `${String(temp - 273.15).slice(0,5)}°`;

        return `${String(temp - 273.15).slice(0,5)}`;
    }

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const resetWeatherMapData = () => {
        isWeatherMapDataInit.current = false;
        isWeatherMapXCoordInit.current = false;
        isWeatherMapYCoordInit.current = false;
        setWeatherMapData([]);
        setWeatherMapXCoord(0);
        setWeatherMapYCoord(0);
    }

    const initWeatherMapData = () => {
        setWeatherMapXCoord(0);
    }

    //if weatherMapData already exists, don't need to fetch data again (by clearing weatherMapData and running useEffects in context)
    const toWeatherMapScreenOnClick = () => {
        if(weatherMapData.length === 0) initWeatherMapData();
    }

    useEffect(() => {
        getDate();
        fetchInitialLatLng();
        fetchAllCountriesData();
    },[])

    useEffect(() => {
        if(initialLat && initialLng){
            fetchMainData(initialLat, initialLng);  
            fetchAirPoullutionData(initialLat, initialLng);
        } 
    }, [initialLat, initialLng])

    useEffect(() => {
        if(searchbarValue){
            const countryObj = allCountriesData.find(curr => curr.name === capitalizeFirstLetter(searchbarValue));
            if(countryObj){
                fetchMainData(countryObj.latlng[0], countryObj.latlng[1]);
                fetchAirPoullutionData(countryObj.latlng[0], countryObj.latlng[1]);
            } 
        }
    }, [searchbarValue])

    //cycling through x and y coordinate image tiles from api e.g. (0,0), (1,0), (2,0)...(13,15), (14,15), (15,15)
    useEffect(() => {
        if(!isWeatherMapDataInit.current){
            isWeatherMapDataInit.current = true;
        } else if(weatherMapYCoord <= 15){
            if(weatherMapXCoord <= 14){
                setWeatherMapXCoord(weatherMapXCoord => weatherMapXCoord + 1);
            } else if(weatherMapYCoord === 15) {
                setWeatherMapDataShown(weatherMapData);
                resetWeatherMapData();
            } else {
                setWeatherMapYCoord(weatherMapYCoord => weatherMapYCoord + 1);
            }   
        }
    }, [weatherMapData])

    useEffect(() => {
        !isWeatherMapXCoordInit.current ? isWeatherMapXCoordInit.current = true : fetchWeatherMapData(weatherMapSelection);
    }, [weatherMapXCoord])

    useEffect(() => {
        !isWeatherMapYCoordInit.current ? isWeatherMapYCoordInit.current = true : setWeatherMapXCoord(0);
    }, [weatherMapYCoord])

    useEffect(() => {
        if(!isWeatherMapSelectionInit.current){
            isWeatherMapSelectionInit.current = true;
        } else {
            fetchWeatherMapData(weatherMapSelection);
            setWeatherMapDataShown([]);
        }
    }, [weatherMapSelection])

    return (
        <Context.Provider value={{ currDate, mainData, airPollutionData, weatherMapData, weatherMapDataShown, searchbarValue, allCountriesData, 
                                    weatherMapOptions, weatherMapSelection, setSearchbarValue, convertUnixToTime, convertTemp, initWeatherMapData, 
                                    setWeatherMapSelection, toWeatherMapScreenOnClick }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;