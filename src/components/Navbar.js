import React from 'react'
import "./componets.css"
import { navlogo } from '../assets'
import{ Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/">
        <img src={navlogo}alt='nav-logo'/>
      </Link>
    </div>
  )
}

export default Navbar