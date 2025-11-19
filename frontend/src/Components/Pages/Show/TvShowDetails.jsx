    import styles from "./show.module.css"

    const TvShowDetails = ({show, showVideo, tvShowBackdrop}) => {
        const trailer = showVideo.results?.find(video => video.type ==="Trailer")
        const backdropUrl = tvShowBackdrop?.backdrops?.[0]?.file_path
        const backdropImageUrl = backdropUrl ? `https://image.tmdb.org/t/p/original/${backdropUrl}` : null

        return (
            <div className={styles.showDetails} 
                style={backdropImageUrl ?
                    { backgroundImage: `url(${backdropImageUrl})` } : {}}>
                <div className={styles.showImg}>
                    {show.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            className={styles.posterImg}
                        />
                    )}
                </div>
                    <div className={styles.showContent}>
                        <div className={styles.title}>
                            <h1 className={styles.title}>{show.original_name}</h1>
                        </div>
                    <div className={styles.statisticBoxContainer}>
                        <p className={styles.sBvote_average}>{show.vote_average ? show.vote_average.toFixed(1): 'N/A'}</p>
                        <div className={styles.statisticBox}>
                            <p className={styles.statisticBoxTitle}>Popularidade</p>
                            <p className={styles.sbPopularity}>{show.popularity}</p>
                        </div>
                        <div className={styles.statisticBox}>
                            <p className={styles.statisticBoxTitle}>Avaliações</p>
                            <p className={styles.sbVote_count}>{show.vote_count}</p>
                        </div>
                        </div>
                            <p className={styles.overview}>{show.overview}</p>
                            <p className={styles.genres}>Gênero: {show.genres ? show.genres.map(genre => genre.name).join(', '): ''}</p>
                            <p className={styles.first_air_date}>Lançamento: {show.first_air_date ? show.first_air_date.split('-').reverse().join('/'): ''}</p>
                            <p className={styles.number_of_seasons}>Temporadas: {show.number_of_seasons}</p>
                            <p className={styles.number_of_episodes}>Episódios Programados: {show.number_of_episodes}</p>
                            {show.last_episode_to_air && show.last_episode_to_air.episode_number &&(
                                <p className={styles.episode_number}>Episódios Lançados: {show.last_episode_to_air.episode_number}</p>
                            )}
                        </div>
                        <div className={styles.showVideo}>
                        {trailer ? (
                            <div key={trailer.id}>
                                <h3>{trailer.name}</h3>
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    className={styles.video}
                                    title={trailer.name}
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <p>Nenhum trailer disponível.</p>
                        )}
                    </div>
            </div>
            
        )    
    }

    export default TvShowDetails