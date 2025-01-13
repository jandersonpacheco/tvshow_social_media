import axios from "axios"
import { useEffect, useState } from 'react'

const Home = () => {
    const [tvShows, setTvShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(()=>{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
        }

        axios.get('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', {headers})
        .then((response)=>{
            setTvShows(response.data.results)
            console.log(response.data.results)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
    },[])

    if(loading){
        return <h3>Carregando...</h3>
    }

    if(error){
        return <h3>{error}</h3>
    }

    return (
    <div className='main'>
        {tvShows.length > 0 ? (
            tvShows.map((show) =>(
                <div key={show.id}>
                <h1>{show.name}</h1>
                <p>{show.overview}</p>
                <p>{show.vote_average}</p>
                {show.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        style={{ width: "200px", height: "auto" }}
                    />
)}
                </div>
            ))
        ) : (
            <p>Nenhuma série encontrada.</p>
        )}
    </div>
    )
}

export default Home

