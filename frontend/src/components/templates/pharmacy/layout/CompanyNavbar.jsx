import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

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
  const companyUserRole = localStorage.getItem('companyUserRole');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const hoverColor = darkenColor(color, 80);

  const slugifyName = (name) => name.toLowerCase().replace(/\s+/g, '-');

  const handleLogout = () => {
    localStorage.removeItem('companyToken');
    localStorage.removeItem('companyUserRole');
    navigate(`/pharmacy/${slugifyName(name)}`);
    window.location.reload();
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinkClasses = "block py-2 px-3 font-bold text-white transition-colors md:p-0";

  return (
    <nav className="border-gray-200" style={{ backgroundColor: color }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={`/pharmacy/${slugifyName(name)}`} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10 rounded-lg" alt="Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap text-white">{name}</span>
        </Link>

        <button
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
            <li>
              <NavLink to={`/pharmacy/${slugifyName(name)}`} className={navLinkClasses}
                onMouseEnter={(e) => e.target.style.color = hoverColor}
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>

            {companyUserRole !== 'adminCompany' && (
              <>
                <li><button className={navLinkClasses} onClick={() => handleScroll('companyProducts')} onMouseEnter={(e) => e.target.style.color = hoverColor} onMouseLeave={(e) => e.target.style.color = 'white'}>Products</button></li>
                <li><button className={navLinkClasses} onClick={() => handleScroll('companyAbout')} onMouseEnter={(e) => e.target.style.color = hoverColor} onMouseLeave={(e) => e.target.style.color = 'white'}>About</button></li>
                <li><button className={navLinkClasses} onClick={() => handleScroll('companyContact')} onMouseEnter={(e) => e.target.style.color = hoverColor} onMouseLeave={(e) => e.target.style.color = 'white'}>Contact</button></li>
              </>
            )}

            {!companyUserRole && (
              <>
                <li>
                  <NavLink to={`/pharmacy/${slugifyName(name)}/register`} className={navLinkClasses}
                    onMouseEnter={(e) => e.target.style.color = hoverColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                    onClick={() => setIsOpen(false)}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/pharmacy/${slugifyName(name)}/login`} className={navLinkClasses}
                    onMouseEnter={(e) => e.target.style.color = hoverColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                    onClick={() => setIsOpen(false)}>
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {companyUserRole === 'adminCompany' && (
              <>
                <li>
                  <NavLink to={`/pharmacy/${slugifyName(name)}/add-products`} className={navLinkClasses}
                    onMouseEnter={(e) => e.target.style.color = hoverColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                    onClick={() => setIsOpen(false)}>
                    Add Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/pharmacy/${slugifyName(name)}/manage-products`} className={navLinkClasses}
                    onMouseEnter={(e) => e.target.style.color = hoverColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                    onClick={() => setIsOpen(false)}>
                    Manage Products
                  </NavLink>
                </li>
              </>
            )}

            {companyUserRole === 'userCompany' && (
              <>
                <li>
                  <NavLink to={`/pharmacy/${slugifyName(name)}/cart`} className={navLinkClasses}
                    onMouseEnter={(e) => e.target.style.color = hoverColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                    onClick={() => setIsOpen(false)}>
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/pharmacy/${slugifyName(name)}/my-orders`} className={navLinkClasses}
                    onMouseEnter={(e) => e.target.style.color = hoverColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                    onClick={() => setIsOpen(false)}>
                    My Orders
                  </NavLink>
                </li>
              </>
            )}

            {companyUserRole && (
              <li>
                <button className={navLinkClasses} onClick={handleLogout}
                  onMouseEnter={(e) => e.target.style.color = hoverColor}
                  onMouseLeave={(e) => e.target.style.color = 'white'}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CompanyNavbar;
