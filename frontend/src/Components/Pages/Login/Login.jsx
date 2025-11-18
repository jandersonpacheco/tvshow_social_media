import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import {v4 as uuidv4 } from 'uuid'
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import SSOUserInfo  from '../../../store/SSOUserInfo'

const Login = () => {
    const [user, setUser] = useState([])
    const { profile, setProfile } = SSOUserInfo()
    const [data, setData] = useState ([])
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const [firstName, setFirstName] = useState ('')
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
                setProfile(response.data)
                console.log('Perfil atualizado: ', response.data)
            })
            .catch(error => console.error("Erro ao buscar o perfil: ", error));
    }
}, [user])

const logout = () => {
    googleLogout()
    setProfile(null)
    setUser(null)
}


//SingIn area
    useEffect(() =>{
        axios.get('http://localhost:3000/users')
            .then((response) => {
                setData(response.data)
            })
            .catch(error => console.error('Erro ao buscar os dados.', error))
    },[])
    
    function signInValidation(event){
        event.preventDefault()

        const validation = data.find((user) => user.newEmail == email && user.newPassword == password)
            if(validation){
                console.log('Usuário encontrado')
                navigate('/')
            }else{
                console.error('Email ou senha inválida')
            }
    }

//SignUp area

function newAccount(event){
    event.preventDefault()

    const emailExists = data.some((user) => user.newEmail === newEmail)
    if(emailExists) return console.error('Email já cadastrado!')

    if(newPassword === confirmedNewPassword){
        const newUserAccount = {
            userId: uuidv4(),
            firstName,
            lastName,
            newEmail,
            newPassword,
            confirmedNewPassword
        }
        axios.post('http://localhost:3000/users', newUserAccount)
            .then((response) =>{
                console.log('Usuário criado', response.data)
                navigate('/')
        })
        .catch(error => console.error('Erro ao criar o usuário', error))
    }else{
        console.error('Senhas não conferem.')
    }
}
    return (
    <div>
        <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
        {profile !== "" && (
            <div>
                <img src={profile.picture} alt="imagem do usuário"/>
                <h3>Usuário logado</h3>
                <p>Nome: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <button className={styles.button} onClick={logout}>Sair</button>
            </div>
        )}
            {switchedForm === 'Cadastre-se' ? (
                <div className={styles.headerContainer}>
                    <div>                    
                        <h2 className={styles.title}>Login</h2>
                    </div>
                    <main className={styles.mainContainer}>
                    <div className={styles.formContainer}>
                        <form className={styles.createAccount} onSubmit={signInValidation}>
                            <input className={styles.email} id="email" type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                            <input className={styles.password} id="password" type="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                            <button className={styles.button} id="signInBtn">Entrar</button>
                            <div className={styles.ssoBtn}>
                                <GoogleLogin
                                    onSuccess = {(response) =>{
                                        console.log('Token recebido: ', response)
                                        setUser(response)
                                        const userInfo = jwtDecode(response.credential)
                                        setProfile(userInfo)
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
                                <input className={styles.firstName} id="firstName" type="text" placeholder="Nome" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                <input className={styles.lastName} id="lastName" type="text" placeholder="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                <input className={styles.email} id="newEmail" type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></input>
                                <div className={styles.passwordSection}>
                                    <div className={styles.passwordContainer}>
                                        <input className={styles.password} id="newPassword" type="password" placeholder="Senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                                    </div>
                                    <div className={styles.confirmedPasswordContainer}>
                                        <input className={styles.confirmedPassword} id="ConfirmedNewPassword" type="password" placeholder="Senha" value={confirmedNewPassword} onChange={(e) => setConfirmedNewPassword(e.target.value)}></input>
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
