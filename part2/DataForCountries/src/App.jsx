/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const SearchField = (props) => {
    return (
        <div> 
            Find countries: <input value={props.newString} onChange={props.handleFilterStringChange}></input>
        </div>
    )
}

const WeatherField = (props) =>{
    return (
        <div>
            <h1>Weather in {props.getCountryData.data.name}</h1>
            <p>Temperature: {props.getCountryData.data.main.temp} </p>
            <img src={'https://openweathermap.org/img/wn/'+props.getCountryData.data.weather[0].icon+'.png'}/>
            <p>Wind: {props.getCountryData.data.wind.speed} </p>
        </div>
    )
}

const CountryField = (props) =>{
    return (
        <div>
            <h1>{props.filteredList.name.common}</h1>
            <p>Capital: {props.filteredList.capital}
                <br></br>
                Area: {props.filteredList.area}
            </p>
            <b>Languages:</b>
            <ul>
                {Object.entries(props.filteredList.languages)
                       .map(item => {return (<li key={item[0]}>{item[1]}</li>)})}
            </ul>
            <img src={props.filteredList.flags.png}/>
        </div>
    )
}

const SearchResults = (props) => {
    const FILTER_AMOUNT = 25

    const getNoOfCountries = () =>{
        let noOfCountries 
        props.results.data.filter((element) => element.name.common.toLowerCase().includes(props.newString))
                .map((_item,_index,array)=>{
                    noOfCountries = array.length
                })
        return noOfCountries
    }

    if (Object.keys(props.results).length === 0 ){
        return null
    } else {
        if (getNoOfCountries() < FILTER_AMOUNT){
            return (
                props.results.data.filter( (item) => item.name.common.toLowerCase().includes(props.newString))
                        .map((filteredList)=> {
                                if (getNoOfCountries()>1){
                                    return <div key={filteredList.name.common}>{filteredList.name.common} <button onClick={()=>(props.showCountry(filteredList.name.common,filteredList.capital))}>show</button></div>  
                                } 
                                else {       
                                    if (Object.keys(props.getCountryData).length !== 0 ){
                                        return (<div key={filteredList.name.common}>
                                            <CountryField filteredList={filteredList}/>
                                            <WeatherField getCountryData={props.getCountryData}/>
                                        </div>  
                                        )
                                    } else if (getNoOfCountries()===1){
                                        props.showCountry(filteredList.name.common,filteredList.capital)
                                    }
                                }
                            }
                        )
            ) 
        } else if (getNoOfCountries() > FILTER_AMOUNT) {
            return (<div>Too Much Data</div>)
        } 
    }
}

function App() {
    const [newString, setNewString] = useState('');
    const [countryList, setCountryList] = useState({});
    const [country, setNewCountry] = useState(null)
    const [countryData, setCountryData] = useState({});
    
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
        if (event.target.value < newString){
            setCountryList({})
            setCountryData({})
        }
    }    

    const showCountry = (country,capital) =>{
        setNewCountry(country.toLowerCase())
        getWeatherData(capital)
    }

    const getWeatherData = (capital) => {
        const query = capital
        const units = "metric"
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api_key+"&units=" +units+""

        axios.get(url)
             .then(response => {
                setCountryData(response)
            })
    }

    return (
        <div>
            <SearchField newString={newString}
                         handleFilterStringChange={handleFilterStringChange}/>
                         
            <SearchResults results={countryList} 
                         newString={country} 
                         showCountry={showCountry}
                         getWeatherData={getWeatherData}
                         getCountryData={countryData}/>
        </div>
    )
}

export default App
