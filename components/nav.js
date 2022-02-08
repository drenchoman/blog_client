import Image from 'next/image'
import styles from '../styles/Nav.module.css'
import nav from '../public/images/nav.svg'

export default function Nav({text, className}){
  return(
    <nav className={styles.navwrapper}>
      <div className={styles.logo}>
        <a href='/'>
          <h1 className={className}>{text}</h1>
        </a>
      </div>
      <div className={styles.signin}>
      <div className={styles.navBurger}>
        <Image
        width={40}
        height={40}
        src={nav}
        />
        </div>
        <button className={styles.signinButton}>Log in </button>
        <button className={styles.registerButton}>Register </button>
      </div>
    </nav>
  )
}
