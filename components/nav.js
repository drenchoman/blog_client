import Image from 'next/image'
import styles from '../styles/Nav.module.css'
import nav from '../public/images/nav.svg'
import Navrightside from '../components/navrightside'

export default function Nav({text, className, userAuth, updateUserAuth}){
  return(
    <nav className={styles.navwrapper}>
      <div className={styles.logo}>
        <a href='/'>
          <h1 className={className}>{text}</h1>
        </a>
      </div>

        <Navrightside userAuth={userAuth} updateUserAuth={updateUserAuth} />

    </nav>
  )
}
