import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function BottomBar() {
    const navigate = useNavigate()
  const shopSystem = [
    { title: 'Shop', link: '' },
    { title: 'Giới Thiệu', link: 'Introduction' },
    { title: 'Giao Hàng', link: 'Delivery' },
    { title: 'Thanh Toán', link: 'Payment' },

  ]
  const handleShopSystem = (page) => {
    navigate(`/${page}`)
  }
    return (
        <div className='bottom_bar'>
            <div className='bottom_shopsystem'>
                <div className='bottom_shopsystem_features'>
                    {shopSystem.map((features, index) => {
                        return (
                            <div className='bottom_features' onClick={() => handleShopSystem(features.link)}>{features.title}</div>
                        )
                    })}
                </div>
                <div className='bottom_provided_text'>© 2024 by The Cake</div>
                <div className='application'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg' className='fb_logo'></img>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png' className='insta_logo' />
                    <img src='https://cdn.pixabay.com/photo/2022/02/09/08/24/tiktok-7002866_960_720.png' className='tiktok_logo' />
                </div>
            </div>
        </div>
    )
}

export default BottomBar