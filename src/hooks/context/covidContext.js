import { createContext ,useContext,useState,useEffect} from "react";
import { getCovidData } from "../utils/covidCaseHandler";


const CovidContext=createContext(null);
export const useCovidCases=()=>useContext(CovidContext);
export const CovidCaseProvider=({children})=>{
    const [covidCases,setCovidCases]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{getCovidData(setCovidCases,setIsLoading)},[])
    return <CovidContext.Provider value={{covidCases,isLoading}}>
        {children}
    </CovidContext.Provider>
}