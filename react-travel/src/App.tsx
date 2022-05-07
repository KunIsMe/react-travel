import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

// 私有路由定义
// const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
//   const routeComponent = (props) => {
//     return isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Navigate to="/signIn" />
//     );
//   }
//   return (
//     <Route element={routeComponent} {...rest} />
//   );
// };

function App() {

  const jwt = useSelector(s => s.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          {/* 路由 url 参数 keywords? 传参问题 （可传 可不传） */}
          <Route path='/search/*' element={<SearchPage />} />
          <Route path='/shoppingCart' element={<ShoppingCartPage />} />
          <Route path='/placeOrder' element={<PlaceOrderPage />} />
          {/* <Route path='/shoppingCart' element={<PrivateRoute path='/shoppingCart' isAuthenticated={jwt !== null} component={<ShoppingCartPage />} />} /> */}
          {/* Routes 里 必须嵌套的是 Route */}
          {/* <PrivateRoute path='/shoppingCart' isAuthenticated={jwt !== null} component={<ShoppingCartPage />} /> */}
          {/* <PrivateRoute path='/placeOrder' isAuthenticated={jwt !== null} component={<PlaceOrderPage />} /> */}
          <Route path='*' element={<h1>404 Not Found 页面去火星了！</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
