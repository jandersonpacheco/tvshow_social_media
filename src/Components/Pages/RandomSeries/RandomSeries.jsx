  import styles from "./random-series.module.css"
  import axios from "axios"
  import { useEffect, useState } from 'react'
  import useTvShowStore from "../../../store/tvShowStore.js"
  import noPoster from '../../../assets/poster.png' // Alterar para não importar a imagem diretamente

  const RandomSeries = () => {
    const [random, setRandom] = useState([])
    const [selectedSerie, setSelectedSerie] = useState('')
    const {search} = useTvShowStore()
    const [searchTvShow, setSearchTvShow] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [seriesDraw, setSeriesDraw] = useState([])
    const [players, setPlayers] = useState([])

  useEffect(() => {
  console.log('atualizando com effect', players); // Verifique quando players é atualizado
}, [players])

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTEyMzQ3MTk5NGVmMGU4YzlkNmVhMjlhOWY3YTM5YiIsIm5iZiI6MTczNjczNDY2NS4wNiwic3ViIjoiNjc4NDc3YzkwNjkwYWMwNmU3N2I2YmJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LPEqmskd9heCWoe_8TymhgsprUedEVuwEZrKVMhD1pw',
    }

    useEffect(() => {
      //GET Search
      if(search !== ''){
        setLoading(true)
        setError(null)
        axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=en-US&page=1`, { headers })
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

          axios.get(`https://api.themoviedb.org/3/tv/${serieId}?language=en-us`, { headers })
            .then((response) => {
              const newSerie = response.data
              setRandom(prevRandom => [...prevRandom, newSerie])

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

    const shuffleSeries = () => {
        const shuffled = [...random]
          for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled
    }

    const drawSerie = () => {
      if(random.length < 4){
        return window.alert('Você precisa adicionar o mínimo de 4 séries.')
      }

      const shuffled = shuffleSeries([...random])

      setPlayers(() => shuffled)
    }

    const drawResult = (id) => {
      const result = Math.floor(Math.random() * 6 + 1)

      const updatedPlayers = players.map(player => {
        if (player.id === id) {
          return { ...player, result: result }
        }
        return player
      })

setPlayers(updatedPlayers)
        console.log(players)
    }


    
    const cleanList = () => {
      setRandom ([])
      setPlayers([])
      //setSelectedSerie('')
    }

    return (
      <section className={styles.drawSection}>
        <div className={styles.tableContainer}>
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
                <div className={styles.drawBtnContainer}>
                  <button className={styles.drawBtn} onClick={drawSerie}>Realizar sorteio</button>
                  <button className={styles.drawBtn}onClick={cleanList}>Limpar Lista de sorteio</button>       
                </div>

                {players.length >= 4 ? (
                  <section className={styles.drawSection}>
                    <table className={styles.randomTable}>
                      <thead>
                        <tr>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}>KNOCKOUT FASE</th>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}></th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            {/*Inicio do body da tabela Knockout*/} 
                            <td className={styles.randomTableBody}>{players[0].name}</td>
                            <td className={styles.randomTableBody}>
                              <button 
                                onClick={() => drawResult(players[0].id)}>{players[0]?.result === null || players[0]?.result === undefined ? 'Resultado' : players[0].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}>
                              <button
                                onClick={() => drawResult(players[1].id)}>{players[1]?.result === null || players[1]?.result === undefined ? 'Resultado' : players[1].result}
                              </button>
                          </td>
                            <td className={styles.randomTableBody}>{players[1].name}</td>
                          </tr>
                          <tr>
                            <td className={styles.randomTableBody}>{players[2].name}</td>
                            <td className={styles.randomTableBody}>
                              <button 
                                onClick={() => drawResult(players[2].id)}>{players[2]?.result === null || players[2]?.result === undefined ? 'Resultado' : players[2].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}>
                              <button
                                onClick={() => drawResult(players[3].id)}>{players[3]?.result === null || players[3]?.result === undefined ? 'Resultado' : players[3].result}
                              </button>
                          </td>
                            <td className={styles.randomTableBody}>{players[3].name}</td>
                          </tr>
                          <tr>
  {/*                       <td className={styles.randomTableBody}>{seriesDraw[2].name}</td>
                            <td className={styles.randomTableBody}><button onClick={() => drawResult}>Clique Aqui</button></td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}><button onClick={() => drawResult}>Clique Aqui</button></td>
                            <td className={styles.randomTableBody}>{seriesDraw[3].name}</td>
                          </tr>
                          <tr>
                            <td className={styles.randomTableBody}>{seriesDraw[4].name}</td>
                            <td className={styles.randomTableBody}><button onClick={() => drawResult}>Clique Aqui</button></td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}><button onClick={() => drawResult}>Clique Aqui</button></td>
                            <td className={styles.randomTableBody}>{seriesDraw[5].name}</td>
                          </tr>
                          <tr>
                            <td className={styles.randomTableBody}>{seriesDraw[6].name}</td>
                            <td className={styles.randomTableBody}><button onClick={() => drawResult}>Clique Aqui</button></td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}><button onClick={() => drawResult}>Clique Aqui</button></td>
                            <td className={styles.randomTableBody}>{seriesDraw[7].name}</td>*/}
                          </tr>
                      </tbody>
                    </table>
                  </section>
                ):(<></>)}       
              </>
              )
            :(
            <>
            </>
          )}
        </div>
        {search !== '' ? (
          <div className={styles.searchContainer}>
            <ul className={styles.searchContainer}>
              {searchTvShow.length > 0 ? (
                searchTvShow.map((tvShow) => (
                  <li className={styles.searchContent} key={tvShow.id}>
                    <h3 className={styles.title}>{tvShow.name}</h3>
                    {tvShow.poster_path ? (
                      <img
                        className={styles.poster}
                        src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`}
                        alt={noPoster}
                      />
                    ):(
                      <img
                        className={styles.poster}
                        src={noPoster}
                      />
                    )}
                    <button  className={styles.drawBtn} onClick={() => handleRandom(tvShow.id)}>Adicionar ao sorteio</button>
                  </li>
                ))
              ) : (
                <p>Nenhum resultado encontrado.</p>
              )}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </section>
    )
  }

  export default RandomSeries