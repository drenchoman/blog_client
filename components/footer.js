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
          <span>Drenchoman</span>
        </Link>
        <Link href='https://github.com/drenchoman/drenchoman'>
            <Image
            height={30}
            width={30}
            alt="Link to Drenchoman Github"
            src={github}
            />
          </Link>
        </div>
      </div>
    </footer>
)
}
