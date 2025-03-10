import { useEffect, useState } from 'react'
import styles from './show.module.css'
import axios from 'axios'
import useErrorAndLoadStore from '../../../store/errorAndLoadStore'
import { useParams } from 'react-router-dom'

const SeasonDetails = ({seasons}) => {
    const [seasonDetail, setSeasonDetail] = useState(null)
    const [seasonInfo, setSeasonInfo] = useState([])
    const {error, setError, loading, setLoading} = useErrorAndLoadStore()
    const {id} = useParams()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    if (!seasons || seasons.length === 0) return <p>Nenhuma temporada disponível.</p>


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-br`, {headers})
            .then((response) => {
                setSeasonInfo(response.data.seasons)

                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }, [id])

        useEffect(() => {
            axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-br`, {headers})
                .then((response) => {
                    setSeasonInfo(response.data.seasons)

                    setLoading(false)
                })
                .catch((error) => {
                    setError('Erro ao carregar os dados!')
                    setLoading(false)
                })
        }, [id])

    if(seasonDetail === null){
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/1?language=pt-br`, {headers})
            .then((response) => {
                setSeasonDetail(response.data.episodes)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }

    function seasonChanging(seasonNumber){
        setSeasonDetail([])

        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=pt-br`, {headers})
            .then((response) => {
                setSeasonDetail(response.data.episodes)
                setLoading(false)
            })
            .catch((error) => {
                setError('Erro ao carregar os dados!')
                setLoading(false)
            })
    }

    if(loading) return <h3 className={styles.loading}>Carregando...</h3>
    if(error) return <h3>{error}</h3>

    return(
        <div className={styles.seasonDetails}>
            <div className={styles.seasonSelect}>
                <select onChange={(e) => seasonChanging(e.target.value)} className={styles.seasonDropdown}>
                    <option disabled value="">Selecione uma Temporada</option>
                    {seasonInfo && seasonInfo.map((seasonNum) => (
                        seasonNum.name !== 'Especiais' && (
                            <option key={seasonNum.season_number} value={seasonNum.season_number}>
                                Temporada {seasonNum.season_number}
                            </option>
                        )
                    ))}
                </select>
            </div>

            <div className={styles.episodeContainer}>
                {seasonDetail && seasonDetail.map((episode) => (
                    <div className={styles.epContainer} key={episode.id}>
                        <div className={styles.epImgContainer}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                className={styles.epImg}
                            />
                        </div>
                        <div className={styles.ep}>
                            <h3 className={styles.epTitle}>
                                {episode.season_number > 9 ? `S${episode.season_number}` : `S0${episode.season_number}`}
                                {episode.episode_number > 9 ? `S${episode.episode_number}` : `S0${episode.episode_number}`} - {episode.name}
                            </h3>
                            <p className={styles.epInfo}>{episode.air_date ? episode.air_date.split('-').reverse().join('/'): ''}</p>
                            <p className={styles.epInfo}>{episode.overview ? episode.overview : 'Descrição indisponível.'}</p>
                            <p className={styles.epVote}>{episode.vote_count > 0 ? `Nota: ${episode.vote_average.toFixed(1)}/10 (${episode.vote_count})` : 'Ainda sem avaliações.'}</p>
                            </div>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default SeasonDetails
