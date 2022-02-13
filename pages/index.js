import Head from 'next/head'
import styles from '../styles/Home.module.css'
import animations from '../styles/Animations.module.css'
import Subheader from '../components/subheader'
import {useEffect} from 'react'
import script from '../public/images/script.jpg'
import Post from '../components/post'
import Ship from '../components/ship'
import Topblogs from '../components/topblogs'

function Home({posts, topPosts, userAuth, updateUserAuth}) {

const topThreePosts = topPosts.slice(0, 3);

  return (
    <>
      <Head>
        <title>Ye Olde Diary</title>
        <meta name="description" content="Rediscover lost texts and gain insight from a forgotten time in history" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className={styles.container}>
      <div className={styles.welcomeWrapper}>
        <div className={styles.welcomeContainer}>
        <Subheader className={styles.subheaderDiv} text='Etchings From Premodernity' />
        <Ship />
        </div>
        <div className={styles.topPostsWrapper}>
          <h3 className={`${animations.animateFade} ${animations.delay2}`}>Top Volumes</h3>
        {topThreePosts.map((tp, index) => (
          <Topblogs post={tp} key={index} />
        ))}
        </div>

      </div>
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
  }
}


export default Home
