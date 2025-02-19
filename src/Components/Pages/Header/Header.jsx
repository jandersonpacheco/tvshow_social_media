import styles from "./style.module.css"
import useTvShowStore from "../../../store/tvShowStore.js"
import { useNavigate } from "react-router-dom"


const Header = () => {
    const {search, setSearch} = useTvShowStore()
    
    /*const navigate = useNavigate()

    const homeBtn = () => navigate('/home')*/

    const handleSearch = (event) => setSearch(event.target.value)

    function cancelSearch(event){
        event.preventDefault()

        setSearch('')
    }
    

    return (
        <>
            <nav className={styles.nav}>
            {/*<Link to={`/home`} onClick= {() => homeBtn()}>
                <h1>Home</h1>
            </Link>*/}
                <form className={styles.selectForm}>
                    <input type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
                    <button id="searchBtn" disabled={search.trim() === ''} onClick={cancelSearch}>Cancelar</button>
                </form>
            </nav> 
        </>
    )
}

export default Header
