import styles from "./style.module.css"
import { useState } from "react"


const Header = ({search, onSearch}) => {
    const [localSearch, setLocalSearch] = useState(search)

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
