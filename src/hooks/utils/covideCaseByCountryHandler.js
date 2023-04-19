import { getSingleCountryService } from "../../services/covidDB.service"

export const getCovidCaseByCountry=async (setCovidCaseByCountry,countryName)=>{
    try {
         const res=await getSingleCountryService(countryName)
         if(res.status===200){
            setCovidCaseByCountry(res.data)
         }    
     } catch (error) {
         console.error(error)
     }
}