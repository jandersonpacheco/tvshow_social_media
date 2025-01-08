
import axios from "axios"
import { useEffect, useState } from "react"

const Login = () => {
    const [data, setData] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:3000/users')
            .then((response) => {
                setData(response.data)
            })
            .catch(error => console.error('Erro ao buscar os dados.', error))
    },[])

    return (
    <div>
        <div className="signIp">
            <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
            <h2>Login</h2>
            <form className="signInForm">
                <input id="email" type="email" placeholder="Email"></input>
                <input id="password" type="password" placeholder="Senha"></input>
                <button id="signInBtn">Entrar</button>
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