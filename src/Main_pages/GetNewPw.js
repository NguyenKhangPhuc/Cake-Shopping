import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Shopsystem1 from '../Small_elements/Shopsystem1'
import BottomBar from '../Small_elements/BottomBar'
import '../Client/Signin.css'
function GetNewPw() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [code, setCode] = useState(0)
    const [newPw, setNewPw] = useState('')
    const [showCode, setShowCode] = useState(false)
    const [checkCode, setCheckCode] = useState(false)
    const [showPw, setShowPw] = useState(false)
    const [disable, setDisable] = useState(false)

    const Submitting = async () => {
        if (!email) {
            alert('Please enter your email')
        } else {
            await axios.post('http://localhost:5000/find-email', { email })
                .then(res => {
                    if (res.data == 'Wrong email information') {
                        alert('Wrong email information')
                    } else {
                        setShowCode(true)
                        setCheckCode(true)
                    }
                })
                .catch(err => console.log(err))
        }

    }
    const SubmitCode = async () => {
        await axios.post('http://localhost:5000/check-verifyCode', { code })
            .then(res => {
                if (res.data == 'success') {
                    setCheckCode(false)
                    setShowPw(true)
                    setDisable(true)
                    
                } else if (res.data == 'Wrong verification code') {
                    alert('Wrong verification code')
                }
            })
            .catch(err => console.log(err))

    }
    const ResetPw = async () => {
        if (newPw.length < 9) {
            alert('Password too weak')
        } else {
            await axios.post('http://localhost:5000/change-pw', { email, newPw })
                .then(res => {
                    console.log(res)
                    navigate('/Signin')
                })
                .catch(err => console.log(err))
        }

    }
    return (
        <div className='getnewpw_layout'>
            <Shopsystem1 />
            <div className='getpw_center'>
                <div className='reset_pw_form'>
                    <div className='reset_pw_title'>Reset your password</div>
                    {showCode == false && <label>Enter your email address</label>}
                    {showCode == false && <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='reset_pw_email' />}
                    {showCode == true && <label>Check your email to enter the code</label>}
                    {showCode == true && <input type='password' disabled={disable} placeholder='Code' onChange={(e) => setCode(e.target.value)} className='reset_pw_email' />}
                    {showCode == false && <div className='button_position'><button className='submit_button' onClick={() => Submitting()}>Submit</button></div>}
                    {checkCode == true && <div className='button_position'><button className='submit_button' onClick={() => SubmitCode()}>Verify</button></div>}
                    {showPw == true && <label>Enter your new password</label>}
                    {showPw == true && <input type='password' placeholder='password' onChange={(e) => setNewPw(e.target.value)} className='reset_pw_email' />}
                    {showPw == true && <div className='button_position'><button className='submit_button' onClick={() => ResetPw()}>Reset your password</button></div>}
                </div>
            </div>
            <BottomBar />
        </div>
    )
}

export default GetNewPw