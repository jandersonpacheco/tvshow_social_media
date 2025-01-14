import styles from './style.module.css'

const Profile = () => {
const tvShows = [
  {
    'id': 1,
    'coverImg': 'https://ih1.redbubble.net/image.5212739007.9683/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    'title': '1º The Bear',
    'genre': 'Comédia',
    'streaming': 'Disney+'
  },
  {
    'id': 2,
    'coverImg': 'https://wallpapers.com/images/hd/mare-of-easttown-mother-jean-smart-gl34aca2rxtrv7tj.jpg',
    'title': '2º Mare of Easttown',
    'genre': 'Drama',
    'streaming': 'Max'
  },
  {
    'id': 3,
    'coverImg': 'https://posterspy.com/wp-content/uploads/2024/03/INVINCIBLE-POSTER.jpg',
    'title': '3º Invincible',
    'genre': 'Animação',
    'streaming': 'Prime Video'
  },
  {
    'id': 4,
    'coverImg': 'https://br.web.img3.acsta.net/pictures/19/05/23/11/52/4695781.jpg',
    'title': '4º What We Do in the Shadows',
    'genre': 'Comédia',
    'streaming': 'Disney+'
  },
  {
    'id': 5,
    'coverImg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXnnC_h9OsVe8BN-bp_hykp-58OlrJ-Ou42w&s',
    'title': '5º Defending Jacob',
    'genre': 'Drama',
    'streaming': 'AppleTV+'
  },
  {
    'id': 6,
    'coverImg': 'https://br.web.img3.acsta.net/r_1280_720/pictures/23/10/06/09/45/5152455.jpg',
    'title': '6º Planeta dos Abutres',
    'genre': 'Animação',
    'streaming': 'Max'
  },
  {
    'id': 7,
    'coverImg': 'https://image.tmdb.org/t/p/original/zm2i1HMKLI70s0mojmUbJLVPp8l.jpg',
    'title': '7º Peacemaker',
    'genre': 'Comédia',
    'streaming': 'Max'
  },
  {
    'id': 8,
    'coverImg': 'https://image.tmdb.org/t/p/original/u1FBsyMH9Tx7K5yzMnJsYRvNEKQ.jpg',
    'title': '8º Years and Years',
    'genre': 'Drama',
    'streaming': 'AppleTV+'
  },
  {
    'id': 9,
    'coverImg': 'https://resizing.flixster.com/CMFB9khdPpwB-tYagZbhTw3q288=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvOWYwZDFkOWQtZWExMC00N2ZhLWIyN2ItOWZkMGNjNDU5ODc0LmpwZw==',
    'title': '9º - Tear Along the Dotted Line',
    'genre': 'Animação',
    'streaming': 'Netflix'
  },
  {
    'id': 10,
    'coverImg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdw_T1xLS7TKoNhS04sMJLwmaN-QJRJbJC_Q&s',
    'title': '10º Only Murders in the Building',
    'genre': 'Comédia',
    'streaming': 'Disney+'
  },
  {
    'id': 11,
    'coverImg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCvLEO7ZXqLF2P8t0YkHzYfCJZG9NF5tnbQ&s',
    'title': '11º The Old Man',
    'genre': 'Drama',
    'streaming': 'Disney+'
  },
  {
    'id': 12,
    'coverImg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IPME1kbPqoQI3aHZ42McaOf7XhYouwWKiA&s',
    'title': '12º - Dahmer',
    'genre': 'Drama',
    'streaming': 'Netflix'
  },
  {
    'id': 13,
    'coverImg': 'https://image.tmdb.org/t/p/original/69YuvoiWTtK6oyYH2Jl4Q6SgZ59.jpg',
    'title': '13º - Berlin',
    'genre': 'Drama',
    'streaming': 'Netflix'
  }

]

  return (
    <div>
      <nav className={styles.nav}>
        <h1>Ranking de Séries (Jan-Mar)</h1>
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