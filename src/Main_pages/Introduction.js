import React from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import '../Client/Introduction.css'
import BottomBar from '../Small_elements/BottomBar'
function Introduction() {


  return (
    <div className='intro_big_lay'>

      <div className='introduction_layout'>
        <Shopsystem1 />
        <div className='intro_center'>
          <div className='title'>ABOUT US</div>
          <div className='intro_poster' ></div>
          <div className='shop_introduction'>
            <div className='introduction_title'>The Cake</div>
            <div className='introduction_text'>
              <p>At The Cake Bakery, each cake tells its own unique story, imbued with an unmistakable spirit and character.</p>
              <p>
                We, the artisanal bakers, always strive to respect the authenticity, naturalness, and integrity of each ingredient. Though there may be imperfections in individual components, together they create a harmonious and delicious cake.
              </p>
              <p>
                So, whenever you crave rustic, refined, yet captivating flavors, come visit us. There are always many special things waiting for you to discover!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='contact_information'>

        <div className='contact_title'>Contact Information</div>
        <div className='contact_text'>
          <p >Hotline: 1800 8287</p>
          <p>Resolving Complaints: 0968360709</p>
          <p>Email: nguyenkhangphuc2005@gmail.com</p>
          <div style={{ display: `flex`, flexDirection: 'column' }}>
            <div > Branch 1: Ho Thi Ky street TP HCM</div>
            <div> Branch 2: Nguyen Trai street TP HCM</div>
            <div> Branch 3: Tran Hung Dao street HaNoi</div>
          </div>
          <p>Working Days: Every day of the week</p>
          <p>Work time: 09h00 – 21h30</p>

        </div>


      </div>
      <BottomBar />
    </div>
  )
}

export default Introduction