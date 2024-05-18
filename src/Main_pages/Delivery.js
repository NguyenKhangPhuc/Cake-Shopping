import React from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import '../Client/Delivery.css'
import BottomBar from '../Small_elements/BottomBar'
import ContactBoard from '../Small_elements/ContactBoard'
function Delivery() {
  return (
    <div className='delivery_big_lay'>
      <Shopsystem1 />
      <div className='delivery_lay_1'>

        <div className='delivery_center'>
          <div className='delivery_title'>Delivery Policies</div>
          <div className='delivery_policies'>
            <p>– We offer home delivery services for a fee. The delivery cost will be provided once you enter the accurate delivery address during the order process.</p>
            <p>– We strive to deliver within the requested time frame, allowing for a 60-90 minute buffer. However, due to unforeseen circumstances such as bad weather, traffic jams, or road incidents, the delivery might be delayed. We will notify you as soon as possible in such cases.</p>
            <p>– We will call to confirm your order before dispatching it, and only when the shipper is available for delivery. Please provide any changes or updates to your order during this call for prompt assistance.</p>
            <p> – Please keep your phone available as the shipper can only wait for a maximum of 20 minutes upon arrival.</p>
            <p>– If you do not consume the cake immediately, please store it in the refrigerator. Cold cakes left at room temperature for too long may melt and lose their original texture.</p>
            <p>– Upon receiving your cake, please inspect it before accepting. If the cake shows any signs of damage, DO NOT ACCEPT the cake and contact our Hotline at 1800 8287 for immediate assistance.
            </p>

          </div>

        </div>
      </div>
      <ContactBoard />
      <BottomBar />
    </div>
  )
}

export default Delivery