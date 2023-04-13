import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCovidCaseByCountry } from '../hooks/utils/covideCaseByCountryHandler'

const DetailsPage = () => {
  const {countryName}=useParams()
  const [covidCasesByCountry,setCovidCaseByCountry]=useState({})
   const navigate=useNavigate()
   useEffect(()=>{
    getCovidCaseByCountry(setCovidCaseByCountry,countryName)
   },[countryName])
  return (
    <div>
      <h2>Country Name</h2>
      {/* Chart of Table */}
      <div>
        <div className='detail-chart'>
          chart
        </div>
      </div>
      <button onClick={()=>navigate("/")}>Go Back</button>
    </div>
  )
}

export default DetailsPage