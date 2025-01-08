const Login = () => {
    return (
    <div>
        <h1>AQUI NASCE A MAIOR REDE SOCIAL DE SÉRIES DO MUNDO!</h1>
        <h2>Login</h2>
        <label htmlFor="username">Email:</label>
        <input id="username" type="email" placeholder="joao@provedor.com"></input>
        <label htmlFor="password">Senha:</label>
        <input id="password" type="password" placeholder="********"></input>
        <button id="loginBtn">Entrar</button>
    </div>
    )
}

export default Login