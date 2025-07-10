import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";

function darkenColor(hex, amount = 20) {
  try {
    let col = hex.startsWith('#') ? hex.slice(1) : hex;
    if (col.length === 3) col = col.split('').map(c => c + c).join('');
    const num = parseInt(col, 16);
    const r = Math.max((num >> 16) - amount, 0);
    const g = Math.max(((num >> 8) & 0x00FF) - amount, 0);
    const b = Math.max((num & 0x0000FF) - amount, 0);
    return `rgb(${r}, ${g}, ${b})`;
  } catch (e) {
    return hex;
  }
}

function CompanyNavbar({ name, logo, color }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const companyUserRole = localStorage.getItem('companyUserRole');
  const navigate = useNavigate();
  const hoverColor = darkenColor(color, 80);

  const handleLogout = () => {
    localStorage.removeItem('companyToken');
    localStorage.removeItem('companyUserRole');
    navigate(`/cosmetics/${slugifyName(name)}`);
    window.location.reload();
  };

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  function slugifyName(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  return (
    <nav className="border-gray-200" style={{ backgroundColor: color }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={`/cosmetics/${slugifyName(name)}`} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10 rounded-lg" alt="Logo" />
          <span className="text-2xl font-semibold text-white whitespace-nowrap">{name}</span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="flex flex-col font-medium mt-4 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <NavLink
                to={`/cosmetics/${slugifyName(name)}`}
                className="block font-bold transition-colors text-white"
                onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>

            {companyUserRole !== 'adminCompany' && (
              <>
                <li><button onClick={() => handleScrollTo('companyProducts')} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')}>Products</button></li>
                <li><button onClick={() => handleScrollTo('companyAbout')} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')}>About</button></li>
                <li><button onClick={() => handleScrollTo('companyContact')} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')}>Contact</button></li>
              </>
            )}

            {!companyUserRole && (
              <>
                <li><NavLink to={`/cosmetics/${slugifyName(name)}/register`} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')} onClick={() => setIsMenuOpen(false)}>Register</NavLink></li>
                <li><NavLink to={`/cosmetics/${slugifyName(name)}/login`} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')} onClick={() => setIsMenuOpen(false)}>Login</NavLink></li>
              </>
            )}

            {companyUserRole === 'adminCompany' && (
              <>
                <li><NavLink to={`/cosmetics/${slugifyName(name)}/add-products`} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')} onClick={() => setIsMenuOpen(false)}>Add Products</NavLink></li>
                <li><NavLink to={`/cosmetics/${slugifyName(name)}/manage-products`} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')} onClick={() => setIsMenuOpen(false)}>Manage Products</NavLink></li>
              </>
            )}

            {companyUserRole === 'userCompany' && (
              <>
                <li><NavLink to={`/cosmetics/${slugifyName(name)}/cart`} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')} onClick={() => setIsMenuOpen(false)}>Cart</NavLink></li>
                <li><NavLink to={`/cosmetics/${slugifyName(name)}/my-orders`} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')} onClick={() => setIsMenuOpen(false)}>My Orders</NavLink></li>
              </>
            )}

            {companyUserRole && (
              <li><button onClick={handleLogout} className="block font-bold text-white transition-colors" onMouseEnter={(e) => (e.target.style.color = hoverColor)} onMouseLeave={(e) => (e.target.style.color = 'white')}>Logout</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CompanyNavbar;
