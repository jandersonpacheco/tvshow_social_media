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
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Temporadas</th>
                    <th>Episódios</th>
                    <th>Ano de Lançamento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {random.map((serie) => (
                    <tr key={serie.id}>
                      <td>{serie.name}</td>
                      <td>{serie.number_of_seasons}</td>
                      <td>{serie.number_of_episodes}</td>
                      <td>{serie.first_air_date.split('-',1)}</td>
                      <td>{serie.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={drawSerie}>Realizar sorteio</button>
              <button onClick={cleanList}>Limpar Lista de sorteio</button>              
            </>
            )
          :(
          <>
            <h3>Pesquise por uma série</h3>
          </>
        )}
      </div>
      <div>
          <h2>{selectedSerie}</h2>
      </div>
      {search !== '' ? (
        <>
          <h2>Resultados para: "{search}"</h2>
          <ul>
            {searchTvShow.length > 0 ? (
              searchTvShow.map((tvShow) => (
                <li key={tvShow.id}>
                  <h3>{tvShow.name}</h3>
                  <button onClick={() => handleRandom(tvShow.id)}>Adicionar ao sorteio</button>
                  {tvShow.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`}
                      alt={tvShow.name}
                    />
                  )}
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