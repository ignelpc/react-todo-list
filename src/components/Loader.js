import styles from './Loader.module.css'

function Loader() {
    return (
        <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader;