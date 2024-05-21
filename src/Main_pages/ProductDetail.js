import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import '../Client/ProductDetail.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import BottomBar from '../Small_elements/BottomBar'
import { Container } from '../App'
import { useNavigate } from 'react-router-dom'
import { dbUrl } from './Home'
import { MobileHeader } from '../Small_elements/Shopsystem1'
function ProductDetail() {
    const navigate = useNavigate()
    const { cakeId } = useParams()
    const [productData, setProductData] = useState(null)
    const [listImgs, setListImgs] = useState(null)
    const [checkSmallImgs, setCheckSmallImg] = useState(0)
    const [bigImg, setBigImg] = useState(null)
    const [sizeIndex, setSizeIndex] = useState(0)
    let { id, setId } = useContext(Container)
    let [listStorage, setListStorage] = useState([])
    let [cakeIndex, setCakeIndex] = useState(null)
    const [recommendList, setRecommendList] = useState([])
    const [verifyNum, setVerifyNum] = useState(null)
    let product
    let recommendedCake
    useEffect(() => {
        handleGetApi()
        console.log(id)
        axios.post(dbUrl + '/get-list', { id })
            .then(result => {
                console.log(result)
                setListStorage(result.data.list)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const handleGetApi = async () => {

        product = await axios.get(dbUrl)
        const chosenProduct = product.data.filter((cakes, index) => {
            return cakes._id == cakeId
        })
        setProductData(chosenProduct)
        setListImgs(chosenProduct[0].img_src)
        setBigImg(chosenProduct[0].img_src[0])
        product.data.map((cakes, index) => {
            if (cakes._id == cakeId) {
                cakeIndex = index
                setCakeIndex(cakeIndex)

            } else {
                return cakes
            }
        })
        console.log(cakeIndex)
        recommendedCake = product.data.filter((recommendCake, index) => {
            if (cakeIndex > 3) {
                return index < cakeIndex && index >= cakeIndex - 4
            } else if (cakeIndex <= 3) {
                return index > cakeIndex && index <= cakeIndex + 4
            }
        })
        setRecommendList(recommendedCake)
    }
    const chooseImg = (imgIndex, src) => {
        setCheckSmallImg(imgIndex)
        setBigImg(src)
    }
    const handleChooseSize = (sizeIn) => {
        setSizeIndex(sizeIn)

    }
    const addToCart = async () => {
        console.log(productData)
        if (!id) {
            navigate('/Signin')
        } else if (id && listStorage.length < 6) {
            listStorage = [...listStorage, productData]
            setListStorage(listStorage)
            console.log(listStorage)
            await axios.post(dbUrl + '/update-list', { id, listStorage })
                .then(result => {
                    console.log(result)
                })
                .catch(err => console.log(err))
        }

    }
    return (
        <div className='productdetail_layout'>
            <Shopsystem1 />
            <div className='empty_div' ></div>
            <div className='productdetail_center'>
                <div className='imgs_details_position'>
                    <div className='imgs_list'>
                        {listImgs?.map((cakes, index) => {
                            return (
                                <div className='small_imgs' style={{ backgroundImage: `url(${listImgs[index]})`, opacity: `${checkSmallImgs == index ? '50%' : '100%'}` }} onClick={() => chooseImg(index, listImgs[index])}></div>
                            )
                        })}
                    </div>
                    <div className='represent_img' style={{ backgroundImage: `url(${bigImg})` }}></div>
                </div>

                {productData?.map((cake, index) => {
                    return (
                        <div className='introduction_place_detail'>
                            <div className='cake_title_detail' >{cake.cake_title}</div>
                            <div className='cake_price_detail' >Price: {cake.size[sizeIndex].sizePrice}</div>
                            <div className='introduction_text_detail'>{cake.introduction}</div>
                            <div className='cake_size_detail'>
                                <div className='size_position'>
                                    {cake.size?.map((sizeDetails, index2) => {
                                        return (
                                            <div className='size1' onClick={() => handleChooseSize(index2)} style={{ backgroundColor: `${sizeIndex == index2 ? 'gray' : 'white'}`, color: `${sizeIndex == index2 ? 'white' : 'black'}` }}>{sizeDetails.cakeSize}</div>
                                        )
                                    })}
                                </div>
                                <div className='size_des'>{cake.size[sizeIndex].size_des}</div>
                                <div className='size_price'>{cake.size[sizeIndex].sizePrice}</div>
                            </div>
                            <button className='addtocart_button' onClick={() => addToCart()}>Add to cart 🛒</button>
                        </div>
                    )
                })}
            </div>
            <div className='cake_description'>
                <div className='des_title'>Description</div>
                {productData?.map((cake, index) => {
                    return (
                        <div className='description_place'>{
                            cake.description?.map((ele, index2) => {
                                return (
                                    <div className='des_text'>{cake.description[index2]}</div>
                                )
                            })
                        }
                        </div>
                    )
                })}
            </div>
            <div className='recommended_cake_position'>
                <div className='recommended_title'>Similar Products</div>
                <div className='cakes_position'>
                    {recommendList?.map((cakes, index) => {
                        return (
                            <div className='recommended_cake' onMouseOver={() => setVerifyNum(index)} onMouseLeave={() => setVerifyNum(null)} style={{ backgroundImage: `url(${verifyNum == index ? cakes.img_src[1] : cakes.img_src[0]}})` }} onClick={() => navigate(`/Home/${cakes._id}`)}>
                                <div className='cake_title' >{cakes.cake_title}</div>
                                {verifyNum == index ? <div className='showmore_text'>Show more</div> : <div className='cake_price'>{cakes.price} VND</div>}</div>

                        )
                    })}
                </div>

            </div>
            <BottomBar />
        </div>
    )
}

export default ProductDetail