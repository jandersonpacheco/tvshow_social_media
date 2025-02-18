import TvShowDetails from "./TvShowDetails.jsx"
import TvShowCard from "../Home/TvShowCard.jsx"
import Cast from "./Cast.jsx"
import SeasonDetails from "./SeasonDetails.jsx"
import styles from "./show.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import useTvShowStore from "../../../store/tvShowStore.js"
import Pagination from "../Home/Pagination.jsx"
import useErrorAndLoadStore from "../../../store/errorAndLoadStore.js"

const Show = () => {
    const {search, castPage, nextCastPage, prevCastPage} = useTvShowStore()
    const [tvShowSearch, setTvShowSearch] = useState([])
    const [tvShowsTmdb, setTvShowsTmdb] = useState([])
    const [tvShowsVideo, setTvShowsVideo] = useState([])
    const [tvShowsBackdrop, setTvShowsBackdrop] = useState([])
    const [castInfo, setCastInfo] = useState([])
    const {error, setError, loading, setLoading} = useErrorAndLoadStore()
    const {id} = useParams()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    //Get Search
    useEffect(() => {
        if (search !== '') {
            axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, {headers})
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

    function cleanInput(){
        search = ''
    }

    //Get Cast
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits`, {headers})
            .then((response) => {
                setCastInfo(response.data.cast)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }, [search])

    const paginatedCast = castInfo

    useEffect(()=>{
        setLoading(true)
        //Get TV Show
        axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-br`, {headers})
        .then((response)=>{
            setTvShowsTmdb(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })

        //Get Trailer
        axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=pt-br`, {headers})
        .then((response)=>{
            setTvShowsVideo(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os videos!')
            setLoading(false)
        })
        //Get Backdrop
        axios.get(`https://api.themoviedb.org/3/tv/${id}/images?include_image`, {headers})
        .then((response)=>{
            setTvShowsBackdrop(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar o backdrop!')
            setLoading(false)
        })     
    },[id])
    
    if(loading) return <h3 className={styles.loading}>Carregando...</h3>
    if(error) return <h3>{error}</h3>

    return (
        <>
            {tvShowsTmdb && tvShowsVideo && search === '' ? (
                <div>
                    <TvShowDetails
                        show={tvShowsTmdb}
                        showVideo={tvShowsVideo}
                        tvShowBackdrop={tvShowsBackdrop}
                    />
                </div>
            ) : (
                <>
                    <div className={styles.mainTitleContainer}>
                        <h2 className={styles.mainTitleContent}>Resultados para: {search}</h2>
                    </div>
                    <div className={styles.tvShowCategory}>
                        {tvShowSearch.map((show) => (
                            <Link to={`/home/${show.id}`} key={show.id} onClick={cleanInput}>
                                <TvShowCard show={show}/>
                            </Link>
                        ))}
                    </div>
                </>
            )}
            <div className={styles.pageBtnContainer}>
                <h1 className={styles.castTitle}>Elenco da Série</h1>
                <Pagination
                    page={castPage}
                    nextPage={nextCastPage}
                    prevPage={prevCastPage}
                />
            </div>
            <div className={styles.castCategory}>
                {paginatedCast.slice((castPage - 1) * 10, castPage * 10).map((cast) =>(
                    <div className={styles.castConfig} key={cast.id}>
                        <Cast cast={cast}/>
                    </div>
                ))}
            </div>
            <div className={styles.seasonDetails}>
                <h3 className={styles.seasonDetailsTitle}>Episódios:</h3>
            </div>
            <div className={styles.seasonBtn}>
                {tvShowsTmdb.seasons && tvShowsTmdb.seasons.map((season) => (
                    <SeasonDetails key={season.id} season={season} id={id}/>
                ))}
            </div>
        </>       
    )
}

export default Show
