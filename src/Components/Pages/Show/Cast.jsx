import styles from "./show.module.css"

const Cast = ({cast}) => {

    return (
        <div className={styles.castContainer}>
            <div className={styles.castContent}>
                {cast.profile_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        className={styles.castImg}
                    />
                )}
                <h1 className={styles.castName}>{cast.original_name}</h1>
            </div>
        </div>
    )
}

export default Cast