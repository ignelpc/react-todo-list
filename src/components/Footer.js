import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer>
            <ul className={styles.social_list}>
                <li className={styles.fb}><FaFacebook /></li>
                <li className={styles.whatsapp}><FaWhatsapp /></li>
                <li className={styles.twitter}><FaTwitter /></li>
                <li className={styles.instagram}><FaInstagram /></li>
            </ul>
        </footer>
    )
}