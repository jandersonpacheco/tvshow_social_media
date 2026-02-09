import styles from './style.module.css'
import Header from '../Header/Header'

const Profile = () => {
const tvShows = [
  {
    'id': 1,
    'coverImg': 'https://ih1.redbubble.net/image.5212739007.9683/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    'title': '1º The Bear',
    'genre': 'Comédia',
    'streaming': 'Disney+'
  }
]

  return (
    <div>
      <nav className={styles.nav}>
        <Header/>
      </nav>
      <div className={styles.container}>
        {tvShows.map((tvShow =>(
          <div className={styles.tvShowContainer} key={tvShow.id}>
            <img className={styles.img} src={tvShow.coverImg}/>
            <h2 className={styles.title}>{tvShow.title}</h2>
            <p className={styles.description}><strong>Gênero: </strong>{tvShow.genre}</p>
            <p className={styles.description}><strong>Streaming: </strong>{tvShow.streaming}</p>
          </div>
        )))}
      </div>
    </div>
  )
}

export default Profile