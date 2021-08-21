import React, { useContext } from 'react';
import { Context } from '../Context.js';

const Searchbar = () => {
    const { searchbarValue, setSearchbarValue } = useContext(Context);

    const searchbarOnChange = (value) => {
        setSearchbarValue(value);
    }
    
    return (
        <input type='text' placeholder='Search by country name (case sensitive)...' className='searchbar' value={searchbarValue} onChange={e => searchbarOnChange(e.target.value)}/>
    )
}

export default Searchbar;