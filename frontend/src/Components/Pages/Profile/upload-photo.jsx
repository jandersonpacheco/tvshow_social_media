import { useState } from "react"

const UploadPhoto = () => {
    const [image, setImage] = useState(null)

    const handleUpload = (event) => {
        const formData = new FormData()
        formData.append('image', event.target.file[0])

        axios.post('http://localhost:3001/profile/upload', formData)
            .then(response => {
                console.log('URL da imagem', response.data.url)
                setImage(response.data.url)
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <p>Teste</p>
            <input type="file" onChange={handleUpload}></input>
            {image && <img src={image} width="120" />}
        </>
    )
}

export default UploadPhoto