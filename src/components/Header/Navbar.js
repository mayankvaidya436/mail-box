import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store/authSlice'

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div style={{"marginLeft":"50px "}}>

        <span className="navbar-brand">Your Brand</span>
      </div>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav" style={{"marginRight":"50px "}}>
        <ul className="navbar-nav">
          {isLoggedIn && <li className="nav-item">
            <button onClick={logoutHandler} className="btn btn-outline-danger my-2 my-sm-0" style={{"margin":"5px "}} href="#">Logout</button>
          </li>}
          {!isLoggedIn && <li className="nav-item">
            <button className="btn btn-outline-primary my-2 my-sm-0" href="#">Login</button>
          </li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;