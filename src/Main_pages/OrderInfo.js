import React, { useState } from 'react'
import { useContext } from 'react'
import { Container } from '../App'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../Small_elements/BottomBar'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import '../Client/OrderInfo.css'
import { dbUrl } from './Home'
function OrderInfo() {
    const navigate = useNavigate()
    let { id, setId } = useContext(Container)
    let [list, setList] = useState([])
    useEffect(() => {
        axios.post(dbUrl + 'get-order-info', { id })
            .then(res => {
                console.log(res)
                list = res.data
                setList(list)
                console.log(list)
            })
            .catch(err => console.log(err))


    }, [])
    return (
        <div className='order_info_layout'>
            <Shopsystem1 />
            <div className='order_place_center'>
                <div className='order_position'>
                    <div className='order_history_title'>Order history</div>
                    <div className='order_form'>
                        <div className='form_text'>Tên người mua</div>
                        <div className='form_text'>Sdt</div>
                        <div className='form_text'>Địa chỉ</div>
                        <div className='form_text'>Tên bánh</div>
                        <div className='form_text'>Số lượng</div>
                        <div className='form_text'>Giá</div>
                        <div className='form_text'>Tổng giá</div>
                    </div>
                    {list.map((ordersInfo, index) => {
                        return (
                            <div className='Orders'>
                                <div className='user_order_info'>{ordersInfo.name}</div>
                                <div className='user_order_info'>{ordersInfo.phone}</div>
                                <div className='user_order_info'>{ordersInfo.address}</div>
                                <div className='user_order_cakes'>
                                    {ordersInfo.orderList?.map((cakesName, index2) => {
                                        return (
                                            <div className='user_order_cakes_name'>{cakesName[0].cake_title}</div>
                                        )
                                    })}
                                </div>
                                <div className='user_order_info'>x1</div>
                                <div className='user_order_cakes'>
                                    {ordersInfo.orderList?.map((cakesName, index2) => {
                                        return (
                                            <div className='user_order_cakes_name'>{cakesName[0].price} VND</div>
                                        )
                                    })}
                                </div>
                                <div className='user_order_info'>{ordersInfo.totalPrice} VND</div>
                            </div>
                        )
                    })}
                    <div className='order_status'> Tình trạng : Đang được xử lý</div>
                </div>
            </div>
            <BottomBar />
        </div>
    )
}

export default OrderInfo