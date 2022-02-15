import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Subheader from '../components/subheader'
import script from '../public/images/script.jpg'
import Registerform from '../components/registerform'

function Register({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ye Old Diary | Register</title>
        <meta name="description" content="Register an account to comment." />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
         <link rel="manifest" href="/site.webmanifest" />
         <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff3c9" />
         <meta name="theme-color" content="#ffffff" />      </Head>

      <Registerform />

        </div>



  )
}


export default Register
