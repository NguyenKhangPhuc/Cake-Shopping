import React from 'react'
import '../Client/Signin.css'
import { useState, useContext } from 'react'
import BottomBar from '../Small_elements/BottomBar'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container } from '../App'
import { useEffect } from 'react'
import { dbUrl } from './Home'
function Signin() {
  let { id, setId } = useContext(Container)
  let { list, setList } = useContext(Container)
  const [switching, setSwitching] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPW, setSignUpPW] = useState('')
  const [username, setUsername] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPW, setSignInPW] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    console.log(id)
    if (id) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [])
  const handleSwitching = () => {
    if (switching == false) {
      setSwitching(true)
    } else {
      setSwitching(false)
    }
  }
  const submitting = async (e) => {
    e.preventDefault()
    if (!username || !signUpEmail || !signUpPW) {
      alert("please fill in the blank")
    } else {
      await axios.post(dbUrl + 'signup', { username, signUpEmail, signUpPW, code })
        .then(result => {
          console.log(result)
          if (result.data == 'Email already in use') {
            alert('Email already in use')
          } else if (result.data == 'Wrong verification code') {
            alert('Wrong verification code')
          } else {
            setSwitching(false)
          }
        })
        .catch(err => { console.log(err) })
    }

  }
  const loginAccount = async (e) => {
    e.preventDefault()
    if (!signInEmail || !signInPW) {
      alert("please fill in the blanks")
    } else {
      await axios.post(dbUrl + 'login', { signInEmail, signInPW })
        .then(async result => {
          console.log(result.data)
          if (result.data.mssg == 'success') {
            id = result?.data.user._id
            setId(id)
            console.log(id)
            window.localStorage.setItem("userId", id)
            await axios.post(dbUrl + 'make-list', { id, list })
              .then(res => {
                console.log(res)
              })
              .catch(err => console.log(err))
            navigate('/')
          } else if (result.data == 'Wpw') {
            alert('Wrong password')
          } else {
            alert('Not existed user')
          }

        })
        .catch(err => console.log(err))

    }
  }
  const signOut = () => {
    setId(null)
    window.localStorage.removeItem("userId")
  }
  const sendCode = async () => {
    if (!username || !signUpEmail || !signUpPW) {
      alert("please fill in the blank")
    } else {
      setSignUp(true)
      await axios.post(dbUrl+'send-code', { signUpEmail })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
  return (
    <div className='signin_big_layout' onClick={() => console.log(list)}>

      <Shopsystem1 />
      <div className='signin_layout'>
        {switching == false ?
          <div className='signin_layout'>
            <div className='signin_title'>Đăng nhập</div>
            {id && <div style={{ color: 'red', fontSize: '1.2em' }}> You have signed in already! </div>}
            {id && <div className='signout_button' onClick={() => signOut()}> Click here to sign out ! </div>}
            <div className='signin_form'>
              <label for='email'>Địa chỉ email*</label>
              <input type='email' id='email' className='email_input' disabled={disabled} placeholder='Email' onChange={(e) => setSignInEmail(e.target.value)} />
              <label for='password'>Mật khẩu</label>
              <input type='password' id='password' className='password_input' placeholder='Password' disabled={disabled} onChange={(e) => setSignInPW(e.target.value)} />
              <div className='forgot_pw' style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer', fontSize: '0.8em' }} onClick={() => navigate('/forget-pw')}>Forgot your password?</div>
              <button className='signin_button' onClick={(e) => loginAccount(e)} disabled={disabled}>Đăng nhập</button>
              <div className='separator'>or</div>
              <button className='create_button' onClick={() => handleSwitching()} disabled={disabled}>Create an account</button>
            </div>

          </div>
          :
          <div className='signin_layout'>
            <div className='signin_title'>Đăng ký</div>
            <div className='signin_form'>
              <label for='username'>Username*</label>
              <input type='text' id='username' placeholder='Username' disabled={disabled} className='username_input' onChange={(e) => setUsername(e.target.value)} />
              <label for='email'>Địa chỉ email</label>
              <input type='email' id='email' className='email_input' disabled={disabled} placeholder='Email' onChange={(e) => setSignUpEmail(e.target.value)} />
              <label for='password'>Mật khẩu</label>
              <input type='password' id='password' className='password_input' disabled={disabled} placeholder='Password' onChange={(e) => setSignUpPW(e.target.value)} />
              {signUp == true && <label for='code'>Verification code to your gmail</label>}
              {signUp == true && <input type='password' id='code' className='password_input' disabled={disabled} placeholder='Password' onChange={(e) => setCode(e.target.value)} />}
              {signUp == false ?
                <button className='signin_button' onClick={(e) => sendCode(e)} disabled={disabled}>Submit</button>
                :
                <button className='signin_button' onClick={(e) => submitting(e)} disabled={disabled}>Create an account</button>
              }
              <div className='separator'>or</div>
              <button className='create_button' onClick={() => handleSwitching()} disabled={disabled}>Đăng nhập</button>
            </div>
          </div>
        }
      </div>
      <BottomBar />
    </div>
  )
}

export default Signin