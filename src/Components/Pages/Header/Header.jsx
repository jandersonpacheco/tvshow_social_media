import styles from "./style.module.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import TvShowCard from "../Home/TvShowCard"
import useTvShowStore from "../../../store/tvShowStore.js"


const Header = () => {
    const {search, setSearch} = useTvShowStore()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    const handleSearchChange = (event) => {
        setLocalSearch(event.target.value)
        onSearch(event.target.value)
      }
    
    return (
        <>
            <nav className={styles.nav}>
                <form className={styles.selectForm}>
                    <input type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={localSearch} onChange={handleSearchChange}></input>
                    <button id="searchBtn" disabled>Pesquisar</button>
                </form>
            </nav> 
        </>
    )
}

export default Header
