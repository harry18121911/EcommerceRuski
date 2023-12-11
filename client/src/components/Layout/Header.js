import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast, { Toast } from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand"> 🛒Ecommerce Ruski React</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page" href="#">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="localhost:3000" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Categories
              </a>
              <ul className='dropdown-menu'>
              {categories?.map((c) => (
                
                  <li>
                    <p>
                      {c.name}
                    </p>
                  </li>
                  ))}
              </ul>
              
              
            </li>
            {
              !auth.user ? (<><li className="nav-item">
                <NavLink to="/register" className="nav-link " href="#">Register</NavLink>
              </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
                </li></>) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                        }`} className="dropdown-item">Dashboard</NavLink></li>
                      <NavLink onClick={handleLogout} to="/login" className="nav-link" href="#">Log Out</NavLink>
                    </ul>
                  </li>


                </>
              )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link " href="#">Cart(0)</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Header