import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Home from './Main_pages/Home';
import Introduction from './Main_pages/Introduction';
import Delivery from './Main_pages/Delivery';
import Payment from './Main_pages/Payment';
import Signin from './Main_pages/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import ProductDetail from './Main_pages/ProductDetail';
import Shopsystem1 from './Small_elements/Shopsystem1';
import UserOrders from './Main_pages/UserOrders';
import OrderInfo from './Main_pages/OrderInfo';
import GetNewPw from './Main_pages/GetNewPw';
import { useEffect } from 'react';
export const Container = createContext()

function App() {
  let [id, setId] = useState(null)
  let [list, setList] = useState([])
  let [showCart, setShowCart] = useState(false)
  useEffect(() => {
    const userId = window.localStorage.getItem("userId")
    id = userId
    setId(id)
    console.log(userId)
  }, [])

  return (
    <Container.Provider value={{ id, setId, list, setList, showCart, setShowCart }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Introduction' element={<Introduction />}></Route>
          <Route path='/Delivery' element={<Delivery />}></Route>
          <Route path='/Payment' element={<Payment />}></Route>
          <Route path='/Signin' element={<Signin />}></Route>
          <Route path='/Home/:cakeId' element={<ProductDetail />}></Route>
          <Route path='/Shopsystem' element={<Shopsystem1 />}></Route>
          <Route path='/your-orders' element={id ? <UserOrders /> : <Signin />}></Route>
          <Route path='/order-information' element={id ? <OrderInfo /> : <Signin />}></Route>
          <Route path='/forget-pw' element={<GetNewPw />}></Route>
        </Routes>
      </BrowserRouter>
    </Container.Provider>
  );
}

export default App;
