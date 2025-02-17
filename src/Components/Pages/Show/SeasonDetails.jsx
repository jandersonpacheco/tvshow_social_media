import { useEffect, useState } from 'react'
import styles from './show.module.css'
import axios from 'axios'
import useErrorAndLoadStore from '../../../store/errorAndLoadStore'
import { useParams } from 'react-router-dom'

const SeasonDetails = ({season}) => {
    const [seasonDetail, setSeasonDetail] = useState([])
    const [seasonNumber, setSeasonNumber] = useState(1)
    const {error, setError, loading, setLoading} = useErrorAndLoadStore()
    const {id} = useParams()

    if(season.name === 'Especiais') return null

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=pt-br`, {headers})
            .then((response) => {
                setSeasonDetail(response.data.episodes)
                console.log(response.data.episodes)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }, [id, seasonNumber])

    if(loading) return <h3 className={styles.loading}>Carregando...</h3>
    if(error) return <h3>{error}</h3>

    return(
        <div className={styles.seasonDetails}>
            <div className={styles.seasonBtn}>
                <button className={styles.seasonName} id={season.season_number}>Temporada {season.season_number}</button>
            </div>
            <div className={styles.episodeContainer}>
                {seasonDetail && seasonDetail.map((episode) => (
                    <div className={styles.episodeInfo} key={episode.id}>
                        <div className={styles.episodeImg}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                className={styles.img}
                            />
                        </div>
                        <div className={styles.episodeInfo}>
                            <h3>{episode.name}</h3>
                            <p>{}</p>
                            <p>{episode.overview}</p>
                        </div>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default SeasonDetails