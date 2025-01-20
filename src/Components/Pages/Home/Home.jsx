import styles from "./style.module.css"
import axios from "axios"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Home = () => {
    const [tvShowsTmdb, setTvShowsTmdb] = useState([])
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
                    setTvShowsTmdb(response.data.results)
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
                setTvShowsTmdb(response.data.results)
                const sortedTvShows = response.data.results.sort((a,b)=> b.popularity - a.popularity)
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
                setTvShowsTmdb(response.data.results)
                const sortedTvShows = response.data.results.sort((a,b)=> b.popularity - a.popularity)
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
                setTvShowsTmdb(response.data.results)
                const sortedTvShows = response.data.results.sort((a,b)=> b.note_avarage - a.note_avarage)
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
                setTvShowsTmdb(response.data.results)
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

        setFill('trending')

        setSearch(event.target.value)

        if(search === ''){
            
            return axios.get('https://api.themoviedb.org/3/trending/tv/week?language=pt-BR', {headers})
            .then((response)=>{
                setTvShowsTmdb(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
        }

        setSearch(event.target.value)
        axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, {headers})
        .then((response)=>{
            setTvShowsTmdb(response.data.results)
            setLoading(false)
            setFill('searching')
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
    }

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/trending/tv/week?language=pt-BR', {headers})
            .then((response)=>{
                setTvShowsTmdb(response.data.results)
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    },[])

    if(loading){
        return <h3 className={styles.loading}>Carregando...</h3>
    }

    if(error){
        return <h3>{error}</h3>
    }

    return (
    <div className={styles.header}>
        <nav className={styles.nav}>
        <form className={styles.selectForm}>
            <select type="select" name="topic" id="topic" value={fill} onChange={(event) => {handleFill(event)}}>
                <option value="trending" >Mais Assistidas da Semana</option>
                <option value="airingToday">Lançamentos do Dia</option>
                <option value="onTheAir">No Ar</option>
                <option value="popular">Populares</option>
                <option value="topRated">Melhores Avaliadas</option>
                <option value="searching" disabled>Busca</option>
            </select>
            <input type="text" id="search" placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
            <button id="searchBtn" >Pesquisar</button>
        </form>
        </nav>
            <div className={styles.container}>
                {tvShowsTmdb.length > 0 ? (                  
                    tvShowsTmdb.map((show) =>(
                        <Link to={`/home/${show.id}`} key={show.id}>
                            <div
                                className={styles.tvShowContainer}
                                >
                                {show.poster_path && (
                                    <img
                                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                    className={styles.img}
                                    />
                                )}
                                <h2 className={styles.title}>{show.name}</h2>
                                <p className={styles.description}>- Nota {show.vote_average}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Nenhuma série encontrada.</p>
                )}
            </div>
    </div>
    )
}

export default Home

/*
    const [tvShowsTrakt, setTvShowsTrakt] = useState([])
    const traktHeaders = {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': 'ef36af63897a7323c764c132667356c23cdcfd577d8b0a75ed91cef59107d951'
    }*/