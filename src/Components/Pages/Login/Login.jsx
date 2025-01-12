import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import {v4 as uuidv4 } from 'uuid'

const Login = () => {
    const [data, setData] = useState ([])
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
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

        const validation = data.find((user) => user.newEmail == email && user.newPassword == password)
            if(validation){
                console.log('Usuário encontrado')
                navigate('/profile')
            }else{
                console.error('Dados não encontrados')
            }
    }

//SignUp area

function newAccount(event){
    event.preventDefault()

    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const birthday = event.target.birthday.value
    const gender = event.target.gender.value
    const newEmail = event.target.newEmail.value
    const newPassword = event.target.newPassword.value
    const confirmedPassword = event.target.confirmedPassword.value

    const emailExists = data.some((user) => user.newEmail === newEmail)
    if(emailExists){
        console.error('Email já cadastrado!')
        return
    }
    if(newPassword === confirmedPassword){
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
            .then((response) =>{
                console.log('Usuário criado', response.data)
                navigate('/profile')
        })
        .catch(error => console.error('Erro ao criar o usuário', error))
    }else{
        console.error('Senhas não conferem.')
    }
}


    return (
    <div>
        <div className="signIn"onSubmit={signInValidation}>
            <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
            <h2>Login</h2>
            <form className="signInForm" >
                <input id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <input id="password" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button id="signInBtn">Entrar</button>
            </form>
        </div>
        <div className="signUp" onSubmit={newAccount}>
            <h2>Cadastre-se</h2>
            <form className="signUpForm">
                <input id="firstName" type="text" placeholder="Nome"></input>
                <input id="lastName" type="text" placeholder="Sobrenome"></input>
                <label htmlFor="birthday">Data de Nascimento</label>
                <input id="birthday" type="date"></input>
                <input name="gender" id="male" type="radio" value="male"></input>
                <label htmlFor="gender">Masculino</label>
                <input name="gender" id="female" type="radio" value="female"></input>
                <label htmlFor="gender">Feminino</label>
                <input id="newEmail" type="email" placeholder="Email"></input>
                <input id="newPassword" type="password" placeholder="Nova senha"></input>
                <input id="confirmedPassword" type="password" placeholder="Confirme a senha"></input>
                <button id="singUpBtn">Cadastre-se</button>
            </form>
        </div>
    </div>
    )
}

export default Login