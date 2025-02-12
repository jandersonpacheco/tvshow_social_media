import Pagination from "./Pagination"
import styles from "./style.module.css"
import axios from "axios"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import TvShowCard from "./TvShowCard"

const Home = ({search, onSearch}) => {
    const [tvShowsTrending, setTvShowsTrending] = useState([])
    const [tvShowPopular, setTvShowPopular] = useState([])
    const [tvShowRating, setTvShowRating] = useState([])
    const [tvShowSearch, setTvShowSearch] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pageTrending, setPageTrending] = useState(1)
    const [pagePopular, setPagePopular] = useState(1)
    const [pageRating, setPageRating] = useState(1)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    useEffect(() => {
        // Trending
        axios.get(`https://api.themoviedb.org/3/trending/tv/week?language=pt-BR&page=${pageTrending}`, { headers })
            .then((response) => {
                setTvShowsTrending(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })

        // Popular
        axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=pt-br&page=${pagePopular}&sort_by=vote_count.desc`, { headers })
            .then((response) => {
                setTvShowPopular(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })

        // Rating
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=pt-br&page=${pageRating}`, { headers })
            .then((response) => {
                setTvShowRating(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }, [pageTrending, pagePopular, pageRating])

    const nextPageTrending = () => setPageTrending(pageTrending + 1)
    const prevPageTrending = () => setPageTrending(Math.max(pageTrending - 1, 1))

    const nextPagePopular = () => setPagePopular(pagePopular + 1)
    const prevPagePopular = () => setPagePopular(Math.max(pagePopular - 1, 1))

    const nextPageRating = () => setPageRating(pageRating + 1)
    const prevPageRating = () => setPageRating(Math.max(pageRating - 1, 1))

    useEffect(() => {
        if (search !== '') {
            axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, { headers })
                .then((response) => {
                    setTvShowSearch(response.data.results)
                    setLoading(false)
                })
                .catch((error) => {
                    setError('Erro ao carregar os dados!')
                    setLoading(false)
                })
        } else {
            setTvShowSearch([])
        }
    }, [search])

    if (loading) {
        return <h3 className={styles.loading}>Carregando...</h3>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    return (
        <div className={styles.header}>
            <div className={styles.mainContainer}>
                {search !== '' ? (
                    <>
                        {/* Trending Shows */}
                        <div className={styles.mainContent}>
                            <h1 className={styles.mainTitleContent}>Mais Vistas da Semana:</h1>
                                <Pagination
                                    page={pageTrending}
                                    nextPage={nextPageTrending}
                                    prevPage={prevPageTrending}
                                />
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowsTrending.slice(0, 6).map((trending) => (
                                <Link to={`/home/${trending.id}`} className={styles.tvShowContainer} key={trending.id}>
                                    <TvShowCard show={trending} />
                                </Link>
                            ))}
                        </div>
                
                        {/* Popular Shows */}
                        <div className={styles.mainContent}>
                            <h2 className={styles.mainTitleContent}>Populares:</h2>
                            <Pagination
                                page={pagePopular}
                                nextPage={nextPagePopular}
                                prevPage={prevPagePopular}
                            />
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowPopular.slice(0, 6).map((popular) => (
                                <Link to={`/home/${popular.id}`} className={styles.tvShowContainer} key={popular.id}>
                                    <TvShowCard show={popular} />
                                </Link>
                            ))}
                        </div>
                
                        {/* Rating Shows */}
                        <div className={styles.mainContent}>
                            <h2 className={styles.mainTitleContent}>Melhores avaliadas:</h2>
                            <Pagination
                                page={pageRating}
                                nextPage={nextPageRating}
                                prevPage={prevPageRating}
                            />
                        </div>
                        <div className={styles.tvShowCategory}>
                            {tvShowRating.slice(0, 6).map((rating) => (
                                <Link to={`/home/${rating.id}`} className={styles.tvShowContainer} key={rating.id}>
                                    <TvShowCard show={rating} />
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
                        {tvShowSearch.map((show) => (
                            <Link to={`/home/${show.id}`} key={show.id}>
                                <TvShowCard show={show} />
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
