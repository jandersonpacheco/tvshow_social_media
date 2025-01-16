import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

const Login = () => {
    const [data, setData] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


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
        
        const validation = data.find((user) => user.newEmail === email && user.newPassword === password)
            if(validation){
                console.log('Usuário encontrado')
                navigate('/home')
            }else{
                console.error('Email ou senha inválida')
            }
        }

    // SignUp area
    function newAccount(event) {
        event.preventDefault()

        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value
        const birthday = event.target.birthday.value
        const gender = event.target.gender.value
        const newEmail = event.target.newEmail.value
        const newPassword = event.target.newPassword.value
        const confirmedPassword = event.target.confirmedPassword.value

        const emailExists = data.some((user) => user.newEmail === newEmail)
        if (emailExists) {
            setError('Email já cadastrado!')
            return
        }
        if (newPassword !== confirmedPassword) {
            setError('As senhas não conferem.')
            return
        }

        const newUserAccount = {
            userId: uuidv4(),
            firstName,
            lastName,
            birthday,
            gender,
            newEmail,
            newPassword,
            confirmedPassword
        }

        axios.post('http://localhost:3000/users', newUserAccount)
            .then((response) => {
                console.log('Usuário criado', response.data)
                navigate('/home')
            })
            .catch(error => {
                console.error('Erro ao criar o usuário', error)
                setError('Erro ao criar a conta. Tente novamente.')
            })
    }

    return (
        <div className={styles.main}>
            <div className={styles.signIn}>
                <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
                <h2>Login</h2>
                <form className={styles.signInForm}>
                    <input id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
                    <input id="password" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input}/>
                    <button id="signInBtn" onClick={signInValidation} className={styles.button}>Entrar</button>
                </form>
            </div>
            <div className={styles.signUp}>
                <h2>Cadastre-se</h2>
                <form className={styles.signUpForm} onSubmit={newAccount}>
                    <input id="first-name" type="text" placeholder="Nome" className={styles.input} />
                    <input id="last-name" type="text" placeholder="Sobrenome" className={styles.input} />
                    <label htmlFor="birthday" className={styles.label}>Data de Nascimento</label>
                    <input id="birthday" type="date" className={styles.input}/>
                    <div className={styles.genderSelection}>
                        <input name="gender" type="radio" value="male" className={styles.radioInput} />
                        <label htmlFor="gender" className={styles.label}>Masculino</label>
                        <input name="gender" type="radio" value="female" className={styles.radioInput} />
                        <label htmlFor="gender" className={styles.label}>Feminino</label>
                    </div>
                    <input id="new-email" type="email" placeholder="Email" required className={styles.input} />
                    <input id="new-password" type="password" placeholder="Senha" required className={styles.input} />
                    <input id="confirmed-password" type="password" placeholder="Confirmar Senha" required className={styles.input}/>
                    <button id="signUpBtn" type="submit" className={styles.button}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login
