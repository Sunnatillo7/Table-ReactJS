import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"

export default function TableComponent() {
    const [tableApi, setTableApi] = useState([])
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const getTableApi = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
            .then((res) => {
                setTableApi(res.data)

            })
    }
    useEffect(() => {
        getTableApi()
    }, [tableApi,limit,page])

    const changeOption = (evt)=>{
        setLimit(evt.target.value)
    }
    const decreaseNum =  ()=>{
       if(page !== 1){
        setPage(prev => prev -1)
       }
    }
    return (
        <div>
            <select className='form-control w-[220px] mx-auto mt-4 mb-4' onChange={changeOption}>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
                <option value="7">7</option>
                <option value="6">6</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
            <table className='min-w-full text-center text-sm font-light'>
                <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                    <tr>
                        <th scope="col" class=" px-6 py-4">T/R</th>
                        <th scope="col" class=" px-6 py-4">Name</th>
                        <th scope="col" class=" px-6 py-4">UserName</th>
                        <th scope="col" class=" px-6 py-4">Email</th>
                        <th scope="col" class=" px-6 py-4">Address</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        tableApi.map((item, index) => {
                            return (
                                <tr key={index} className='border-b dark:border-neutral-500'>
                                    <td className='whitespace-nowrap  px-6 py-4 font-medium'>{item.id}</td>
                                    <td className='whitespace-nowrap  px-6 py-4 font-medium'>{item.name}</td>
                                    <td className='whitespace-nowrap  px-6 py-4 font-medium'>{item.username}</td>
                                    <td className='whitespace-nowrap  px-6 py-4 font-medium'>{item.email}</td>
                                    <td className='whitespace-nowrap  px-6 py-4 font-medium'>{item.address.city}</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>

            <div className=' text-center mt-4'>
                <button onClick={decreaseNum} className='btn btn-primary'>Prev page</button>
                <button onClick={()=>setPage(prev=> prev + 1)} className='btn btn-success ml-4'>Next page</button>
            </div>
        </div>
    )
}
