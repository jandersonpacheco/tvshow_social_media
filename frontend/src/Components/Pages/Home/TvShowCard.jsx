import styles from "./style.module.css"

const TvShowCard = ({show}) => {
    return(
        <div className={styles.tvShowContainer}>
            {show.poster_path && (
                <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name}/>
            )}
            <h2 className={styles.title}>{show.name}</h2>
        </div>
    )
}

export default TvShowCard