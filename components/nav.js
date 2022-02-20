import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'
import animations from '../styles/Animations.module.css'
import nav from '../public/images/nav.svg'
import { useEffect, useState } from 'react';
import Navrightside from '../components/navrightside'

export default function Nav({text, userAuth, updateUserAuth}){

const [burgerClicked, setBurgerClicked] = useState(false);
  const [userAuthenticated, setuserAuthenticated] = useState(false);

const burgerClick = () => {
  setBurgerClicked(!burgerClicked)
};

const handleSubmit = () => {
  // Dont need to call /api/logout as using token instead of session

  localStorage.clear();
  localStorage.setItem("userAuth", false);
  updateUserAuth(false);
  setBurgerClicked(false);

}

useEffect(()=>{
  setuserAuthenticated(userAuth)
},[userAuth])

if(userAuthenticated){
  return(
    <>
    <nav className={`${styles.navwrapper} ${animations.animateFade}`}>
      <div className={styles.logo}>
        <Link href='/'>
        <a>
          <span className={styles.logoText}>{text}</span>
        </a>
        </Link>
      </div>


      <Navrightside userAuth={userAuth} updateUserAuth={updateUserAuth} burgerClick={burgerClick} burgerClicked={burgerClicked} userAuthenticated={userAuthenticated} />

    </nav>
    {burgerClicked &&
      <div className={styles.burgerModal }>
        <div onClick={burgerClick} className={`${styles.modalOption} ${animations.animateFade} ${animations.delay1}`}>
          <Link href='/register'>
          <a>
            Register
            </a>
          </Link>
        </div>
        <div onClick={handleSubmit} className={`${styles.modalOption} ${styles.red} ${animations.delay1} ${animations.animateFade}`}>
          <Link href='/'>
          <a>
            Logout
          </a>
          </Link>
        </div>

      </div>
    }
  </>

  )
} else{
  return(
    <>
    <nav className={`${styles.navwrapper} ${animations.animateFade}`}>
      <div className={styles.logo}>
        <Link href='/'>
        <a>
          <span className={styles.logoText}>{text}</span>
        </a>
        </Link>
      </div>


      <Navrightside userAuth={userAuth} updateUserAuth={updateUserAuth} burgerClick={burgerClick} burgerClicked={burgerClicked} userAuthenticated={userAuthenticated} />

    </nav>
    {burgerClicked &&
      <div className={styles.burgerModal }>
        <div onClick={burgerClick} className={`${styles.modalOption} ${animations.animateFade} ${animations.delay1}`}>
          <Link href='/register'>
          <a>
            Register
            </a>
          </Link>
        </div>
        <div onClick={burgerClick} className={`${styles.modalOption} ${styles.red} ${animations.delay1} ${animations.animateFade}`}>
          <Link href='/login'>
          <a>
            Login
          </a>
          </Link>
        </div>
      </div>
    }
  </>
  )
}
}
