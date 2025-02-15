import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import {v4 as uuidv4 } from 'uuid'

const Login = () => {
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
                navigate('/home')
            }else{
                console.error('Email ou senha inválida')
            }
    }

//SignUp area

function newAccount(event){
    event.preventDefault()

    const emailExists = data.some((user) => user.newEmail === newEmail)
    if(emailExists){
        console.error('Email já cadastrado!')
        return
    }
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
                navigate('/home')
        })
        .catch(error => console.error('Erro ao criar o usuário', error))
    }else{
        console.error('Senhas não conferem.')
    }
}
    return (
    <div>
        <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
            {switchedForm === 'Cadastre-se' ? (
                <div className={styles.headerContainer}>
                    <div>                    
                        <h2 className={styles.title}>Login</h2>
                    </div>
                    <main className={styles.mainContainer}>
                    <div className={styles.formContainer}>
                        <form className={styles.createAccount} onSubmit={signInValidation}>
                            <input className={styles.email} id="email" type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
                            <input className={styles.password} id="password" type="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)} required></input>
                            <button className={styles.button} id="signInBtn">Entrar</button>
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
