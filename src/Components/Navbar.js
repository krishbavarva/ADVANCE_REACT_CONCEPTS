import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Hello </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">regular form</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/multistep">MultiStep form</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/advance">Advance Validation from</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/analitics">Analitics Form</Link>
        </li>
    
        
      </ul>
     
    </div>
  </div>
</nav>
    </div>
  )
}
