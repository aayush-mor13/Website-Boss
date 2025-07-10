import { Routes, Route, useLocation, useMatch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import CreateWebsite from './components/createWebsite/CreateWebsite';
import AddProductsPage from './components/createWebsite/AddProductsPage';
import Dashboard from './components/admin/Dashboard';

import CosmeticsCompanyLogin from './components/templates/cosmetics/auth/CompanyLogin';
import CosmeticsCompanyRegister from './components/templates/cosmetics/auth/CompanyRegister';
import CosmeticsCompanyHome from './components/templates/cosmetics/home/CompanyHome';
import CosmeticsAddProducts from './components/templates/cosmetics/admin/AddProducts';
import CosmeticsManageProducts from './components/templates/cosmetics/admin/ManageProducts';
import CosmeticsViewProducts from './components/templates/cosmetics/home/ViewProducts';
import CosmeticsCartPage from './components/templates/cosmetics/user/CartPage';
import CosmeticsOrdersPage from './components/templates/cosmetics/user/CosmeticsOrdersPage';

import PharmacyCompanyLogin from './components/templates/pharmacy/auth/CompanyLogin';
import PharmacyCompanyRegister from './components/templates/pharmacy/auth/CompanyRegister';
import PharmacyCompanyHome from './components/templates/pharmacy/home/CompanyHome';
import PharmacyAddProducts from './components/templates/pharmacy/admin/AddProducts';
import PharmacyManageProducts from './components/templates/pharmacy/admin/ManageProducts';
import PharmacyViewProducts from './components/templates/pharmacy/home/ViewProducts';
import PharmacyCartPage from './components/templates/pharmacy/user/CartPage';
import PharmacyOrdersPage from './components/templates/pharmacy/user/PharmacyOrdersPage';


function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const hideLayoutPaths = [
    '/login',
    '/register'
  ];

  const isCosmeticsRoute = [
    useMatch('/cosmetics/:companyName'),
    useMatch('/cosmetics/:companyName/login'),
    useMatch('/cosmetics/:companyName/register'),
    useMatch('/cosmetics/:companyName/add-products'),
    useMatch('/cosmetics/:companyName/manage-products'),
    useMatch('/cosmetics/:companyName/view-products'),
    useMatch('/cosmetics/:companyName/cart'),
    useMatch('/cosmetics/:companyName/my-orders'),
    useMatch('/pharmacy/:companyName'),
    useMatch('/pharmacy/:companyName/login'),
    useMatch('/pharmacy/:companyName/register'),
    useMatch('/pharmacy/:companyName/add-products'),
    useMatch('/pharmacy/:companyName/manage-products'),
    useMatch('/pharmacy/:companyName/view-products'),
    useMatch('/pharmacy/:companyName/cart'),
    useMatch('/pharmacy/:companyName/my-orders'),
  ].some(Boolean);

  const shouldHideLayout = hideLayoutPaths.includes(path) || isCosmeticsRoute;

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/create-website' element={<CreateWebsite />} />
        <Route path='/create-website/add-product' element={<AddProductsPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/cosmetics/:companyName' element={<CosmeticsCompanyHome/>} />
        <Route path='/cosmetics/:companyName/login' element={<CosmeticsCompanyLogin/>} />
        <Route path='/cosmetics/:companyName/register' element={<CosmeticsCompanyRegister/>}/>
        <Route path='/cosmetics/:companyName/add-products' element={<CosmeticsAddProducts/>} />
        <Route path='/cosmetics/:companyName/manage-products' element={<CosmeticsManageProducts/>} />
        <Route path="/cosmetics/:companyName/view-products" element={<CosmeticsViewProducts/>} />
        <Route path="/cosmetics/:companyName/cart" element={<CosmeticsCartPage/>}/>
        <Route path="/cosmetics/:companyName/my-orders" element={<CosmeticsOrdersPage/>}/>

        <Route path='/pharmacy/:companyName/login' element={<PharmacyCompanyLogin/>} />
        <Route path='/pharmacy/:companyName/register' element={<PharmacyCompanyRegister/>}/>
        <Route path='/pharmacy/:companyName' element={<PharmacyCompanyHome/>} />
        <Route path='/pharmacy/:companyName/add-products' element={<PharmacyAddProducts/>} />
        <Route path='/pharmacy/:companyName/manage-products' element={<PharmacyManageProducts/>} />
        <Route path="/pharmacy/:companyName/view-products" element={<PharmacyViewProducts/>} />
        <Route path="/pharmacy/:companyName/cart" element={<PharmacyCartPage/>}/>
        <Route path="/pharmacy/:companyName/my-orders" element={<PharmacyOrdersPage/>}/>
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default Layout;
