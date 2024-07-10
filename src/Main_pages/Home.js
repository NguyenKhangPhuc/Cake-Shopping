import React from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import BottomBar from '../Small_elements/BottomBar'
export const dbUrl = 'https://cake-shop-servers.onrender.com'

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
        { title: "Best Seller", filter_sign: "BestSeller" },
        { title: "Must Try", filter_sign: "MustTry" },
        { title: "New Arrivals", filter_sign: "New" },
        { title: "Hot", filter_sign: "Hot" }
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
        setSearchArr([])
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
        setSearchArr([])
    }
    const goCakeDetail = (id) => {
        navigate(`/Home/${id}`)
    }
    return (
        <div style={{ width: "auto", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {productData ?
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
                    <MobileSearch handleSearching={handleSearching} offSearching={offSearching} searchArr={searchArr} chooseSearchResult={chooseSearchResult} />
                    <div className='shop_categories'>
                        <div className='categories_position'>
                            {shopCategories.map((categories, index) => {
                                return (
                                    <div className='categories' onClick={() => handleFilterCake(categories.filter_sign)}>{categories.title}</div>
                                )
                            })}

                        </div>

                        <div className='filter_cake'>
                            <div className='filter' onClick={() => handleShowFilter()}>Filter</div>
                            <div className='search' onClick={() => handleShowSearch()}>Searching </div>
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
                </div> :
                <div className="loader" >
                    <div className="truckWrapper">
                        <div className="truckBody">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 198 93"
                                className="trucksvg"
                            >
                                <path
                                    stroke-width="3"
                                    stroke="#282828"
                                    fill="#F83D3D"
                                    d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                                ></path>
                                <path
                                    stroke-width="3"
                                    stroke="#282828"
                                    fill="#7D7C7C"
                                    d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                                ></path>
                                <path
                                    stroke-width="2"
                                    stroke="#282828"
                                    fill="#282828"
                                    d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                                ></path>
                                <rect
                                    stroke-width="2"
                                    stroke="#282828"
                                    fill="#FFFCAB"
                                    rx="1"
                                    height="7"
                                    width="5"
                                    y="63"
                                    x="187"
                                ></rect>
                                <rect
                                    stroke-width="2"
                                    stroke="#282828"
                                    fill="#282828"
                                    rx="1"
                                    height="11"
                                    width="4"
                                    y="81"
                                    x="193"
                                ></rect>
                                <rect
                                    stroke-width="3"
                                    stroke="#282828"
                                    fill="#DFDFDF"
                                    rx="2.5"
                                    height="90"
                                    width="121"
                                    y="1.5"
                                    x="6.5"
                                ></rect>
                                <rect
                                    stroke-width="2"
                                    stroke="#282828"
                                    fill="#DFDFDF"
                                    rx="2"
                                    height="4"
                                    width="6"
                                    y="84"
                                    x="1"
                                ></rect>
                            </svg>
                        </div>
                        <div className="truckTires">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 30 30"
                                className="tiresvg"
                            >
                                <circle
                                    stroke-width="3"
                                    stroke="#282828"
                                    fill="#282828"
                                    r="13.5"
                                    cy="15"
                                    cx="15"
                                ></circle>
                                <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 30 30"
                                className="tiresvg"
                            >
                                <circle
                                    stroke-width="3"
                                    stroke="#282828"
                                    fill="#282828"
                                    r="13.5"
                                    cy="15"
                                    cx="15"
                                ></circle>
                                <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                            </svg>
                        </div>
                        <div className="road"></div>

                        <svg

                            viewBox="0 0 453.459 453.459"
                            xlinkHref="http://www.w3.org/1999/xlink"
                            xmlnsBx="http://www.w3.org/2000/svg"
                            id="Capa_1"
                            version="1.1"
                            fill="#000000"
                            className="lampPost"
                        >
                            <path
                                d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
      c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
      c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
      c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
      h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
      v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
      V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
      M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
      h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
                            ></path>
                        </svg>
                    </div>
                    <div className='loading_text' style={{ fontSize: "95%", paddingTop: "10px" }}>Loading Products!</div>
                    <div className='loading_text' style={{ fontSize: "90%", paddingTop: "3px" }}>Please wait</div>
                </div>}
        </div>


    )
}

const MobileSearch = ({ handleSearching, offSearching, searchArr, chooseSearchResult }) => {
    return (
        <div className='mobile_search_place'>
            <div className='search_position_mobile'>

                <svg className="mobile_icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input className='search_input_mobile' placeholder='Searching' onChange={(e) => handleSearching(e.target.value)} />
                <div className='off_input_mobile' onClick={() => offSearching()}>ⓧ</div>
            </div>
            <div className='search_result_mobile' >
                {searchArr.map((products, index) => {
                    return (
                        <div className='mobile_results' onClick={() => chooseSearchResult(products.cake_title)}>{products.cake_title}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home