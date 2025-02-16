import { useEffect, useState } from 'react'
import styles from './show.module.css'
import axios from 'axios'

const SeasonDetails = ({season}) => {
    if(season.name === 'Especiais') return null

    return(
        <>
            <div className={styles.seasonBtn}>
                <button className={styles.seasonName} id={season.id}>Temporada {season.season_number}</button>
            </div>
            <div className={styles.episodeContainer}>
                <div className={styles.episodeImg}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${season.still_path}`}
                        className={styles.img}
                    />
                </div>
            </div>
        </>
    )
}

export default SeasonDetails