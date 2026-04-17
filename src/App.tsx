// import { Routes, Route } from 'react-router-dom';
// import { CartProvider } from './context/CartContext'; 
// import AdminLogin from "./pages/Admin/AdminLogin";
// import Main from "./layouts/Main";
// import Admin from './layouts/Admin';
// import Home from './pages/Main/Home';
// import About from './pages/Main/About';
// import Products from './pages/Main/Products';
// import Login from './pages/Main/Login';
// import Register from './pages/Main/Register';
// import Dashboard from './pages/Admin/Dashboard';
// import AdminProtectedRoute from './guards/AdminProtectedRoute';
// import AddFood from './pages/Admin/AddFood';
// import Cart from './pages/Main/Cart'
// import Profile from './pages/Main/Profile'
// import OrderHistory from './pages/Main/OrderHistory';
// const App = () => {
//   return (
    
//     <CartProvider>
//       <Routes>
//         {/* Main User Routes */}
//         <Route path="" element={<Main />}>
//           <Route path='' element={<Home />} />
//           <Route path='about' element={<About />} />
//           <Route path='fooditems' element={<Products />} />
//           <Route path='order-history' element={<OrderHistory/>}/>
//           <Route path='login' element={<Login />} />
//           <Route path='register' element={<Register />} />
//           <Route path='cart' element={<Cart />} /> 
//           <Route path='profile' element={<Profile/>}/>

//         </Route>

//         {/* Admin Login Page */}
//         <Route path="admin" element={<AdminLogin />} />

//         {/* Protected Admin Layout */}
//         <Route 
//           path="admin/dashboard" 
//           element={
//             <AdminProtectedRoute>
//               <Admin />
//             </AdminProtectedRoute>
//           }
//         >
//           <Route path='' element={<Dashboard />} />
//           <Route path='addfood' element={<AddFood />} />
//         </Route>
//       </Routes>
//     </CartProvider>
//   );
// };

// export default App;
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import { OrderProvider } from './context/OrderContext'; // 1. Import the Provider
import AdminLogin from "./pages/Admin/AdminLogin";
import Main from "./layouts/Main";
import Admin from './layouts/Admin';
import Home from './pages/Main/Home';
import About from './pages/Main/About';
import Products from './pages/Main/Products';
import Login from './pages/Main/Login';
import Register from './pages/Main/Register';
import Dashboard from './pages/Admin/Dashboard';
import AdminProtectedRoute from './guards/AdminProtectedRoute';
import AddFood from './pages/Admin/AddFood';
import Cart from './pages/Main/Cart';
import Profile from './pages/Main/Profile';
import OrderHistory from './pages/Main/OrderHistory';
import OrderSuccess from './pages/Main/OrderSuccess'; 
import ManageOrders from './pages/Admin/ManageOrders';
import DisplayUser from './pages/Admin/DisplayUser';
import VerifyOTP from './pages/Main/VerifyOTP';


const App = () => {
  return (
    <CartProvider>
      <OrderProvider> 
        <Routes>
          {/* Main User Routes */}
          <Route path="" element={<Main />}>
            <Route path='' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='fooditems' element={<Products />} />
            <Route path='order-history' element={<OrderHistory/>}/>
            <Route path='order-success' element={<OrderSuccess/>}/> 
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='verify-otp' element={<VerifyOTP />} />
            <Route path='cart' element={<Cart />} /> 
            <Route path='me' element={<Profile/>}/>
          </Route>

          {/* Admin Login Page */}
          <Route path="admin" element={<AdminLogin />} />

          {/* Protected Admin Layout */}
          <Route 
            path="admin/dashboard" 
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          >
            <Route path='' element={<Dashboard />} />
            <Route path='addfood' element={<AddFood />} />
            <Route path='users' element={<DisplayUser/>}/>
            <Route path='manage-orders' element={<ManageOrders />} />
          </Route>
        </Routes>
      </OrderProvider>
    </CartProvider>
  );
};

export default App;
