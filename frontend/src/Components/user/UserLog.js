import React, { useEffect, useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserLog() {
    const initialValues = {name:"", email: "", password: "" };
    const [emailerr, setEmailerr] = useState('')
    const [node, setNode] = useState('')
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        setEmailerr(regEx)

        if (!regEx.test(formValues.email) && formValues.name.length === 0 && formValues.email.length === 0 && formValues.password.length === 0) {
            setError("true")
        }


        if (regEx.test(formValues.email) && formValues.email.length !== 0 && formValues.password.length !== 0 && formValues.name.length !== 0) {
            try {
                console.log("hiiiiiiiii");
                const { data } = await axios.post('https://surveys-application.herokuapp.com/login', formValues)
                localStorage.setItem('userInfo', JSON.stringify(data))
                navigate('/home')
            } catch (error) {
                setNode(error.response.data.message)
                console.log(error);
            }

        }
    }
    useEffect(() => {
        let user = localStorage.getItem('userInfo')
        if (user) {
            navigate('/home')
        }else(
            navigate('/')
        )
    },[])

    return (
        <div className='bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center h-screen'>
            <form onSubmit={handleSubmit} className='shadow-black max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'

            >
                <h1 className='font-bold text-center text-2xl '> USER LOGIN</h1>
                <br />
                <span className='flex justify-center font-bold text-red-500'>{node}</span>

                <div className='flex flex-col text-grey-500 py-2'>

                    <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                        id="name"
                        type="text"
                        name='name'
                        onChange={handleChange}
                        placeholder='Enter Your Name'
                    />

                    <span className=' text-red-500'>{error && !emailerr.test(formValues.email) ?
                        'Enter a Name' : ""}
                    </span>
                </div>

                <div className='flex flex-col text-grey-500 py-2'>

                    <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                        id="email"
                        type="email"
                        name='email'
                        onChange={handleChange}
                        placeholder='Enter Your Email'
                    />

                    <span className=' text-red-500'>{error && !emailerr.test(formValues.email) ?
                        'Enter a valid Email' : ""}
                    </span>
                </div>



                <div className='flex flex-col text-grey-500 py-2'>
                    <input className='rounded-full bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                        onChange={handleChange}
                        name='password'
                        id="password"
                        type="password"
                        placeholder='Enter Your Password'
                    />  <span>{error && formValues.password.length <= 0 ?
                        <label style={{ color: "red" }} >Password cannot be empty </label> : ""}</span>
                    <br />

                </div>



                <button type='submit' className=' w-full inline-block px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                    Login
                </button>
                <NavLink to='/admin/login'>
               Admin Login 
                </NavLink>
                <br />
                <br />


            </form>
        </div>
    )
}

export default UserLog
