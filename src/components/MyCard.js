import React, { useEffect, useState } from 'react'
import PieChartHeader from '../primeComponents/pie';
import { useCovidCases } from '../hooks/context/covidContext';
// import ListOfTableCovidDb from '../primeComponents/table';
        
const MyCard = () => {
  const [covidCase,setCovidCase]=useState([])
  const {covidCases,isLoading}=useCovidCases()
  useEffect(()=>{
    setCovidCase(covidCases)
  },[])
  return (
    <div>
         <h2 className='card-h2'>Analysis Of CovidStats </h2>
    <div className='my-card'>
      <div className='data-card'>
        <h2>Know Covid19-Statitistcs</h2>
        <p>By Graphs</p>
        <p>By Table </p>
        <p>Details View By Coutry Name</p>
        <p>Detail view Analysis by Ligraph</p>
      </div>
        <div className='align-center'>
        <iframe src="https://covid-19.dataflowkit.com/assets/widget/c19-widget-light.html" 
frameborder="0"width="450" height="280"title='2'className='iframe '></iframe>
        </div>
         <PieChartHeader />
    </div>
    <hr/>
    <h2 className='card-h2'>Tabulation Analysis</h2>
    {/* <ListOfTableCovidDb/> */}
    {isLoading ?
    (covidCase.map((data)=>"toast")):""}
    
    </div>
  )
}

export default MyCard