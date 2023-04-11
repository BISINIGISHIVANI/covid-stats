import axios from "axios";

export const getCovidService=()=>{
    return axios.get("https://covid-19.dataflowkit.com/v1")
}
export const getSingleCountryService=(countryName)=>{
    return axios.get(`https://covid-19.dataflowkit.com/v1/${countryName}`)
}