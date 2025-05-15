import styles from "./random-series.module.css"
import axios from "axios"
import { useEffect, useState } from 'react'
import useTvShowStore from "../../../store/tvShowStore.js"

const RandomSeries = () => {
  const [random, setRandom] = useState([])
  const [selectedSerie, setSelectedSerie] = useState('')
  const {search} = useTvShowStore()
  const [searchTvShow, setSearchTvShow] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
  }

  useEffect(() => {
    //GET Search
    if(search !== ''){
      setLoading(true)
      setError(null)
      axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=pt-BR&page=1`, { headers })
        .then((response) => {
          setSearchTvShow(response.data.results)
          setLoading(false)
        })
        .catch((error) => {
          setError('Erro ao carregar os dados!')
          setLoading(false)
        })
    }
  },[search])


  if (loading) {
      return <h3>Carregando...</h3>
  }

  if (error) {
      return <h3>{error}</h3>
  }

  const handleRandom = (serieId) => {

    const alreadyExists = random.find(serie => serie.id === serieId)

    if(!alreadyExists){
      setSelectedSerie('')

        axios.get(`https://api.themoviedb.org/3/tv/${serieId}?language=pt-br`, { headers })
          .then((response) => {
            const newSerie = response.data
            setRandom(prevRandom => [...prevRandom, newSerie])
            console.log(random)

            const statusMap = {
              'Ended': 'Finalizada',
              'Canceled': 'Cancelada',
              'Returning Series': 'Renovada'
            }

            newSerie.status = statusMap[newSerie.status] || newSerie.status
          })
          .catch((error) => {
              console.error(error);
        })
    }else{
      console.log('Já adicionado')
    }
  }

  const drawSerie = () => {
    const randomSelect = Math.floor(Math.random() * (random.length))
    setSelectedSerie(`A série sorteada foi a: ${random[randomSelect].name}`)
  }

  const cleanList = () => {
    setRandom ([])
    setSelectedSerie('')
  }

  return (
    <>
      <div>
          {random.length > 0 ?(
            <>
              <table className={styles.randomTable}>
                <thead>
                  <tr>
                    <th className={styles.randomTableHead}>Título</th>
                    <th className={styles.randomTableHead}>Temporadas</th>
                    <th className={styles.randomTableHead}>Episódios</th>
                    <th className={styles.randomTableHead}>Ano de Lançamento</th>
                    <th className={styles.randomTableHead}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {random.map((serie) => (
                    <tr key={serie.id}>
                      <td className={styles.randomTableBody}>{serie.name}</td>
                      <td className={styles.randomTableBody}>{serie.number_of_seasons}</td>
                      <td className={styles.randomTableBody}>{serie.number_of_episodes}</td>
                      <td className={styles.randomTableBody}>{serie.first_air_date.split('-',1)}</td>
                      <td className={styles.randomTableBody}>{serie.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <div>
                  <h2 style={{color: 'green', fontWeight: 700}}>{selectedSerie}</h2>
                </div>
              <div className={styles.drawBtn}>
                <button onClick={drawSerie}>Realizar sorteio</button>
                <button onClick={cleanList}>Limpar Lista de sorteio</button>       
              </div>       
            </>
            )
          :(
          <>
            <h3>Pesquise por uma série</h3>
          </>
        )}
      </div>
      {search !== '' ? (
        <>
          <ul>
            {searchTvShow.length > 0 ? (
              searchTvShow.map((tvShow) => (
                <li key={tvShow.id}>
                  <h3>{tvShow.name}</h3>
                  {tvShow.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`}
                      alt={tvShow.name}
                    />
                  )}
                  <button onClick={() => handleRandom(tvShow.id)}>Adicionar ao sorteio</button>
                </li>
              ))
            ) : (
              <p>Nenhum resultado encontrado.</p>
            )}
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default RandomSeries