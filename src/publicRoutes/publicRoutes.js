import React from 'react'
import {Routes,Route} from "react-router-dom"
import LandingPage from '../pages/LandingPage'
import DetailsPage from '../pages/DetailsPage'
import ErrorPage from '../pages/ErrorPage'
const PublicRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/"element={<LandingPage/>}/>
            <Route path="/details/1"element={<DetailsPage/>}/>
            <Route path="*"element={<ErrorPage/>}/>
        </Routes>
    </div>
  )
}

export default PublicRoutes