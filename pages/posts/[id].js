import Head from 'next/head'
import Image from 'next/image'
import React, {useState, useEffect, useRef} from "react";
import styles from '../../styles/Home.module.css'
import Subheader from '../../components/subheader'
import Ship from '../../components/ship'
import Rightsidebar from '../../components/rightsidebar'
import Comments from '../../components/comments'
import CommentReply from '../../components/commentReply'
import Blog from '../../components/blog'
import thumb from '../../public/images/thumbpost.svg'
import home from '../../public/images/home.svg'
import { useRouter } from "next/router";
import shipImage from '../../public/images/vintageship-min.svg'
import chair from '../../public/images/sadoldman.svg'
import Loginform from '../../components/loginform'
import Link from 'next/link'


function BlogPost({firstpost, comments, userAuth, updateUserAuth}){

  const {query} = useRouter();
  const[currentComments, setCurrentComments]= useState(comments);
  const [loginChecked, setLoginChecked]= useState(false)
  const yearWritten = Math.floor((Math.random() * 1650) + 1);

  const handleClick = () => {
    setLoginChecked(!loginChecked)
  }


  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(`https://glacial-thicket-60246.herokuapp.com/api/posts/${query.id}/comments`);
        if (mounted) {
          // Only update comments if mounted // perhaps use AbortController in future
          const data = await res.json();
          setCurrentComments(data);
        }
    })()

    // Clean up function of unmounted
    return () => mounted = false;

  }, [currentComments])



  return(
    <>
      <Head>
        <title>{firstpost.title}</title>
        <meta name="description" content={firstpost.content}/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
         <link rel="manifest" href="/site.webmanifest" />
         <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff3c9" />
         <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={styles.container}>
      <div className={styles.blogWrapper}>
        <div className={styles.leftsideBar}>
          <Ship className={styles.postImagediv} shipImage={shipImage} />
        </div>
        <div className={styles.blogDiv}>
          {firstpost.map((post, index) => (
            <Blog key={index} thumb={thumb} post={post} userAuth={userAuth} />


          ))}
          <div className={styles.commentWrapper}>
          {!userAuth && <div className={styles.commentHelpWrapper}>

             <div className={styles.commentHelp}>
            <span>To submit a comment- please log in or register </span>
            </div>
            <div className={styles.commentHelpButtons}>
            <Link href='/register'>
            <a>
              <button className={styles.helpButtons}>Register </button>
              </a>
            </Link>
              <button className={styles.helpButtons} onClick={handleClick}>Log in </button>


            </div>
            {loginChecked &&
              <Loginform className={styles.loginComments} loginForm={styles.formCard}  updateUserAuth={updateUserAuth}/>
            }
          </div> }

            <h3>Remarks</h3>
          {currentComments.map((comment, index) =>(

            <Comments userAuth={userAuth} key={index} thumb={thumb} comment={comment} />
          ))}
          <CommentReply userAuth={userAuth}  />


          <Ship className={styles.sadmanImage} shipImage={chair} />
          <Link href='/'>
            <a className={styles.homeButton}>
              <Image
              width={60}
              height={60}
              alt='Home button'
              src={home}
              />
            </a>
          </Link>

        </div>


        </div>

        <div className={styles.rightSideBar}>
            {firstpost.map((post, index) => (
              <Rightsidebar key={index} yearWritten={yearWritten} post={post} />
            ))}
        </div>
        </div>



      </div>
</>

)

}

export async function getStaticPaths() {
  const res = await fetch('https://glacial-thicket-60246.herokuapp.com/api/posts');
  const allPosts = await res.json();

  const paths = allPosts.map((post) => ({
    params: {id: post._id},
  }))

  return {paths, fallback: false}
}

export async function getStaticProps({params}) {

  const res = await fetch (`https://glacial-thicket-60246.herokuapp.com/api/posts/${params.id}`);
  const post = await res.json();

  const response = await fetch(`https://glacial-thicket-60246.herokuapp.com/api/posts/${params.id}/comments`);
  const comments = await response.json();


  const firstpost= post.post

  return{
    props:{
    firstpost,
    comments,
  },
  revalidate: 2,
}
}

export default BlogPost
