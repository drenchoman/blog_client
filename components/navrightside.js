import Image from 'next/image';
import styles from '../styles/Nav.module.css';
import nav from '../public/images/nav.svg';
import { useEffect, useState } from 'react';
import Loginform from '../components/loginform'

export default function Navrightside({userAuth, updateUserAuth}){

  const [userAuthenticated, setuserAuthenticated] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);

  const handleClick = () => {
    setLoginChecked(!loginChecked)
  };

  useEffect(()=>{
    setuserAuthenticated(userAuth)
  },[userAuth])

  const handleSubmit = async () => {
    // const timeOut = setTimeout(updateUserAuth, 1000);
    localStorage.clear();
    updateUserAuth(false);
    localStorage.setItem("userAuth", false);

    try {
      const req = await fetch(
        'http://localhost:5000/api/logout',
        {method: 'POST',}
      )

    } catch(err){
      console.log(err);
    }

  }

  if (userAuthenticated){
    return (
      <div className={styles.signin}>
        <button className={styles.logoutButton} onClick={handleSubmit}> Log out </button>
      <div className={styles.navBurger}>
        <Image
        width={40}
        height={40}
        src={nav}
        />
        </div>
      </div>
    )
  } else { return (
    <div className={styles.signIn}>
      <button onClick={handleClick} className={styles.signinButton}>Log in </button>
    <a href='/register'>
      <button className={styles.registerButton}>Register </button>
    </a>
    <div className={styles.navBurger}>
      <Image
      width={40}
      height={40}
      src={nav}
      />
      </div>
      {loginChecked && <Loginform className={styles.loginWrapper} formCard={styles.formCard} updateUserAuth={updateUserAuth}/>}
    </div>
  )
}
  }
