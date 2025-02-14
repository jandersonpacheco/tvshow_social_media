import Pagination from "./Pagination"
import styles from "./style.module.css"
import axios from "axios"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import TvShowCard from "./TvShowCard"
import useTvShowStore from "../../../store/tvShowStore.js"

const Home = () => {
    const {search} = useTvShowStore()
    const [trendingTvShows, setTrendingTvShow] = useState([])
    const [popularTvShow, setPopularTvShow] = useState([])
    const [ratingTvShow, setRatingTvShow] = useState([])
    const [searchTvShow, setSearchTvShow] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {trendingPage} = useTvShowStore()
    const {popularPage} = useTvShowStore()
    const {ratingPage} = useTvShowStore()
    const {nextTrendingPage} = useTvShowStore()
    const {nextPopularPage} = useTvShowStore()
    const {nextRatingPage} = useTvShowStore()
    const {prevTrendingPage} = useTvShowStore()
    const {prevPopularPage} = useTvShowStore()
    const {prevRatingPage} = useTvShowStore()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    useEffect(() => {
        // Trending
        axios.get(`https://api.themoviedb.org/3/trending/tv/week?language=pt-BR&page=${trendingPage}`, { headers })
            .then((response) => {
                setTrendingTvShow(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })

        // Popular
        axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=pt-br&page=${popularPage}&sort_by=vote_count.desc`, { headers })
            .then((response) => {
                setPopularTvShow(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })

        // Rating
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=pt-br&page=${ratingPage}`, { headers })
            .then((response) => {
                setRatingTvShow(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }, [trendingPage, popularPage, ratingPage])

    useEffect(() => {
        if (search !== '') {
            axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, { headers })
                .then((response) => {
                    setSearchTvShow(response.data.results)
                    setLoading(false)
                })
                .catch((error) => {
                    setError('Erro ao carregar os dados!')
                    setLoading(false)
                })
        } else {
            setSearchTvShow([])
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
                {search === '' ? (
                    <>
                        {/* Trending Shows */}
                        <div className={styles.mainContent}>
                            <h1 className={styles.mainTitleContent}>Mais Vistas da Semana:</h1>
                                <Pagination
                                    page={trendingPage}
                                    nextPage={nextTrendingPage}
                                    prevPage={prevTrendingPage}
                                />
                        </div>
                        <div className={styles.tvShowCategory}>
                            {trendingTvShows.slice(0, 6).map((trending) => (
                                <Link to={`/home/${trending.id}`} className={styles.tvShowContainer} key={trending.id}>
                                    <TvShowCard show={trending} />
                                </Link>
                            ))}
                        </div>
                
                        {/* Popular Shows */}
                        <div className={styles.mainContent}>
                            <h2 className={styles.mainTitleContent}>Populares:</h2>
                            <Pagination
                                page={popularPage}
                                nextPage={nextPopularPage}
                                prevPage={prevPopularPage}
                            />
                        </div>
                        <div className={styles.tvShowCategory}>
                            {popularTvShow.slice(0, 6).map((popular) => (
                                <Link to={`/home/${popular.id}`} className={styles.tvShowContainer} key={popular.id}>
                                    <TvShowCard show={popular} />
                                </Link>
                            ))}
                        </div>
                
                        {/* Rating Shows */}
                        <div className={styles.mainContent}>
                            <h2 className={styles.mainTitleContent}>Melhores avaliadas:</h2>
                            <Pagination
                                page={ratingPage}
                                nextPage={nextRatingPage}
                                prevPage={prevRatingPage}
                            />
                        </div>
                        <div className={styles.tvShowCategory}>
                            {ratingTvShow.slice(0, 6).map((rating) => (
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
                        {searchTvShow.map((show) => (
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
