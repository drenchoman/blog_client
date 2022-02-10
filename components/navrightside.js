import Image from 'next/image'
import styles from '../styles/Nav.module.css'
import nav from '../public/images/nav.svg'

export default function Navrightside({userAuth, updateUserAuth}){

  const handleSubmit = async () => {
    const timeOut = setTimeout(updateUserAuth, 2000);
    localStorage.clear();
    try {
      const req = await fetch(
        'http://localhost:5000/logout',
        {method: 'POST',}
      )

    } catch(err){
      console.log(err);
    }

  }

  if (userAuth){
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
    <a href='/login'>
      <button className={styles.signinButton}>Log in </button>
    </a>
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
    </div>
  )
}
  }
