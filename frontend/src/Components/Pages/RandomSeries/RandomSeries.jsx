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
    const [players, setPlayers] = useState([])
    const [semiFinals, setSemiFinals] = useState([])
    const [final, setFinal] = useState([])


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

    const cleanList = () => {
      setRandom ([])
      setPlayers([])
      setSemiFinals([])
      setFinal([])
      //setSelectedSerie('')
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
      if(random.length < 2){
        return window.alert('Você precisa adicionar o mínimo de 2 séries.')
      }

      const shuffled = shuffleSeries([...random])

      //Para dividir as séries em pares
      const pairs = []
      for(let i = 0 ; i < shuffled.length; i +=2){
        if(shuffled.length % 2 !== 0){
          shuffled.splice(-1,1)
        }
          pairs.push(shuffled.slice(i, i + 2))
      }
      
      if(pairs.length > 8){
        pairs.length = 8
      }

      if(pairs.length % 2 !== 0){
        if(pairs.length === 1){
        }else{
          pairs.splice(-1,1)
        }
      }
      setPlayers(() => pairs)
    }

    const drawResult = (id) => {
      const result = Math.floor(Math.random() * 6 + 1)

      const updatedPlayers = players.map(player =>
        player.map(serie =>{
          if(id === serie.id) return {...serie, result}
          return serie
      }))

      setPlayers(updatedPlayers)
    }

    //Próxima fase
    const nextPhase = (stage) => {
      const phase = stage.length
      const winners = []
      stage.forEach(([player1, player2]) => {
        const winner = player1.result > player2.result ? player1 : player2
        if(phase >= 3) {
          winners.push(winner)
          setSemiFinals(winners)
          return console.log(semiFinals)
        }
          if(phase <= 2) {
            console.log('< 3')
            winners.push(winner)
            console.log(winners)
            setFinal(winners)
          }
          return console.log(phase, {final})
      })
    }

    const generatePairs = (stage) => {
      const pairs = []
      
      stage.forEach((_, index) =>{
        if(index % 2 === 0 && stage[index + 1]) {
          pairs.push([stage[index], stage[index + 1]])
        }
      })
      return pairs
    }

    return (
      <section className={styles.drawSection}>
        <div className={styles.tableContainer}>
            {random.length > 0 ?(
              <>
              {/*Inicio do body da tabela de sorteio*/} 
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

                {/*Inicio do body da tabela Knockout*/} 
                {players !== '' && (
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
                        {players.map((pairs, index) =>(
                          <tr key={index}>
                            <td className={styles.randomTableBody}>{pairs[0].name}</td>
                            <td className={styles.randomTableBody}>
                              <button 
                                onClick={() => drawResult(pairs[0].id)}>{pairs[0]?.result === null || pairs[0]?.result === undefined ? 'Resultado' : pairs[0].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}>
                              <button
                                onClick={() => drawResult(pairs[1].id)}>{pairs[1]?.result === null || pairs[1]?.result === undefined ? 'Resultado' : pairs[1].result}
                              </button>
                          </td>
                            <td className={styles.randomTableBody}>{pairs[1]?.name}</td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                  <div className={styles.nextPhaseContainer}>
                    <button className={styles.drawBtn} onClick={() => nextPhase(players)}>Próxima Fase</button>
                  </div>
                </section>)}

                {/*Inicio do body da tabela Semi Final*/}
                {semiFinals !== '' && (
                <section className={styles.drawSection}>
                  <table className={styles.randomTable}>
                      <thead>
                        <tr>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}>SEMI FINAL</th>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatePairs(semiFinals).map((pair, index) => (
                          <tr key={index}>
                            <td className={styles.randomTableBody}>{pair[0].name}</td>
                            <td className={styles.randomTableBody}>
                              <button onClick={() => drawResult(pair[0].id)}>
                                {pair[0]?.result === null ? 'Resultado' : pair[0].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}>
                              <button onClick={() => drawResult(pais[1].id)}>
                                {pair[1]?.result === undefined ? 'Resultado' : pair[1].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>{pair[1]?.name}</td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                  <div className={styles.nextPhaseContainer}>
                    <button className={styles.drawBtn} onClick={() => nextPhase(semiFinals)}>Próxima Fase</button>
                  </div>
                </section>)}

                {/*Inicio do body da tabela Semi final*/}
                {semiFinals !== '' && final !== '' && (
                <section className={styles.drawSection}>
                  <table className={styles.randomTable}>
                      <thead>
                        <tr>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}>FINAL</th>
                          <th className={styles.randomTableHead}></th>
                          <th className={styles.randomTableHead}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatePairs(final).map((pair, index) => (
                          <tr key={index}>
                            <td className={styles.randomTableBody}>{pair[0].name}</td>
                            <td className={styles.randomTableBody}>
                              <button onClick={() => drawResult(pair[0].id)}>
                                {pair[0]?.result === null ? 'Resultado' : pair[0].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>X</td>
                            <td className={styles.randomTableBody}>
                              <button onClick={() => drawResult(pais[1].id)}>
                                {pair[1]?.result === undefined ? 'Resultado' : pair[1].result}
                              </button>
                            </td>
                            <td className={styles.randomTableBody}>{pair[1]?.name}</td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                  <div className={styles.nextPhaseContainer}>
                    <button className={styles.drawBtn} onClick={() => nextPhase(semiFinals)}>Próxima Fase</button>
                  </div>
                </section>)}
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
          <>
          <h1>PROCURE POR SÉRIES PARA ADICIONAR AO SORTEIO </h1>
          </>
        )}
      </section>
    )
  }

  export default RandomSeries