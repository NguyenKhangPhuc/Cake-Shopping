import React from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import '../Client/Delivery.css'
import BottomBar from '../Small_elements/BottomBar'
import ContactBoard from '../Small_elements/ContactBoard'
function Delivery() {
  return (
    <div className='delivery_big_lay'>
      <div className='delivery_lay_1'>
        <Shopsystem1 />
        <div className='delivery_center'>
          <div className='delivery_title'> CHÍNH SÁCH GIAO HÀNG</div>
          <div className='delivery_policies'>
            <p>– Chúng tôi giao hàng tận nơi có thu phí. Chi phí giao hàng sẽ được thông báo khi quý khách nhập chính xác địa chỉ nhận hàng trong lúc đặt hàng.</p>
            <p>– Chúng tôi sẽ cố gắng giao đúng tầm khung giờ có trừ hao 60-90 phút mà quý khách yêu cầu. Tuy nhiên, vì các lí do khách quan như thời tiết xấu, kẹt xe, sự cố trên đường, … nên shipper có thể đến trễ hơn. Chúng tôi sẽ thông báo ngay khi có thể.</p>
            <p>– Trước khi giao chúng tôi sẽ gọi xác nhận đơn hàng, gọi được shipper mới giao đi, mọi thay đổi và cập nhật đơn đặt hàng vui lòng cung cấp ở cuộc gọi này để được hỗ trợ nhanh chóng.</p>
            <p> – Quý khách hàng vui lòng giữ liên lạc vì shipper khi giao đến chỉ có thể chờ tối đa 20 phút.</p>
            <p>– Quý khách hàng nhận bánh nếu chưa ăn liền thì cần bảo quản ở tủ lạnh ngăn mát. Bánh lạnh nếu để quá lâu ở nhiệt độ phòng sẽ bị chảy và mất kết cấu ban đầu.</p>
            <p>– Khi nhận bánh, vui lòng kiểm tra bánh trước khi nhận, nếu bánh có dấu hiệu đổ vỡ thì TUYỆT ĐỐI KHÔNG NHẬN bánh và liên hệ Hotline 1800 8287 để được hỗ trợ xử lý ngay lập tức.
            </p>
          </div>
          <ContactBoard/>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

export default Delivery