import React from 'react';
import tokenService from '../../utils/tokenService';
import './SearchBar.css';


function Searchbar(props) {
    const [inputValue, setInputValue] = React.useState('');

    function handleChange(e){
        setInputValue(e.target.value)
    }

    function handleSubmit(){
        filterEvents()
    }

    async function filterEvents() {
        try {
            const request = await fetch(`/api/posts/search/${inputValue}`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + tokenService.getToken() },
                body: { inputValue }
            });
    
            const response = await request.json();
    
            if (response) {
                props.setSearchedEvents(response)
            }
        } catch(error) {
            console.log('error filtering events', error)
        }
    }

    return (
        <div className="searchBarCss">
            <input value={inputValue} placeholder="search for events" onChange={(e) => handleChange(e)}/>
            <button onClick={() => handleSubmit()}>Search</button>
        </div>
    )
};

export default Searchbar;