import styles from "./style.module.css"
import useTvShowStore from "../../../store/tvShowStore.js"
import { useNavigate } from "react-router-dom"
import SSOUserInfo from '../../../store/SSOUserInfo.js'
import homeIcon from '../../../assets/home.png' // Alterar para não importar a imagem diretamente

const Header = () => {
    const {search, setSearch} = useTvShowStore()
    const { profile } = SSOUserInfo()
    const { logout } = SSOUserInfo()
    const navigate = useNavigate('/login')

    const handleLogout = () => {
        const confirm = window.confirm(`Deseja realmente sair da sua conta, ${profile.name}?`)

        if(confirm){
            logout()
            return navigate('/')
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
                    <input className={styles.searchBar} type="text" id="search" autoComplete="off"placeholder="Procure por uma série" value={search} onChange={handleSearch}></input>
                    <button className={styles.cancelBtn} id="searchBtn" disabled={search.trim() === ''} onClick={cancelSearch}>Cancelar</button>
                </form>
                {profile !== "" ? (
                    <div className={styles.userContainer}>
                        <img src={profile.picture} alt="imagem do usuário" className={styles.userPhoto}/>
                        {/*<p>Nome: {profile.name}</p>
                        <p>Email: {profile.email}</p>*/}
                        <button 
                        className={styles.logoutBtn}
                        onClick={() => handleLogout()}>Sair</button>
                    </div>
                ):(
                    <button className={styles.logoutBtn} onClick={() => navigate('/login')}>Entrar / Cadastre-se</button>
                )}
            </nav> 
        </>
    )
}

export default Header
