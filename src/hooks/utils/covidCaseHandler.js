import { getCovidService } from "../../services/covidDB.service"

export const getCovidData=async (setCovidCases,setIsLoading)=>{
    try {
        const res=await getCovidService(setCovidCases)
        setIsLoading(true)
           setTimeout(()=>{
            setIsLoading(false)
           },500)
            setCovidCases(res)
    } catch (error) {
        console.error(error)
    }
}