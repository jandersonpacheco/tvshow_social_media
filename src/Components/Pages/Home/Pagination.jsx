import styles from "./style.module.css"

const Pagination = ({ page, nextPage, prevPage }) => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageTitleContainer}>
                <h3 className={styles.pageTitle}>Página: {page}</h3>
            </div>
            <div className={styles.pageBtnContainer}>
                <button className={styles.pageBtn} type="button" onClick={prevPage}>{'<'}</button>
                <button className={styles.pageBtn} type="button" onClick={nextPage}>{'>'}</button>
            </div>
        </div>
    )
}

export default Pagination