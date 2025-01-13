import axios from "axios"
import { useEffect, useState } from 'react'
import {v4 as uuidv4 } from 'uuid'

const Home = () => {
    const [tvShows, setTvShows] = useState([])

    const clientId = '654502a815863970677212a0de2f064945128f3631c8ba3d44e6d5ba354ca974'
    const clientSecret = 'ef36af63897a7323c764c132667356c23cdcfd577d8b0a75ed91cef59107d951'
    
    useEffect(()=>{
        const headers = {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': clientId
        }

        axios.get('https://api.trakt.tv/shows/gangland-undercov/', {headers})
        .then((response)=>{
            setTvShows(response.data)
            console.log(response.data)
        })
        .catch(error => console.error('Erro ao buscar os dados!', error))
    },[])
    
    return (
    <div className='main'>
        <h1>Top 10 Séries Mais Assistidas:</h1>
            <div>
                <h2>{tvShows.title} {tvShows.year}</h2>
            </div>
    </div>
    )
}

export default Home