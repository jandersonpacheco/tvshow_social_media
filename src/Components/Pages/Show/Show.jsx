import styles from "./style.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Show = () => {
    const [tvShowsTmdb, setTvShowsTmdb] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
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
    },[id])

    if(loading){
        return <h3 className={styles.loading}>Carregando...</h3>
    }
    
    if(error){
        return <h3>{error}</h3>
    }
    
    
    return (
        <>
        {tvShowsTmdb ? (
            <div>
                <div className={styles.showDetails}>
                    <div className={styles.showImg}>
                        {tvShowsTmdb.poster_path && (
                            <img
                            src={`https://image.tmdb.org/t/p/w500${tvShowsTmdb.poster_path}`}
                            className={styles.img}
                            />
                        )}
                    </div>
                    <div className={styles.showContent}>
                        <div className={styles.title}>
                            <h1 className={styles.title}>{tvShowsTmdb.name}</h1>
                        </div>
                        <div className={styles.statisticBoxContainer}>
                            <p className={styles.sBvote_average}>{tvShowsTmdb.vote_average}</p>
                            <div className={styles.statisticBox}>
                                <p className={styles.statisticBoxTitle}>Popularidade</p>
                                <p className={styles.sbPopularity}>{tvShowsTmdb.popularity}</p>
                            </div>
                            <div className={styles.statisticBox}>
                                <p className={styles.statisticBoxTitle}>Avaliações</p>
                                <p className={styles.sbVote_count}>{tvShowsTmdb.vote_count}</p>
                            </div>
                        </div>
                        <p className={styles.overview}>{tvShowsTmdb.overview}</p>
                        <p className={styles.genres}>Gênero: {tvShowsTmdb.genres.map(genre => genre.name).join(', ')}</p>
                        <p className={styles.first_air_date}>Lançamento: {tvShowsTmdb.first_air_date}</p>
                        <p className={styles.number_of_seasons}>Temporadas: {tvShowsTmdb.number_of_seasons}</p>
                        <p className={styles.number_of_episodes}>Episódios Programados: {tvShowsTmdb.number_of_episodes}</p>
                        {tvShowsTmdb.last_episode_to_air && tvShowsTmdb.last_episode_to_air.episode_number &&(
                        <p className={styles.episode_number}>Episódios Lançados: {tvShowsTmdb.last_episode_to_air.episode_number}</p>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <p>Série não encontrada.</p>
        )}
    </>  
    )
}

export default Show
