import React from 'react'
import './styles.css'
import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className="links">
        <NavLink to='/'>Sign Up</NavLink>
       <NavLink to='/podcasts'>Podcasts</NavLink>
       <NavLink to='/create-a-podcast'>Create a podcast</NavLink>
       <NavLink to='/profile'>Profile</NavLink>
       
      </div>
    </div>
  )
}

export default Header