import Image from 'next/image';
import Link from 'next/link'
import styles from '../styles/Nav.module.css';
import nav from '../public/images/nav.svg';
import x from '../public/images/x.svg';
import { useEffect, useState } from 'react';
import Loginform from '../components/loginform'

export default function Navrightside({userAuth, updateUserAuth, burgerClick, burgerClicked, userAuthenticated}){


  const [loginChecked, setLoginChecked] = useState(false);


  const handleClick = () => {
    setLoginChecked(!loginChecked)
  };

  const handleSubmit = () => {
    // Dont need to call /api/logout as using token instead of session

    localStorage.clear();
    localStorage.setItem("userAuth", false);
    updateUserAuth(false);

  }


  if (userAuthenticated){
    return (

      <div className={styles.signIn}>
        <button className={styles.logoutButton}
          onClick={handleSubmit}> Log out
        </button>
      <div onClick={burgerClick} className={styles.navBurger}>

        <Image
        width={40}
        height={40}
        src={burgerClicked ? x : nav}
        />


        </div>

      </div>

    )
  } else { return (
<div>
    <div className={styles.signIn}>
      <button onClick={handleClick} className={styles.signinButton}>Log in </button>
    <Link href='/register'>
    <a>
      <button onClick={() => setLoginChecked(false)} className={styles.registerButton}>Register </button>
      </a>
    </Link>
    <div onClick={burgerClick} className={styles.navBurger}>
      <Image
      width={40}
      height={40}
      src={burgerClicked ? x : nav}
      />

      </div>


    </div>
    {loginChecked && <div className={styles.modal}>
    <Loginform className={styles.loginWrapper} formCard={styles.formCard} updateUserAuth={updateUserAuth} handleClick={handleClick} />
     </div>}
</div>
  )
}
  }
