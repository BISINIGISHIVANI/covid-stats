import React from 'react'
import { useNavigate } from 'react-router-dom'

const DetailsPage = () => {
   const navigate=useNavigate()
  return (
    <div>
      <h2>Country Name</h2>
      {/* Chart of Table */}
      <div>
        <div className='detail-chart'></div>
      </div>
      <button onClick={()=>navigate("/")}>Go Back</button>
    </div>
  )
}

export default DetailsPage