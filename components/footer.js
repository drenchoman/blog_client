import styles from '../styles/Footer.module.css';
import Image from 'next/image';
import github from '../public/images/github.svg'


export default function Footer({}){

  return (
    <footer className={styles.footerWrapper}>
      <div>
        <div className={styles.contentWrapper}>
        <a href='https://github.com/drenchoman/drenchoman'>
          <span>Drenchoman</span>
        </a>
        <a href='https://github.com/drenchoman/drenchoman'>
            <Image
            height={30}
            width={30}
            alt="Link to Drenchoman Github"
            src={github}
            />
          </a>
        </div>
      </div>
    </footer>
)
}
