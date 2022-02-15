import Link from 'next/link'
import styles from '../styles/Fourohfour.module.css'
import Image from 'next/image'
import oldship from '../public/images/oldship.svg'

export default function FourOhFour() {
  return <div className={styles.wrapper}>
  <h1> 404- Page Not Found</h1>
  <Image
    height={500}
    width={500}
    alt='Old ship'
    src={oldship}
  />
  <Link href='/'>
  <button className={styles.fancyB}>
    <a>
    Go home
    </a>
    </button>
    </Link>
    </div>
}
