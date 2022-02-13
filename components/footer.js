import styles from '../styles/Footer.module.css';
import Image from 'next/image';
import github from '../public/images/github.svg'
import Link from 'next/link'

export default function Footer({}){

  return (
    <footer className={styles.footerWrapper}>
      <div>
        <div className={styles.contentWrapper}>
        <Link href='https://github.com/drenchoman/drenchoman'>
        <a>
          <span>Drenchoman</span>
        </a>
        </Link>
        <Link href='https://github.com/drenchoman/drenchoman'>
          <a>
            <Image
            height={30}
            width={30}
            alt="Link to Drenchoman Github"
            src={github}
            />
          </a>
          </Link>
        </div>
      </div>
    </footer>
)
}
