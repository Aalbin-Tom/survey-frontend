import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function UserHome() {
    const [surveys, setSurveys] = useState([])
    const [formdata, setformData] = useState("")
    const [ans, setAns] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let userid = user._id


    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     await axios.post('/survey', { formdata, userid })
    //     // setError(data.response.data.message)
    // }


    // const handleChange = (e) => {
    //   e.preventDefault()
    //     const name = e.target.name
    //     const value = e.target.value
    //     setformData({ ...formdata, [name]: value })
    // }

    const survey = async () => {
        const surveys = await axios.get('/getsurvey')
        setSurveys(surveys.data.survey)
    }
   
    const ondata = (data, anser) => {
        console.log(anser)
        setformData(data)
        setAns(anser)
    }


    useEffect(() => {
        survey()
        let user = localStorage.getItem('userInfo')
        if (user) {
            navigate('/home')
        } else {
            navigate('/')
        }
    }, [])


    const hsub = (e, _id) => {
        try {
            e.preventDefault()
            axios.post('/survey', { ans, formdata, _id, userid })
        } catch(error) {
            setError(error.response.data.message) 
        }
    }
 console.log(error);
    const logout = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <div className=''>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full"
                    onClick={logout} to="/admin/login">Logout</button>
            </div>
            <div className='h-auto flex gap-14 p-7'>
                {
                    surveys.map((data, index) => (
                        <div key={index} className='bg-slate-400 rounded-xl'>
                            <span> {error}</span>
                            <div className='font-bold'>Question: {data.q1} </div>
                            <form onSubmit={(e) => { hsub(e, data._id) }}>
                                <div className='flex justify-between w-60'>

                                    <input type="radio" name="ans" value={'option1'} onChange={() => { ondata('option1', data.option1.a1) }} />
                                    <label>{data.option1.a1} </label>

                                    <input type="radio" name="ans" value={"option2"} onChange={() => { ondata('option2', data.option2.a2) }} />
                                    <label>{data.option2.a2} </label>

                                </div>
                                <div className='flex justify-between w-60'>

                                    <input type="radio" name="ans" value="option3" onChange={() => { ondata('option3', data.option3.a3) }} />
                                    <label>{data.option3.a3} </label>

                                    <input type="radio" name="ans" value="option4" onChange={() => { ondata('option4', data.option4.a4) }} />
                                    <label>{data.option4.a4} </label>

                                </div>
                                <button >Finish</button>
                            </form>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserHome
