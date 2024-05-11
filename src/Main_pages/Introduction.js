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
          <div className='title'>Về chúng tôi</div>
          <div className='intro_poster' ></div>
          <div className='shop_introduction'>
            <div className='introduction_title'>The 350F</div>
            <div className='introduction_text'>
              <p>Ở tiệm bánh The 350F, mỗi chiếc bánh là một câu chuyện riêng với hơi thở và tinh thần chẳng thể lẫn vào đâu được.</p>
              <p>
                Chúng mình – những người thợ làm bánh thủ công luôn cố gắng tôn trọng tính nguyên bản, tự nhiên và chân thật nhất của từng nguyên liệu. Để dù có những bất toàn trong mỗi thứ riêng rẽ nhưng sau cùng vẫn tạo nên một ổ bánh hài hòa và ngon nhất.
              </p>
              <p>
                Vậy nên, bất cứ khi nào bạn cần những hương vị mộc mạc, tinh tế nhưng chẳng kém phần hấp dẫn, hãy đến với chúng mình. Luôn có rất nhiều những điều đặc biệt đợi bạn khám phá đó nhé!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='contact_information'>
        <div className='contact_title'>Thông tin liên hệ</div>
        <div className='contact_text'>
          <p >Hotline: 1800 8287</p>
          <p>Giải quyết khiếu nại: 0968360709</p>
          <p>Email: contact@the350f.com</p>
          <div style={{ display: `flex`, flexDirection: 'column' }}>
            <div > Chi nhánh 1: 76 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TPHCM</div>
            <div> Chi nhánh 2: 36 Nguyễn Trãi, Phường Bến Thành, Quận 1, TPHCM</div>
            <div> Chi nhánh 1: 07-09 Hoa Phượng, Phường 02, Quận Phú Nhuận, TPHCM</div>
          </div>
          <p>Ngày làm việc: Tất cả các ngày trong tuần</p>
          <p>Giờ làm việc: 09h00 – 21h30</p>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

export default Introduction