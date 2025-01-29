import styles from "./style.module.css"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import TvShowCard from "../Home/TvShowCard"

const Header = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    function handleSearch(event){
        event.preventDefault()

        setSearch(event.target.value)
        axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, {headers})
        .then((response)=>{
            setData(response.data.results)
            setLoading(false)
        })
        .catch((error)=>{
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
    }
    
    return (
        <>
            <nav className={styles.nav}>
                <form className={styles.selectForm}>
                    <input type="text" id="search" placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
                    <button id="searchBtn" disabled>Pesquisar</button>
                </form>
            </nav>
            <div className={styles.mainTitleContainer}>
                <h2 className={styles.mainTitleContent}>Resultados por: {search}</h2>
            </div>
            <div className={styles.tvShowCategory}>
                {data.map((searchShow) => (
                    <Link to={`/home/${searchShow.id}`} key={searchShow.id}>
                        <TvShowCard 
                            show={searchShow}
                        />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Header
