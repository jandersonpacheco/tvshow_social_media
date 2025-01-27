import styles from "./style.module.css"
import axios from "axios"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Home = () => {
    const [tvShowsTrending, setTvShowsTrending] = useState([])
    const [tvShowPopular, setTvShowPopular] = useState([])
    const [tvShowRating, setTvShowRating] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState([1, 1, 1])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    useEffect(()=>{
        //Trending
        axios.get(`https://api.themoviedb.org/3/trending/tv/week?language=pt-BR&page=${page}`, {headers})
            .then((response)=>{
                setTvShowsTrending(response.data.results)
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })

        //Popular
        axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=pt-br&page=1&sort_by=vote_count.desc`, {headers})
        .then((response)=>{
            setTvShowPopular(response.data.results)
            console.log(response.data.results)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })

            //Rating
            axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=pt-br&page=1`, {headers})
            .then((response)=>{
                setTvShowRating(response.data.results)
                console.clear()
                console.log(response.data.results)
                setLoading(false)
            })
            .catch((error)=>{
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    },[page])
    
    function handleSearch(event){
        event.preventDefault()

        setSearch(event.target.value)
        axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, {headers})
        .then((response)=>{
            setTvShowsTrending(response.data.results)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
    }

    function firstPage(){        
        setPage(1)
    }

    function previousPage(){
        if(page <= 1)
            return
        
        setPage(page - 1)
        console.log(page)
    }

    function nextPage(index){
        setPage((prevPage) => {
            const newPage = [...prevPage]
            newPage[index] += 1
        })
    }

    function lastPage(){        
        setPage(500)
    }

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
            <input type="text" id="search" placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
            <button id="searchBtn" disabled>Pesquisar</button>
        </form>
        </nav>
        <div className={styles.mainContainer}>
                {search === "" ? (
                    <>
                        {/* Trending Shows */}
                        <div className={styles.mainTitleContainer}>
                            <h1 className={styles.mainTitleContent}>Mais Vistas da Semana:</h1>
                        </div>
                        <div className={styles.pagesContainter}>
                            <h3>Página: {page[0]}</h3>
                            <button type="text" onClick={() => firstPage(0)}>{'<<'}</button>
                            <button type="text" onClick={() => previousPage(0)}>{'<'}</button>
                            <button type="text" onClick={() => nextPage(0)}>{'>'}</button>
                            <button type="text" onClick={() => lastPage(0)}>{'>>'}</button>
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowsTrending.slice(0, 6).map((trending) => (
                                <Link to={`/home/${trending.id}`} className={styles.tvShowContainer} key={trending.id}>
                                    {trending.poster_path && (
                                        <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}/>
                                    )}
                                    <h2 className={styles.title}>{trending.name}</h2>
                                </Link>
                            ))}
                        </div>
                        
                        {/* Popular Shows */}
                        <div className={styles.mainTitleContainer}>
                            <h2 className={styles.mainTitleContent}>Populares:</h2>
                        </div>
                        <div className={styles.pagesContainter}>
                            <h3>Página: {page[1]}</h3>
                            <button type="text" value={page} onClick={() => firstPage(1)}>{'<<'}</button>
                            <button type="text" value={page} onClick={() => previousPage(1)}>{'<'}</button>
                            <button type="text" value={page} onClick={() => nextPage(1)}>{'>'}</button>
                            <button type="text" value={page} onClick={() => lastPage(1)}>{'>>'}</button>
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowPopular.slice(0, 6).map((popular) => (
                                <Link to={`/home/${popular.id}`} className={styles.tvShowContainer} key={popular.id}>
                                    <div className={styles.tvShowContainer}>
                                        {popular.poster_path && (
                                            <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}/>
                                        )}
                                        <h2 className={styles.title}>{popular.name}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Rating Shows */}
                        <div className={styles.mainTitleContainer}>
                            <h2 className={styles.mainTitleContent}>Melhores avaliadas:</h2>
                        </div>
                        <div className={styles.pagesContainter}>
                            <h3>Página: {page[2]}</h3>
                            <button type="text" value={page} onClick={() => firstPage(2)}>{'<<'}</button>
                            <button type="text" value={page} onClick={() => previousPage(2)}>{'<'}</button>
                            <button type="text" value={page} onClick={() => nextPage(2)}>{'>'}</button>
                            <button type="text" value={page} onClick={() => lastPage(2)}>{'>>'}</button>
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowRating.slice(0, 6).map((rating) => (
                                <Link to={`/home/${rating.id}`} className={styles.tvShowContainer} key={rating.id}>
                                    <div className={styles.tvShowContainer}>
                                        {rating.poster_path && (
                                        <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${rating.poster_path}`}/>
                            )}
                                        <h2 className={styles.title}>{rating.name}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.mainTitleContainer}>
                            <h2 className={styles.mainTitleContent}>Resultados por: {search}</h2>
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowsTrending.map((searchShow) => (
                                <Link to={`/home/${searchShow.id}`} key={searchShow.id}>
                                    <div className={styles.tvShowContainer}>
                                        {searchShow.poster_path && (
                                            <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${searchShow.poster_path}`} />
                                        )}
                                        <h2 className={styles.title}>{searchShow.name}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Home

