import React ,{useContext} from 'react';
import { Link ,useLocation ,useHistory } from "react-router-dom";

import { BackContext } from '../Context/notes/BackState';

// Import Image
import notebookDark from './notebookDark.png';
import notebookLight from './notebookLight.png';

export default function Navbar() {
    const {mode , ChangeMode , search , ChangeSearch} = useContext(BackContext);

    const location = useLocation();
    const history = useHistory();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        history.push("/login");
    }

    const handleSearchChange=(e)=>{
        ChangeSearch(e.target.value);
    }

    
    
    return (
        <div className="fontMain">
            <nav className={`navbar fixed-top navbar-expand-lg navbar-${mode} bg-${mode}`}>
                <div className="container-fluid">
                    <img src={mode==="light"?notebookDark:notebookLight} alt="Logo" width={30} height={30} />

                    <Link className="navbar-brand" to="/"><h4>&nbsp; Prenotebook</h4></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/"><h5>Home</h5></Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about"><h5>About</h5></Link>
                        </li>
                    </ul>
                    <div className="form-check form-switch ">
                        <input className="form-check-input" readOnly={true} type="checkbox" role="switch" id="flexSwitchCheckDefault"  onClick={ChangeMode} checked={mode==="dark"?true:false} />
                        <label className={`form-check-label text-${mode==="light"?"dark":"light"} mx-2`} htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                    </div>
                    <form className="d-flex">
                        {
                            !localStorage.getItem("token")?
                            <>
                            <Link to="/login" className="btn btn-outline-info me-2" role="button" aria-disabled="true">Login</Link>
                            <Link to="/signup" className="btn btn-outline-info me-2" role="button" aria-disabled="true">SignUp</Link>
                            </>:
                            <button onClick={handleLogout} className="btn btn-outline-info me-2">Logout</button>
                        }

                        <input className="form-control me-2" style={{"backgroundColor" : mode==="light"?"white":"#667574" , "color" : mode==="light"?"":"#cfd5c1"}} type="search" value={search} onChange={handleSearchChange} placeholder="Search" aria-label="Search"/>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
