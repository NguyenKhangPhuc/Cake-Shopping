import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../App'
import { useEffect } from 'react'
import axios from 'axios'
import { dbUrl } from '../Main_pages/Home'
function Shopsystem1() {
    const shopSystem = [
        { title: 'Shop', link: '' },
        { title: 'Giới Thiệu', link: 'Introduction' },
        { title: 'Giao Hàng', link: 'Delivery' },
        { title: 'Thanh Toán', link: 'Payment' },
        { title: 'Đăng nhập', link: 'Signin' },
        { title: 'Giỏ hàng 🛒' }
    ]
    let [cartList, setCartList] = useState([])
    let { id, setId } = useContext(Container)
    let { list, setList } = useContext(Container)
    const [showCart, setShowCart] = useState(false)
    let [totalPrice, setTotalPrice] = useState(0)
    const [showShopsystem, setShowShopsystem] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(id)
        if (id) {
            axios.post(dbUrl + 'get-list', { id })
                .then(result => {
                    cartList = result.data.list
                    setCartList(cartList)
                    console.log(cartList)
                })
                .catch(err => console.log(err))
        }
    }, [id])
    const handleShopSystem = (page, index) => {

        if (index == 5) {
            setShowCart(true)

        } else {
            navigate(`/${page}`)
        }

    }
    const handleDelete = async (index) => {
        const filterProduct = cartList.filter((cartProducts, index2) => {
            return index2 != index
        })
        console.log(filterProduct)
        cartList = filterProduct
        setCartList(cartList)
        await axios.post(dbUrl + 'update-cart', { id, cartList })
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }
    const goDetailFromCart = (id) => {
        navigate(`/Home/${id}`)
    }
    const goOrder = () => {
        if (id && cartList.length > 0) {
            navigate('/your-orders')
        } else if (cartList.length < 1) {
            alert('put some cakes in your carts <3')
        }
        else {
            navigate('/Signin')
        }

    }
    const goOrdersInfo = () => {
        if (id) {
            navigate('/order-information')
        } else {
            navigate('/Signin')
        }
    }
    return (
        <>
            <div className='header'>
                <div className='logo_position' style={{ backgroundImage: 'url(https://i.pinimg.com/564x/c5/b2/6c/c5b26c3b96dc289dd009d86d6809e7a6.jpg)' }}> </div>
                <div className='shop_system'>
                    {shopSystem.map((features, index) => {
                        return (
                            <div className='shop_features' onClick={() => handleShopSystem(features.link, index)}>
                                {features.title}
                            </div>
                        )
                    })}
                </div>

                {showCart == true ?
                    <div className='cart_place'>
                        <div className='close_cart' onClick={() => setShowCart(false)}>Close</div>
                        {cartList.map((cartProducts, index) => {
                            return (
                                <div className='cart_products_position'>
                                    <div className='cart_product_img' style={{ backgroundImage: `url(${cartProducts[0].img_src[0]})` }} onClick={() => goDetailFromCart(cartProducts[0]._id)}></div>
                                    <div className='cart_product_details'>
                                        <div className='cart_product_title' onClick={() => goDetailFromCart(cartProducts[0]._id)}>{cartProducts[0].cake_title}</div>
                                        <div className='cart_product_price'>Price: {cartProducts[0].price} VND</div>
                                    </div>
                                    <button className="delete-button" onClick={() => handleDelete(index)}>
                                        <svg className="delete-svgIcon" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}

                        <button className="Btn" onClick={() => goOrder()}>
                            Thanh toán
                            <svg viewBox="0 0 576 512" className="svgIcon"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                        </button>

                        <button className="Btn" onClick={() => goOrdersInfo()}>
                            xem đơn hàng của bạn
                            <svg viewBox="0 0 576 512" className="svgIcon"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                        </button>

                    </div>
                    : <div style={{ transition: '0.5s' }}></div>}

            </div>
            <MobileHeader shopSystem={shopSystem} handleShopSystem={handleShopSystem} showShopsystem={showShopsystem} setShowShopsystem={setShowShopsystem}
                showCart={showCart} setShowCart={setShowCart} cartList={cartList} goDetailFromCart={goDetailFromCart} handleDelete={handleDelete} goOrder={goOrder}
                goOrdersInfo={goOrdersInfo}
            />
        </>

    )
}
const MobileHeader = ({ shopSystem, handleShopSystem, showShopsystem, setShowShopsystem, showCart, setShowCart, cartList, goDetailFromCart, handleDelete, goOrder, goOrdersInfo }) => {
    return (
        <div className='mobile_header'>
            <div className='logo_position' style={{ backgroundImage: 'url(https://i.pinimg.com/564x/c5/b2/6c/c5b26c3b96dc289dd009d86d6809e7a6.jpg)' }}> </div>
            {showShopsystem == false && <div className='hamburger_icon' onClick={() => setShowShopsystem(!showShopsystem)}>☰</div>}
            {showShopsystem == true &&
                <div className='shop_system_mobile'>
                    {shopSystem.map((features, index) => {
                        return (
                            <div className='shop_features_mobile' onClick={() => handleShopSystem(features.link, index)}>
                                {features.title}
                            </div>
                        )
                    })}
                    <div className='off_shopsytem_mobile' onClick={() => setShowShopsystem(false)}>x</div>
                </div>}

            {showCart == true ?
                <div className='cart_place_mobile'>
                    <div className='close_cart' onClick={() => setShowCart(false)}>Close</div>
                    {cartList.map((cartProducts, index) => {
                        return (
                            <div className='cart_products_position'>
                                <div className='cart_product_img' style={{ backgroundImage: `url(${cartProducts[0].img_src[0]})` }} onClick={() => goDetailFromCart(cartProducts[0]._id)}></div>
                                <div className='cart_product_details'>
                                    <div className='cart_product_title' onClick={() => goDetailFromCart(cartProducts[0]._id)}>{cartProducts[0].cake_title}</div>
                                    <div className='cart_product_price'>Price: {cartProducts[0].price} VND</div>
                                </div>
                                <button className="delete-button" onClick={() => handleDelete(index)}>
                                    <svg className="delete-svgIcon" viewBox="0 0 448 512">
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                    </svg>
                                </button>
                            </div>
                        )
                    })}

                    <button className="Btn" onClick={() => goOrder()}>
                        Thanh toán
                        <svg viewBox="0 0 576 512" className="svgIcon"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                    </button>

                    <button className="Btn" onClick={() => goOrdersInfo()}>
                        xem đơn hàng của bạn
                        <svg viewBox="0 0 576 512" className="svgIcon"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                    </button>

                </div>
                : <div style={{ transition: '0.5s' }}></div>}
        </div>
    )
}
export default Shopsystem1