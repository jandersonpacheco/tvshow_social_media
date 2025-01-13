import axios from "axios"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Home = () => {
    const [tvShows, setTvShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }
    
    function handleSearch(event){
        event.preventDefault()
        if(search === ''){
            return axios.get('https://api.themoviedb.org/3/trending/tv/week?language=pt-BR', {headers})
            .then((response)=>{
                setTvShows(response.data.results)
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
        }

        axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, {headers})
        .then((response)=>{
            setTvShows(response.data.results)
            console.log(response.data.results)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
        setSearch('')
    }
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/trending/tv/week?language=pt-BR', {headers})
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
    <div className="main">
        <nav>
        <h1><Link to="/profile">Perfil</Link></h1>
        <form onSubmit={handleSearch}>
            <input type="text" id="search" placeholder="Procure por uma série" value={search} onChange={(event) => setSearch(event.target.value)}></input>
            <button id="searchBtn">Pesquisar</button>
        </form>
        </nav>
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
