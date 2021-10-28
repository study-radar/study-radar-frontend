import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <img className="logo1" alt="logo" src="https://cdn.dribbble.com/users/1611223/screenshots/6390568/36daysoftype_4x.jpg" width="60" height="60" />

        <div className="options">
          <p>Login</p>
          <p>Signup</p>
        </div>
      </div>
    </>
  )
}
