import styles from "./show.module.css"

const Cast = ({cast}) => {

    return (
        <div className={styles.castContainer}>
            <div className={styles.castContent}>
                {cast.profile_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        className={styles.castImg}
                    />
                ):(
                    <img
                    src={`https://i2.wp.com/static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg`}
                        className={styles.castImg}
                />
                )}
                <h3 className={styles.castName}>{cast.name}</h3>
                <h3 className={styles.castCharacter}>{cast.roles[0].character}</h3>
            </div>
        </div>
    )
}

export default Cast