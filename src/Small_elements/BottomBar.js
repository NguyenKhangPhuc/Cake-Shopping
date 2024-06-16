import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import fbLogo from '../Imgs/fb-logo.png'
import insLogo from '../Imgs/ins-logo.png'
import tiktokLogo from '../Imgs/tiktok-logo.png'
function BottomBar() {
    const navigate = useNavigate()
    const shopSystem = [
        { title: 'Shop', link: '' },
        { title: 'Introduction', link: 'Introduction' },
        { title: 'Delivery', link: 'Delivery' },
        { title: 'Payment Methods', link: 'Payment' },

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
                    <img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png' className='fb_logo'></img>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/2/28/Instagram_logo.png' className='insta_logo' />
                    
                </div>
            </div>
        </div>
    )
}

export default BottomBar