import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/nav'
import Subheader from '../components/subheader'
import script from '../public/images/script.jpg'
import Registerform from '../components/registerform'

function Register({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav text='Ye Olde Diary' />

      <Registerform />

        </div>



  )
}


export default Register