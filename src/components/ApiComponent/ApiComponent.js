import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react'

export default function ApiComponent() {
    const [coments, setComents] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(15)
    const getApi = () => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`).then((res) => {
            setComents(res.data)
            console.log(res.data)
        })
    }
    useEffect(() => {
        getApi()
    }, [page, limit])

    const decreasePage = () => {
        if (page !== 1) {
            setPage(prev => prev - 1)
        }
    }
    const changeOption = (evt) => {
        setLimit(evt.target.value)
        console.log(evt.target.value)
    }
    return (
        <div className='text-center'>

            <div className="col-md-3 mx-auto">
                <select className='form-control mx-auto' onChange={changeOption}>
                    <option value="15">15</option>
                    <option value="13">13</option>
                    <option value="11">11</option>
                    <option value="9">9</option>
                    <option value="5">5</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </div>

            {
                coments.map((item, index) => {
                    return <div className='card' key={index}>
                        <div className="card-header">{item.id + " " + item.name}</div>
                    </div>
                })
            }


            <button onClick={decreasePage} className='btn btn-primary mt-4'>Prev page</button>
            <span>{page}</span>
            <button onClick={() => setPage((prev) => prev + 1)} className='btn btn-success mt-4 ml-3'>Next page</button>
            {
                console.log(page)
            }
        </div>
    )
}
