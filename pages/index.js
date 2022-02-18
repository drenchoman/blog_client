import Head from 'next/head'
import styles from '../styles/Home.module.css'
import animations from '../styles/Animations.module.css'
import Subheader from '../components/subheader'
import {useEffect} from 'react'
import script from '../public/images/script.jpg'
import Post from '../components/post'
import Ship from '../components/ship'
import Topblogs from '../components/topblogs'
import shipImage from '../public/images/vintageship-min.svg'
import blueShip from '../public/images/chair.svg'

function Home({posts, topPosts, userAuth, updateUserAuth}) {

const topThreePosts = topPosts.slice(0, 3);

  return (
    <>
      <Head>
        <title>Ye Olde Diary | Etchings From Premodernity</title>
        <meta name="description" content="Rediscover lost texts and gain insight from a forgotten time in history" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
         <link rel="manifest" href="/site.webmanifest" />
         <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff3c9" />
         <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={styles.container}>
      <div className={styles.welcomeWrapper}>
        <div className={styles.welcomeContainer}>
        <Subheader text='Etchings From Premodernity' />
        <Ship shipImage={shipImage} className={styles.welcomeImagediv} />
        </div>
        <div className={styles.topPostsWrapper}>
          <h3 className={`${animations.animateFade} ${animations.delay2}`}>Top Volumes</h3>
        {topThreePosts.map((tp, index) => (
          <Topblogs post={tp} key={index} />
        ))}
        </div>

      </div>
      <hr/>
      <Ship shipImage={blueShip} className={styles.welcomeImagediv} />
      <hr/>
      <div className={styles.postsWrapper}>
        <div className={styles.postsHeader}>
          <h3>All Volumes</h3>
        </div>
        <div className={styles.allPosts}>

        {posts.map((post, index) => (
          <Post key={index} post={post} />

        ))}

        </div>

        </div>

    </div>
  </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://glacial-thicket-60246.herokuapp.com/api/posts');
  const posts = await res.json();

  const response = await fetch('https://glacial-thicket-60246.herokuapp.com/api/posts/top');
  const topPosts = await response.json();

  return{
    props:{
      posts,
      topPosts,
    },
    revalidate: 2,
  }
}


export default Home
