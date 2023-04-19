import { getCovidService } from "../../services/covidDB.service"

export const getCovidData=async (setCovidCases,setIsLoading)=>{
    try {
        const res=await getCovidService(setCovidCases)
        setIsLoading(true)
        if(res.status===200){
            setTimeout(()=>{
                setIsLoading(false)
               },500)
            setCovidCases(res.data)
        }
    } catch (error) {
        console.error(error)
    }
}