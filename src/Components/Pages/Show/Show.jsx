import TvShowDetails from "./TvShowDetails.jsx"
import TvShowCard from "../Home/TvShowCard.jsx"
import styles from "./style.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import useTvShowStore from "../../../store/tvShowStore.js"

const Show = () => {
    const {search} = useTvShowStore()
    const [tvShowSearch, setTvShowSearch] = useState([])
    const [tvShowsTmdb, setTvShowsTmdb] = useState(null)
    const [tvShowsVideo, setTvShowsVideo] = useState(null)
    const [tvShowsBackdrop, setTvShowsBackdrop] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    useEffect(() => {
        if (search !== '') {
            axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, { headers })
                .then((response) => {
                    setTvShowSearch(response.data.results)
                    setLoading(false)
                    console.log(tvShowSearch)
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

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-br`, {headers})
        .then((response)=>{
            setTvShowsTmdb(response.data)
            console.clear()
            console.log(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=pt-br`, {headers})
        .then((response)=>{
            setTvShowsVideo(response.data)
            console.clear()
            console.log(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os videos!')
            setLoading(false)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}/images?include_image`, {headers})
        .then((response)=>{
            setTvShowsBackdrop(response.data)
            console.clear()
            console.log(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os videos!')
            setLoading(false)
        })
    },[id])
    

    if(loading){
        return <h3 className={styles.loading}>Carregando...</h3>
    }
    
    if(error){
        return <h3>{error}</h3>
    }
    
    
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
        </>       
    )
}

export default Show
