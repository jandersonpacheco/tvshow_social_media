import styles from "./style.module.css"
import useTvShowStore from "../../../store/tvShowStore.js"


const Header = () => {
    const {search, setSearch} = useTvShowStore()

    function handleSearch(){
        setSearch(event.target.value)
    }

    return (
        <>
            <nav className={styles.nav}>
                <form className={styles.selectForm}>
                    <input type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
                    <button id="searchBtn" disabled>Pesquisar</button>
                </form>
            </nav> 
        </>
    )
}

export default Header
