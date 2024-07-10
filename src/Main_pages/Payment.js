import React from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import ContactBoard from '../Small_elements/ContactBoard'
import BottomBar from '../Small_elements/BottomBar'
import '../Client/Payment.css'
function Payment() {
  return (
    <div className='payment_big_lay'>
      <div className='payment_lay_1'>
        <Shopsystem1 />
        <div className='payment_center'>
          <div className='payment_title'>Payment Methods</div>
          <div className='direct_payment_policies'>
            <div className='direct_payment_title'>Payment Upon Delivery</div>
            <div className='direct_policies_text'>
              <div>– Customers can place orders through our website at https://cake-shop-sigma.vercel.app/, and our staff will call to confirm the order details and provide additional information.</div>
              <div>
                – You will pay the full amount of the order to the delivery person immediately after checking the status of the order (ensuring that the correct products are intact, and all accompanying accessories such as candles and congratulatory tags are present).
              </div>
              <div>– If you need to change the payment method when the delivery person has arrived, please call the Hotline at 0869977910 to inform and receive prompt assistance.</div>
            </div>

          </div>
          <div className='transfer_payment_policies'>
            <div className='transfer_payment_title'>Bank Transfer Payment</div>
            <div className='transfer_payment_text'>Customers can settle their invoices by transferring funds to The Cake bakery's account with the following banks and contact Hotline to confirm the information.</div>

            <div className='bank_information'>
              <img src='https://the350f.com/wp-content/uploads/2021/05/logo-Vietcombank.png' className='bank_logo' />
              <div style={{ fontWeight: 'bold' }}>
                <div>• Account Holder: Nguyen Khang Phuc</div>
                <div>• Account Number: 1040.6479.50</div>
                <div>• Branch: Ho Chi Minh City</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactBoard />
      <BottomBar />
    </div>
  )
}

export default Payment