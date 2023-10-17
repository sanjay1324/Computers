import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import Shop14main from './shop14main';
// import Shop15main from './shop15main';
// import Shop16main from './shop16main';


import AddProductShop03 from './Shop-03/components/adminpage';
import UserPageShop03 from './Shop-03/components/UserPage';
import UserOperations from './Shop-02/components/UserOperator';
import AdminOperations from './Shop-02/components/AdminOperator';
import HomePage from './Shop-02/components/HomePage';
import ProductList from './Shop-02/components/ProductList';
import CheckoutPage from './Shop-02/components/CheckOut';
import PaymentPage from './Shop-02/components/Payment'
import AddProduct from'./Shop-02/pages/AddProduct';
import ViewProducts from './Shop-02/pages/ProductList'

import StockReport from './Shop-02/pages/Report'
import LiveReport from './Shop-02/pages/LiveReport'

import Shop01Home from "./Shop-01/pages/home/Home";
import Shop01Admin from "./Shop-01/pages/admin/Admin";
import Shop01Cart from "./Shop-01/pages/cart/Cart";
import Shop01ProductDetail from './Shop-01/Components/product/ProductDetail'; 




import Shop01AboutUs from "./Shop-01/pages/About/About";

import UserPage from './Shop-04/components/UserPage';
import AdminPage from './Shop-04/components/AdminPage';

import ShopProductDetails from './Shop-04/components/shopProductDetail'
import ProductDetailPage from './Shop-03/components/ProductDetail'


import AbhiramApp from './Shop-05/Abhiram/src/App';
import AdminApp from './Shop-05/Abhiram/admin/adminapp'

import MainHomePage from './pages/home'

function App() {
  

  return (
    <Router> {/* Make sure to wrap your entire application with <Router> */}
    
    
      <Routes>
        <Route path='/computer' element={<MainHomePage/>} />


        <Route path="/shop15" element={<UserOperations />} />
        <Route path="/AdminAction" element={<AdminOperations />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/products/*" element={<ProductList />} />
        <Route path="/checkout/:productId" element={<CheckoutPage />} />
        <Route path="/AdminAction/add" element={<AddProduct />} />
        <Route path="/AdminAction/view" element={<ViewProducts />} />
        <Route path="/AdminAction/report" element={<StockReport />} />
        <Route path="/AdminAction/livereport" element={<LiveReport />} />



        <Route path="/shop14/admin" element={<AddProductShop03 />} />
        <Route path="/shop14" element={<UserPageShop03 />} />
        <Route path="/shop14/products/:productId" element={<ProductDetailPage />} /> {/* Add this route */}

        



          <Route path="/shop17/*" element={<Shop01Home />} />
          <Route path="/admin" element={<Shop01Admin />} />
          <Route
            path="/Cart" element ={<Shop01Cart/>}
              
          />
          <Route path="/products/:documentId" element={<Shop01ProductDetail />} />
          <Route path="/admin/report" element={<Shop01AboutUs />} />


          <Route path='/Shop16/User' element={<UserPage/>}></Route>
          <Route path='/Shop16/Admin' element={<AdminPage/>}/>

          <Route path="/shop4products/:productId" element={<ShopProductDetails/>} /> 

           <Route path='/shop13/*' element={<AbhiramApp/>}/>
          <Route path='/shop13/abhiramadmin' element={<AdminApp/>}/>

          {/* <Route path="/shop14" element={<Shop14main />} />

          <Route path = "/shop15/*" element={<Shop15main/>} />

          <Route path="/shop16" element={<Shop16main/>}></Route>  */}

      </Routes>
    </Router>
  );
}

export default App;
