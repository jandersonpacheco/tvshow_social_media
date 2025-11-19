import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { GoogleLogin} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import useUserStore from '../../../store/SSOUserInfo.js'

const Login = () => {
    const [user, setUser] = useState([])
    const { userLogin, ssoUser, setUserLogin, setSsoUser, logout } = useUserStore()
    const [data, setData] = useState ([])
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const [firstName, setFirstName] = useState ('')
    const [username, setUsername] = useState ('')
    const [lastName, setLastName] = useState ('')
    const [newEmail, setNewEmail] = useState ('')
    const [newPassword, setNewPassword] = useState ('')
    const [confirmedNewPassword, setConfirmedNewPassword] = useState ('')
    const navigate = useNavigate()
    const [switchedForm, setSwitchedForm] = useState ('Cadastre-se')

    //Switch Form

    function switchForm(){
        setSwitchedForm (switchedForm === 'Cadastre-se' ? 'Já possui uma conta?' : 'Cadastre-se')
            console.log(switchedForm)
    }

    //SSO area
    useEffect(() => {
        if (user?.access_token){
            const headers = {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json',
                'Cross-Origin-Opener-Policy': 'same-origin'
            }
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,{ headers })
                .then((response) =>{
                    setSsoUser(response.data)
                    console.log('Perfil atualizado: ', response.data)
                })
                .catch(error => console.error("Erro ao buscar o perfil: ", error));
        }
    }, [user])

    //SingIn area
    function login (event){
        event.preventDefault()
    
        if(!email || !password) return console.log('Preencha os campos obrigatórios.')
        
        axios.post('http://localhost:3001/auth/login', {email, password})
            .then((response) => {
                setUserLogin(response.data.user.name)
                navigate('/')
                console.log(response.data.user.name)
            })
            .catch(error => console.error(error))
    }

//SignUp area

    function newAccount(event){
        event.preventDefault()
        
        if(!firstName || !lastName || !newEmail || !newPassword || !confirmedNewPassword) return console.log('Preencha todos os campos.')
        if(newPassword !== confirmedNewPassword) return console.log('Senhas não conferem.')

        axios.post('http://localhost:3001/auth/register', {username, firstName, lastName, newEmail, newPassword, confirmedNewPassword})
            .then((response) =>{
                setUserLogin(response.data.user.name)
                console.log('Usuário criado', response.data.user.name)
                navigate('/')
        })
    }

    return (
        <div>
            {switchedForm === 'Cadastre-se' ? (
                <div className={styles.headerContainer}>
                    <div>                    
                        <h2 className={styles.title}>Login</h2>
                    </div>
                    <main className={styles.mainContainer}>
                    <div className={styles.formContainer}>
                        <form className={styles.createAccount} onSubmit={login}>
                            <input className={styles.email} id="email" type="email" placeholder="Email" value={email} required onChange={(event) => setEmail(event.target.value)}></input>
                            <input className={styles.password} id="password" type="password" placeholder="Senha" value={password} required onChange={(event) => setPassword(event.target.value)}></input>
                            <button className={styles.button} id="signInBtn">Entrar</button>
                            <div className={styles.ssoBtn}>
                                <GoogleLogin
                                    onSuccess = {(response) =>{
                                        console.log('Token recebido: ', response)
                                        const userInfo = jwtDecode(response.credential)
                                        setSsoUser(userInfo)
                                        navigate('/')
                                    }}
                                    onError = {() => console.log('Falha ao logar',
                                    flow = 'auto-code'
                                    )}
                                />
                            </div>
                        </form>
                    </div>
                    </main>
                </div>
            ) : (
                <div className={styles.headerContainer}>
                    <h2 className={styles.title}>Cadastre-se</h2>
                    <main className={styles.mainContainer}>
                        <div className={styles.formContainer}>
                            <form className={styles.createAccount} onSubmit={newAccount}>
                                <input className={styles.firstName} id="username" type="text" placeholder="Nome de Usuário" value={username} required onChange={(e) => setUsername(e.target.value)}></input>
                                <input className={styles.firstName} id="firstName" type="text" placeholder="Nome" value={firstName} required onChange={(e) => setFirstName(e.target.value)}></input>
                                <input className={styles.lastName} id="lastName" type="text" placeholder="Sobrenome" value={lastName} required onChange={(e) => setLastName(e.target.value)}></input>
                                <input className={styles.email} id="newEmail" type="email" placeholder="Email" value={newEmail} required onChange={(e) => setNewEmail(e.target.value)}></input>
                                <div className={styles.passwordSection}>
                                    <div className={styles.passwordContainer}>
                                        <input className={styles.password} id="newPassword" type="password" placeholder="Senha" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)}></input>
                                    </div>
                                    <div className={styles.confirmedPasswordContainer}>
                                        <input className={styles.confirmedPassword} id="ConfirmedNewPassword" type="password" placeholder="Senha" value={confirmedNewPassword} required onChange={(e) => setConfirmedNewPassword(e.target.value)}></input>
                                    </div>
                                </div>
                                <button className={styles.button} id="singUpBtn">Cadastre-se</button>
                            </form>
                        </div>
                    </main>
                </div>
            )}
            <div className={styles.switchContainer}>
                <p id="newUser" className={styles.switchBtn} onClick={switchForm}>{switchedForm}</p>
            </div>
    </div>
    )
}

export default Login
