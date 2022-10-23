import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminHome() {
    const initialValues = { q1: "", a1: "", a2: "",a3:"" , a4: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [message, setMessages] = useState('')
    const [surveys, setSurveys] = useState([])
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }



    const logout = () => {

        localStorage.removeItem("adminInfo");
        navigate("/admin/login");
    };
    const handleSubmit = async (e) => {
       
        e.preventDefault()
 console.log("hiiiiiiiiii");
        if (formValues.q1.length === 0 && formValues.a1.length === 0 && formValues.a2.length === 0 && formValues.a3.length === 0 && formValues.a4.length === 0) {
            setError("true")  
            
        }
      console.log(error);
        if (formValues.q1.length !== 0 && formValues.a1.length !== 0 && formValues.a2.length !== 0 && formValues.a3.length !== 0 && formValues.a4.length !== 0) {
            try {
                await axios.post('/admin/add-survey', formValues)

            } catch (error) {
                setMessages(error.response.data.message)
                
            }

        }

        setFormValues(initialValues)

    }
console.log(error);
    const survey = async () => {
        const surveys = await axios.get('/admin/survey')
        setSurveys(surveys.data.survey)
    }
    useEffect(() => {
        survey()
        let user = localStorage.getItem('adminInfo')
        if (user) {
            navigate('/admin')
        }else{
            navigate('/admin/login')
        }
    }, [])
    // console.log(surveys.data);
    return (
        <div>
            
            <div className='bg-gradient-to-r from-violet-500 to-cyan-500 flex flex-col justify-center h-screen'>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full"
                      onClick={logout} to="/admin/login">Logout</button>
                </div>
                <form onSubmit={handleSubmit}
                    className='shadow-black max-w-[400px] w-full mx-auto bg-white p-8  rounded-3xl'

                >
                    <h1 className='font-bold text-center text-2xl '> ADD New Survey</h1>

                    <span className='flex font-bold justify-center text-red-500'>{message}</span>

                    <div className='flex flex-col text-grey-500 py-2'>
                        <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                            placeholder='question1'
                            type="text"
                            name='q1'
                            value={formValues.q1}
                            onChange={handleChange}
                        /><span>{error && formValues.q1.length <= 0 ?
                            <label style={{ color: "red" }} > Cannot be empty </label> : ""}</span>



                        <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                            placeholder='option1'
                            type="text"
                            name='a1'
                            value={formValues.a1}
                            onChange={handleChange}
                        />
                        <span>{error && formValues.a1.length <= 0 ?
                            <label style={{ color: "red" }} >Cannot be empty </label> : ""}</span>



                        <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                            placeholder='option2'
                            type="text"
                            name='a2'
                            value={formValues.a2}
                            onChange={handleChange} />
                        <span>{error && formValues.a2.length <= 0 ?
                            <label style={{ color: "red" }} >Cannot be empty </label> : ""}</span>



                        <input className='rounded-full bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                            placeholder='option3'
                            type="text"
                            name='a3'
                            value={formValues.a3}
                            onChange={handleChange}
                        />
                        <span>{error && formValues.a3.length <= 0 ?
                            <label style={{ color: "red" }} >Cannot be empty </label> : ""}</span>



                        <input className='rounded-full bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                            placeholder='option4'
                            type="text"
                            name='a4'
                            value={formValues.a4}
                            onChange={handleChange}
                        />
                        <span>{error && formValues.a4.length <= 0 ?
                            <label style={{ color: "red" }} >Cannot be empty</label> : ""}</span>
                    </div>

                    {/* <div className='flex justify-between text-gray-500 py-2'>
                            </div> */}


                    <button className=' w-full inline-block px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                        ADD
                    </button>
                </form>
                <br />
                <div className='h-auto flex justify-start gap-5 '>
                    {
                        surveys.map((data, index) => (

                            <div key={index} className='rounded-lg bg-amber-200 w-56'>
                                <div className='font-semibold'>
                                    {index + 1}:{data.q1}
                                </div>
                                <br />
                                <div className='flex justify-between' >
                                    <p> {data.option1.a1}  {data.option1.count} </p>
                                    <p> {data.option2.a2}  {data.option2.count}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p> {data.option3.a3} {data.option3.count}</p>
                                    <p> {data.option4.a4} {data.option4.count}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminHome
