import styles from "./show.module.css"

const Cast = ({cast}) => {

    return (
        <>
            <div className={styles.castContent}>
                {cast.profile_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        className={styles.castImg}
                    />
                ):(
                    <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pQbtqNJoZrYcg0-7A6as6IDzHfdJrFEv9A&s`}
                    className={styles.castImg}
                />
                )}
                <h3 className={styles.castName}>{cast.name}</h3>
                <h3 className={styles.castCharacter}>{cast.roles[0].character}</h3>
            </div>
        </>
    )
}

export default Cast