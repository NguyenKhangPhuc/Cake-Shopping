import React from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import BottomBar from '../Small_elements/BottomBar'
export const dbUrl = 'https://cake-shop-servers.onrender.com/'

function Home() {
    const navigate = useNavigate()
    const [slideNumber, setSlideNumber] = useState(0)
    const [showArrow, setShowArrow] = useState(false)
    const [productData, setProductData] = useState(null)
    const [defaultCake, setDefaultCake] = useState(null)
    const [showText, setShowText] = useState(false)
    const [verifyNum, setVerifyNum] = useState(null)
    const [changeImg, setChangeImg] = useState(0)
    const [showFilter, setShowFilter] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [offSort, setOffSort] = useState(false)
    const [searchArr, setSearchArr] = useState([])
    let product
    const shopCategories = [
        { title: "All", filter_sign: "All" },
        { title: "Bán Chạy Nhất", filter_sign: "BestSeller" },
        { title: "Phải Thử", filter_sign: "MustTry" },
        { title: "Sản Phẩm Mới", filter_sign: "New" },
        { title: "Đang Hot", filter_sign: "Hot" }
    ]
    const sorting = [
        { title: "Default", filter_sign: "All" },
        { title: "Popularity", filter_sign: "BestSeller" },
        { title: "Average rating", filter_sign: "MustTry" },
        { title: "New arrivals", filter_sign: "New" },
    ]
    useEffect(() => {
        handleGetApi()
    }, [])
    const handleGetApi = async () => {
        product = await axios.get(dbUrl)
        console.log(product)
        setProductData(product.data)
        setDefaultCake(product.data)
    }
    const slideImg = [
        'https://the350f.com/wp-content/uploads/2021/05/1600x678.jpg',
        'https://the350f.com/wp-content/uploads/2021/06/BO-COVER.jpg',
    ]
    const handleMoveSlide = () => {
        if (slideNumber == 0) {
            setSlideNumber(slideNumber + 1)
        } else {
            setSlideNumber(slideNumber - 1)
        }
    }
    const handleFilterCake = (sign) => {
        const FilterCake = defaultCake.filter((products, index) => {
            return products.categories.includes(sign)
        })
        console.log(FilterCake)
        setProductData(FilterCake)
    }
    const handleShowFilter = () => {
        if (showFilter == false) {
            setShowFilter(true)
        } else {
            setShowFilter(false)
        }
        setShowSearch(false)
    }
    const handleShowSearch = () => {
        if (showSearch == false) {
            setShowSearch(true)
        } else {
            setShowSearch(false)
        }

        setShowFilter(false)
    }
    const handleSorting = (sign) => {
        const FilterCake = defaultCake.filter((products, index) => {
            return products.categories.includes(sign)
        })
        console.log(FilterCake)
        setProductData(FilterCake)
    }
    const AscendingPrice = () => {
        const ascendSort = defaultCake.sort((a, b) => (a.price > b.price) ? 1 : -1)
        setProductData(ascendSort)
    }
    const DescendingPrice = () => {
        const ascendSort = defaultCake.sort((a, b) => (a.price < b.price) ? 1 : -1)
        setProductData(ascendSort)
    }
    const offSearching = () => {
        setShowSearch(false)
        setProductData(defaultCake)
    }
    const handleSearching = (inputValue) => {
        const searchFilter = defaultCake.filter((products, index) => {
            return products.cake_title.toLowerCase().includes(inputValue.toLowerCase())
        })
        if (inputValue == '') {
            setSearchArr([])
        } else {
            setSearchArr(searchFilter)
            console.log(searchArr)
        }
    }
    const chooseSearchResult = (cakeName) => {
        const chooseResult = defaultCake.filter((products, index) => {
            return products.cake_title == cakeName
        })
        setProductData(chooseResult)
        console.log(chooseResult)
    }
    const goCakeDetail = (id) => {
        navigate(`/Home/${id}`)
    }
    return (
        <div className='home_big_lay'>
            <div className='home_layout' >
                <Shopsystem1 />
                <div className='shop_slideposter' >
                    <div className='slide' style={{ backgroundImage: `url(${slideImg[slideNumber]})` }} onMouseOver={() => setShowArrow(true)} onMouseLeave={() => setShowArrow(false)} onClick={() => handleMoveSlide()}>
                        {showArrow == true &&
                            <div className='arrow_position' >
                                <div className='left_arrow' onClick={() => handleMoveSlide()}>⇚</div>
                                <div className='right_arrow' onClick={() => handleMoveSlide()}>⇛</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='shop_categories'>
                <div className='categories_position'>
                    {shopCategories.map((categories, index) => {
                        return (
                            <div className='categories' onClick={() => handleFilterCake(categories.filter_sign)}>{categories.title}</div>
                        )
                    })}

                </div>

                <div className='filter_cake'>
                    <div className='filter' onClick={() => handleShowFilter()}>Lọc</div>
                    <div className='search' onClick={() => handleShowSearch()}>Tìm kiếm </div>
                </div>
            </div>
            {showFilter == true ?
                <div className='filter_place'>
                    <div className='sorting'>
                        <div className='sort_method_position'>
                            <div className='sort_title'> Sort By </div>
                            <div className='methods_position'>
                                {sorting.map((methods, index) => {
                                    return (
                                        <div className='methods' onClick={() => handleSorting(methods.filter_sign)}>
                                            {methods.title}
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='sort_price' >
                            <div className='sort_price_title'>Price</div>
                            <div className='sort_price_methods_position'>
                                <div className='price_methods' onClick={() => AscendingPrice()}>Price: Low to High</div>
                                <div className='price_methods' onClick={() => DescendingPrice()}>Price: High to Low</div>
                            </div>
                        </div>
                    </div>
                </div> : <div style={{ transition: '0.5s' }}></div>}
            {showSearch == true ?
                <div className='search_position'>

                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input className='search_input' placeholder='Searching' onChange={(e) => handleSearching(e.target.value)} />
                    <div className='off_input' onClick={() => offSearching()}>ⓧ</div>
                </div> : <div style={{ transition: '0.5s' }}></div>
            }
            {showSearch == true ?
                <div className='search_result' >
                    {searchArr.map((products, index) => {
                        return (
                            <div className='results' onClick={() => chooseSearchResult(products.cake_title)}>{products.cake_title}</div>
                        )
                    })}
                </div> : <div></div>
            }
            <div className='product_position'>
                {productData?.map((products, index) => {
                    return (
                        <div className={`product${index + 1}`} style={{ backgroundImage: `url(${verifyNum == index ? products.img_src[1] : products.img_src[0]}})` }} onMouseOver={() => setVerifyNum(index)} onMouseLeave={() => setVerifyNum(null)} onClick={() => goCakeDetail(products._id)}>
                            <div className='cake_title' >{products.cake_title}</div>
                            {verifyNum == index ? <div className='showmore_text'>Show more</div> : <div className='cake_price'>{products.price} VND</div>}
                        </div>
                    )
                })}
            </div>
            <BottomBar />
        </div>
    )
}

export default Home