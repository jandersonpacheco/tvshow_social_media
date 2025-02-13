import styles from "./style.module.css"
import useTvShowStore from "../../../store/tvShowStore.js"


const Header = () => {
    const {search, setSearch} = useTvShowStore()

    function handleSearch(event){
        setSearch(event.target.value)
    }

    function cancelSearch(event){
        event.preventDefault()

        setSearch('')
    }
    

    return (
        <>
            <nav className={styles.nav}>
                <form className={styles.selectForm}>
                    <input type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>

                    <button id="searchBtn" disabled={search.trim() === ''} onClick={cancelSearch}>Cancelar</button>
                </form>
            </nav> 
        </>
    )
}

export default Header
