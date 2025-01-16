import styles from "./style.module.css"
import axios from "axios"
import { useEffect, useState } from 'react'

const Home = () => {
    const [tvShows, setTvShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [fill, setFill] = useState('')


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }
    
    function handleFill(event){
        event.preventDefault()

        const selectedFill = event.target.value
        setFill(selectedFill)

        switch(selectedFill){
            case "trending":
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
            break
            case "airingToday":
            return axios.get('https://api.themoviedb.org/3/tv/airing_today?language=pt-br&page=1', {headers})
            .then((response)=>{
                setTvShows(response.data.results)
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
            break
        case "onTheAir":
            return axios.get('https://api.themoviedb.org/3/tv/on_the_air?language=pt-br&page=1', {headers})
            .then((response)=>{
                setTvShows(response.data.results)
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
        break
        case "popular":
            return axios.get('https://api.themoviedb.org/3/tv/popular?language=pt-br&page=1', {headers})
            .then((response)=>{
                setTvShows(response.data.results)
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
        break
        case "topRated":
            return axios.get('https://api.themoviedb.org/3/tv/top_rated?language=pt-br&page=1', {headers})
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
    <div className={styles.header}>
        <nav className={styles.nav}>
        <form className={styles.selectForm} onSubmit={handleSearch}>
            <select type="select" name="topic" id="topic" onChange={(event) => {handleFill(event)}}>
                <option value="trending">Mais Assistidas da Semana</option>
                <option value="airingToday">Lançamentos do Dia</option>
                <option value="onTheAir">No Ar</option>
                <option value="popular">Populares</option>
                <option value="topRated">Melhores Avaliadas</option>
            </select>
            <input type="text" id="search" placeholder="Procure por uma série" value={search} onChange={(event) => setSearch(event.target.value)}></input>
            <button id="searchBtn" >Pesquisar</button>
        </form>
        <h1> {{search} && (
            'Séries mais vistas da semana!'
        )}</h1>
        </nav>
        <div className={styles.container}>
            {tvShows.length > 0 ? (
                tvShows.map((show) =>(
                    <div
                        className={styles.tvShowContainer}
                        key={show.id}>
                    {show.poster_path && (
                        <img
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        className={styles.img}
                        />
                    )}
                    <h2 className={styles.title}>{show.name}</h2>
                    <p className={styles.description}>- Nota {show.vote_average}</p>
                    </div>
                ))
            ) : (
                <p>Nenhuma série encontrada.</p>
            )}
        </div>
    </div>
    )
}

export default Home