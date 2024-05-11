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
          <div className='payment_title'>HÌNH THỨC THANH TOÁN</div>
          <div className='direct_payment_policies'>
            <div className='direct_payment_title'>THANH TOÁN KHI NHẬN HÀNG</div>
            <div className='direct_policies_text'>
              <div>– Khách hàng có thể đặt hàng qua website the350f.com và nhân viên của chúng tôi sẽ gọi điện xác nhận về thông tin đơn hàng và tư vấn thêm thông tin.</div>
              <div>
                – Quý Khách thanh toán đầy đủ toàn bộ giá trị đơn hàng cho nhân viên giao nhận ngay sau khi kiểm tra tình trạng đơn hàng (kiểm tra đúng sản phẩm đã đặt còn nguyên vẹn, đầy đủ phụ kiện đi kèm như dao nến và tag chúc mừng, … ).
              </div>
              <div>– Nếu Quý Khách cần thay đổi hình thức thanh toán khi shipper đã giao hàng đến, hãy gọi Hotline 0908.78.8787 để thông báo và được hỗ trợ nhanh chóng.</div>
            </div>

          </div>
          <div className='transfer_payment_policies'>
            <div className='transfer_payment_title'>THANH TOÁN CHUYỂN KHOẢN</div>
            <div>Quý khách hàng có thể thanh toán hoá đơn bằng cách chuyển khoản qua tài khoản của tiệm bánh The 350F với các ngân hàng dưới đây và liên hệ Hotline</div>
            <div>0908.78.8787 để xác nhận thông tin.</div>
            <div className='bank_information'>
              <img src='https://the350f.com/wp-content/uploads/2021/05/logo-Vietcombank.png' className='bank_logo' />
              <div style={{fontWeight: 'bold'}}>
                <div>• Chủ tài khoản: Nguyen Khang Phuc</div>
                <div>• Số tài khoản: 1040.6479.50</div>
                <div>• Chi Nhánh: TP.Hồ Chí Minh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '23vh',display:'flex',justifyContent:'center' }}><ContactBoard /></div>
      <BottomBar/>
    </div>
  )
}

export default Payment