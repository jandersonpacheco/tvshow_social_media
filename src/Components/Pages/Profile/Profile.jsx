import styles from './style.module.css'

const Profile = () => {

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}/season/1?language=pt-br`, {headers})
        .then((response) => {
            setSeasonDetail(response.data.episodes)
            setLoading(false)
            console.log(response.data.episodes)
        })
        .catch((error) => {
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
}, [id])

function seasonChanging(seasonNumber){
    setSeasonDetail([])

    axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=pt-br`, {headers})
        .then((response) => {
            setSeasonDetail(response.data.episodes)
            setLoading(false)
            console.log(response.data.episodes)
        })
        .catch((error) => {
            setError('Erro ao carregar os dados!')
            setLoading(false)
        })
}


useEffect(() => {
  axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-br`, {headers})
      .then((response) => {
          setSeasonInfo(response.data.seasons)

          setLoading(false)
      })
      .catch((error) => {
          setError('Erro ao carregar os dados!')
          setLoading(false)
      })
}, [id])

  return (
    <div>
        <h1>Ranking de Séries (Jan-Mar)</h1>
    </div>
  )
}

export default Profile