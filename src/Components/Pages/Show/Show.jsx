import styles from "../Home/style.module.css"
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
                {tvShowsTmdb.poster_path && (
                    <img
                    src={`https://image.tmdb.org/t/p/w500${tvShowsTmdb.poster_path}`}
                    className={styles.img}
                    />
                )}
                <h1>{tvShowsTmdb.name}</h1>
                <p>{tvShowsTmdb.overview}</p>
                <p>Gênero: {tvShowsTmdb.genres.map(genre => genre.name).join(', ')}</p>
                <p>Lançamento: {tvShowsTmdb.first_air_date}</p>
                <p>Popularidade: {tvShowsTmdb.popularity}</p>
                <p>Temporadas: {tvShowsTmdb.number_of_seasons}</p>
                <p>Episódios Programagos: {tvShowsTmdb.number_of_episodes}</p>
                {tvShowsTmdb.last_episode_to_air && tvShowsTmdb.last_episode_to_air.episode_number &&(
                <p>Episódios Lançados: {tvShowsTmdb.last_episode_to_air.episode_number}</p>
                )}
                <p>Nota: {tvShowsTmdb.vote_average}</p>
                <p>Total de Notas: {tvShowsTmdb.vote_count}</p>
            </div>
        ) : (
            <p>Série não encontrada.</p>
        )}
    </>  
    )
}

export default Show
