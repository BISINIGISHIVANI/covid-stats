import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCovidCaseByCountry } from '../hooks/utils/covideCaseByCountryHandler'
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import "./pages.css"
const DetailsPage = () => {
  const {countryName}=useParams()
  const [covidCasesByCountry,setCovidCaseByCountry]=useState({})
   const navigate=useNavigate()
 

   useEffect(()=>{
    getCovidCaseByCountry(setCovidCaseByCountry,countryName)
   },[countryName])
   const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
         const myData=(value)=>{
         let fieldData=[value["Total Cases_text"],value["Total Deaths_text"],value["Total Recovered_text"],value["Active Cases_text"],value["New Cases_text"],value["New Deaths_text"]];
            return fieldData;
        }
        let result=myData(covidCasesByCountry)
        let myarry=result.map((v)=>{return v.split(',').join("") })
        var j=myarry.reduce((acc,x)=>acc.concat(+x),[])
       
        console.log(j)
        const data = {
            labels: ['Total Cases', 'Total Deaths', 'Total Recovered',"Active Cases","New Cases","New Deaths"],
            datasets: [
                {
                    label:covidCasesByCountry["Country_text"],
                    data:j,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(146, 170, 226, 0.796)'
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio:0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    },[setChartData,setChartOptions,covidCasesByCountry]);
  return (
    <div>
      <h2 className='h2'>Line Chart of {covidCasesByCountry["Country_text"]}</h2>
      {/* Chart of Table */}
      <div>
        <div className='detail-chart'>
          <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
        </div>
      </div>
      <div className="btn">
      <Button className="primary-button"onClick={()=>navigate("/")}>Go Back</Button>
      </div>
    </div>
  )
}


export default DetailsPage