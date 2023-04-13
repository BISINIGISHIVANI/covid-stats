import { getSingleCountryService } from "../../services/covidDB.service"

export const getCovidCaseByCountry=async (setCovidCaseByCountry,countryName)=>{
    try {
         const res=await getSingleCountryService(countryName)
             setCovidCaseByCountry(res)
     } catch (error) {
         console.error(error)
     }
}