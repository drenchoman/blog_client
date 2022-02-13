import Image from 'next/image';
import Link from 'next/link'
import styles from '../styles/Nav.module.css';
import nav from '../public/images/nav.svg';
import x from '../public/images/x.svg';
import { useEffect, useState } from 'react';
import Loginform from '../components/loginform'

export default function Navrightside({userAuth, updateUserAuth, burgerClick, burgerClicked}){

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
        'https://glacial-thicket-60246.herokuapp.com/api/logout',
        {method: 'POST',}
      )

    } catch(err){
      console.log(err);
    }

  }

  if (userAuthenticated){
    return (

      <div className={styles.signIn}>
        <button className={styles.logoutButton} onClick={handleSubmit}> Log out </button>
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
      <button className={styles.registerButton}>Register </button>
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
