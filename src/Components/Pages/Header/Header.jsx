import styles from "./style.module.css"
import useTvShowStore from "../../../store/tvShowStore.js"
import { useNavigate } from "react-router-dom"
import SSOUserInfo from '../../../store/SSOUserInfo.js'

const Header = () => {
    const {search, setSearch} = useTvShowStore()
    const { profile } = SSOUserInfo()
    const { logout } = SSOUserInfo()
    const navigate = useNavigate('/login')

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
                    {profile !== "" && (
                        <div>
                            <img src={profile.picture} alt="imagem do usuário"/>
                            <h3>Usuário logado</h3>
                            <p>Nome: {profile.name}</p>
                            <p>Email: {profile.email}</p>
                            <button className={styles.button} onClick={() => logout({navigate})}>Sair</button>
                        </div>
                    )}
                <form className={styles.selectForm}>
                    <input className={styles.searchBar} type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
                    <button className={styles.cancelBtn} id="searchBtn" disabled={search.trim() === ''} onClick={cancelSearch}>Cancelar</button>
                </form>
                {profile !== "" && (
                    <div className={styles.userContainer}>
                        <img src={profile.picture} alt="imagem do usuário" className={styles.userPhoto}/>
                        {/*<p>Nome: {profile.name}</p>
                        <p>Email: {profile.email}</p>*/}
                        <button className={styles.logoutBtn} onClick={() => logout({/*navigate*/})}>Sair</button>
                    </div>
                )}
            </nav> 
        </>
    )
}

export default Header
