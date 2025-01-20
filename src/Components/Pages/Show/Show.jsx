import styles from "../Home/style.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Show = () => {
    const [tvShowsTmdb, setTvShowsTmdb] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const arcane = 'tt11126994'
    const imdb ='imdb_id'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/find/${arcane}external_id?external_source=${imdb}&language=pt-br`, {headers})
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
        <>
            <h1>{tvShowsTmdb}</h1>
        </>
    )
}

export default Show
