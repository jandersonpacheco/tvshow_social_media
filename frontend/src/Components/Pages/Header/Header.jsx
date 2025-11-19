import styles from "./style.module.css"
import useTvShowStore from "../../../store/tvShowStore.js"
import { useNavigate } from "react-router-dom"
import useUserStore from '../../../store/SSOUserInfo.js'
import homeIcon from '../../../assets/home.png' // Alterar para não importar a imagem diretamente
import randomIcon from '../../../assets/random.png'

const Header = () => {
    const {search, setSearch} = useTvShowStore()
    const { userLogin, ssoUser, setUserLogin, setSsoUser, logout } = useUserStore()
    const navigate = useNavigate('/login')

    const handleLogout = () => {
    const name = ssoUser ? ssoUser.name : userLogin.name
    const confirmed = window.confirm(`Deseja realmente sair da sua conta, ${name}?`)

        if(confirm){
            logout()
            navigate('/')
        }
    }

    const handleSearch = (event) => setSearch(event.target.value)

    function cancelSearch(event){
        event.preventDefault()

        setSearch('')
    }
    

    return (
        <>
            <nav className={styles.nav}>
                <h1 className={styles.homeIcon} onClick={() => navigate('/')}><img src={homeIcon} alt="Home"></img></h1>
                <form className={styles.selectForm}>
                    <h1 className={styles.homeIcon} onClick={() => navigate ('/random-series')}><img className={styles.randomIcon} src={randomIcon} alt="Sorteio de Séries"></img></h1>
                    <input className={styles.searchBar} type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
                    <button className={styles.cancelBtn} id="searchBtn" disabled={search.trim() === ''} onClick={cancelSearch}>Cancelar</button>
                </form>
                { (ssoUser || userLogin) ? (
                    <div className={styles.userContainer}>
                       {ssoUser && (
                            <img src={ssoUser.picture} className={styles.userPhoto} />
                        )}
                        {<p>{ssoUser ? ssoUser.name : userLogin}</p>
                        /*<p>Email: {profile.email}</p>*/}
                        <button 
                        className={styles.logoutBtn}
                        onClick={() => handleLogout()}>Sair</button>
                    </div>
                ):(
                    <button className={styles.logoutBtn} onClick={() => navigate('/login')}>Entrar</button>
                )}
            </nav> 
        </>
    )
}

export default Header
