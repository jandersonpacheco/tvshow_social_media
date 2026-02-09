import styles from './style.module.css'
import Header from '../Header/Header'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Profile = () => {
  const [file, setFile] = useState(null)

  const handleChange = (event) => {
    setFile(null)
    setFile(event.target.files[0])
  }

  const handleUpload = async (event) => {
    event.preventDefault()

    if(!file) return

    const formData = new FormData()
    formData.append('photo', file)

    await axios.post('http://localhost:3001/profile/upload', formData)
      .then(response =>{
        console.log('URL da imagem: ', response.data.url)
        setFile(response.data.url)
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <nav className={styles.nav}>
        <Header/>
      </nav>
      <div className={styles.container}>
        <form onSubmit={handleUpload}>
          <img className={styles.profileImg} src={file ? file : 'https://img.freepik.com/vetores-premium/icone-de-avatar-masculino-pessoa-desconhecida-ou-anonima-icone-de-perfil-de-avatar-padrao-usuario-de-midia-social-homem-de-negocios-silhueta-de-perfil-de-homem-isolada-no-fundo-branco-ilustracao-vetorial_735449-120.jpg'}/>
          <input type='file' onChange={handleChange}></input>
          <button type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default Profile