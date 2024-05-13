import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Container } from '../App'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../Small_elements/BottomBar'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import '../Client/UserOrders.css'
function UserOrders() {
    const navigate = useNavigate()
    let { id, setId } = useContext(Container)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    let [orderList, setOrderList] = useState([])
    let [totalPrice, setTotalPrice] = useState(0)
    useEffect(async () => {
        await axios.post('http://localhost:5000/get-list', { id })
            .then(result => {
                orderList = result.data.list
                setOrderList(orderList)
                console.log(orderList)

            })
            .catch(err => console.log(err))
    }, [])
    const submitInformation = async () => {
        if (!name || !age || !phone || !address) {
            alert('Plese fill all the blanks')
        } else {
            for (let i = 0; i < orderList.length; i++) {
                totalPrice += orderList[i][0].realPrice
                console.log(totalPrice)
            }
            setTotalPrice(totalPrice)

            await axios.post('http://localhost:5000/make-orders-list', { id, orderList, name, age, phone, address, totalPrice })
                .then(res => {
                    console.log(res)
                    navigate('/order-information')
                })
                .catch(err => console.log(err))



        }
    }
    return (
        <div className='user_orders_layout'>
            <Shopsystem1 />
            <div className='user_form'>

                <div className='form'>
                    <div className='order_titles'>Địa chỉ giao hàng*</div>
                    <label for='fullName'>Họ và tên *</label>
                    <input type='text' id='fullName' className='info_input' placeholder='Full Name' onChange={(e) => setName(e.target.value)} />
                    <label for='Age'>Tuổi</label>
                    <input type='number' id='Age' className='info_input' placeholder='Age' onChange={(e) => setAge(e.target.value)} />
                    <label for='phoneNumber'> Số điện thoại *</label>
                    <input type='text' id='phoneNumber' className='info_input' placeholder='Phone numbers' onChange={(e) => setPhone(e.target.value)} />
                    <label for='address' >Địa chỉ *</label>
                    <input type='text' id='address' className='info_input' placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                    <div className='pay_btn_position'>
                        <button onClick={() => submitInformation()}>
                            <span class="box">
                                Thanh toán!
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <BottomBar />
        </div>
    )
}

export default UserOrders