import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

const Login = () => {
    const [data, setData] = useState ([])
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get('http://localhost:3000/users')
            .then((response) => {
                setData(response.data)
            })
            .catch(error => console.error('Erro ao buscar os dados.', error))
    },[])
    
    function signInValidation(event){
        event.preventDefault()

        const validation = data.find((x) => x.email == email && x.password == password)
        if(email !== '' && password !== ''){
            if(validation){
                console.log('Usuário encontrado')
                navigate('/home')
                }else{
                console.error('Dados não encontrados')
                }
        }else{
            console.error('Preencha os campos de email e senha.')
        }
    }

    return (
    <div>
        <div className="signIn">
            <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
            <h2>Login</h2>
            <form className="signInForm" >
                <input id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input id="password" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button id="signInBtn"onClick={signInValidation}>Entrar</button>
            </form>
        </div>
        <div className="signUp">
            <h2>Cadastre-se</h2>
            <form className="signUpForm">
                <input id="first-name" type="text" placeholder="Nome"></input>
                <input id="last-name" type="text" placeholder="Sobrenome"></input>
                <label htmlFor="birthday">Data de Nascimento</label>
                <input id="birthday" type="date"></input>
                <input name="gender" type="radio" value="male"></input>
                <label htmlFor="gender">Masculino</label>
                <input name="gender" type="radio" value="female"></input>
                <label htmlFor="gender">Feminino</label>
                <input id="new-email" type="email" placeholder="Email"></input>
                <input id="new-password" type="new-password" placeholder="Senha"></input>
                <button id="singUpBtn">Cadastre-se</button>
            </form>
        </div>
    </div>
    )
}

export default Login