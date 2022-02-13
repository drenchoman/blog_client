import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'
import animations from '../styles/Animations.module.css'
import nav from '../public/images/nav.svg'
import { useEffect, useState } from 'react';
import Navrightside from '../components/navrightside'

export default function Nav({text, className, userAuth, updateUserAuth}){

const [burgerClicked, setBurgerClicked] = useState(false);

const burgerClick = () => {
  setBurgerClicked(!burgerClicked)
};

  return(
    <>
    <nav className={`${styles.navwrapper} ${animations.animateFade}`}>
      <div className={styles.logo}>
        <Link href='/'>
        <a>
          <h1 className={className}>{text}</h1>
        </a>
      </div>
      </Link>

        <Navrightside userAuth={userAuth} updateUserAuth={updateUserAuth} burgerClick={burgerClick} burgerClicked={burgerClicked} />

    </nav>
    {burgerClicked &&
      <div className={`${styles.burgerModal} ${styles.animatePop}`}>
        <div className={styles.modalOption}>
          <Link href='/login'>
          <a>
            Login
          </a>
          </Link>
        </div>
        <div className={styles.modalOption}>
          <Link href='/register'>
          <a>
            Register
            </a>
          </Link>
        </div>
      </div>
    }
  </>
  )
}
