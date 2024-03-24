/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchField = (props) => {
    return (
        <div> 
            find countries: <input value={props.newString} onChange={props.handleFilterStringChange}></input>
        </div>
    )
}

const SearchResults = (props) => {
    let noOfCountries
    const FILTER_AMOUNT = 15

    if (Object.keys(props.results).length === 0){
        return null
    } else {
        props.results.data.filter((element) => element.name.common.toLowerCase().includes(props.newString))
                            .map((_item,_index,array)=>{
                                noOfCountries = array.length
                            })
            
        if (noOfCountries < FILTER_AMOUNT){
            return (
                props.results.data.filter( (item) => item.name.common.toLowerCase().includes(props.newString))
                        .map((filteredList)=> {
                                if (noOfCountries>1){
                                    return <div key={filteredList.name.common}>{filteredList.name.common} <button onClick={()=>(props.showCountry(filteredList.name.common))}>show</button></div>  
                                } else {
                          
                                    return (<div key={filteredList.name.common}>
                                        <h1>{filteredList.name.common}</h1>
                                        <p>Capital: {filteredList.capital}
                                            <br></br>
                                            Area: {filteredList.area}
                                        </p>
                                        <b>Languages:</b>
                                        <ul>
                                            {Object.entries(filteredList.languages).map(item => {
                                                    return (<li key={item[0]}>{item[1]}</li>)}
                                                )
                                            }
                                        </ul>
                                        <img src={filteredList.flags.png}/>
                                    </div>  
                                    )
                                }
                        }
                        )
            ) 
        } else if (noOfCountries > FILTER_AMOUNT) {
            return (<div>Too Much Data</div>)
         } 
    }
}

function App() {
    const [newString, setNewString] = useState('');
    const [countryList, setCountryList] = useState({});
    const [country, setNewCountry] = useState(null)

    useEffect(() => {
        if (country){
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                .then(response => {
                    setCountryList(response)          
                })
        } 
        }, [country])
    

    const handleFilterStringChange = (event) => {
        event.preventDefault()
        setNewString(event.target.value.toLowerCase())
        setNewCountry(event.target.value.toLowerCase())
        if (event.target.value === ""){
            setCountryList({})
        }
    }    

    const showCountry = (country) =>{
        setNewString(country.toLowerCase())
        setNewCountry(country.toLowerCase())
    }


    return (
        <div>
            <SearchField newString={newString}
                         handleFilterStringChange={handleFilterStringChange}/>
                         
            <SearchResults results={countryList} 
                         newString={country} 
                         showCountry={showCountry}
          
            />
            
        </div>

    )
}

export default App
