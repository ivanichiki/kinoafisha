import React from 'react'
import './Header.scss'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='Header'>
        <div className='wrap_header'>
        <NavLink to='/'>      <img src='https://upload.wikimedia.org/wikipedia/commons/6/6a/New-imdb-logo.png' />
        </NavLink>
        </div>
    </div>
  )
}
