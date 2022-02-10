import Head from 'next/head'
import Image from 'next/image'
import React, {useState, useEffect} from "react";
import styles from '../../styles/Home.module.css'
import Nav from '../../components/nav'
import Subheader from '../../components/subheader'
import Ship from '../../components/ship'
import Rightsidebar from '../../components/rightsidebar'
import Comments from '../../components/comments'
import CommentReply from '../../components/commentReply'
import Blog from '../../components/blog'
import thumb from '../../public/images/thumbpost.svg'
import { useRouter } from "next/router";



function BlogPost({firstpost, comments, userAuth, updateUserAuth}){

  const {query} = useRouter();
  const[currentComments, setCurrentComments]= useState(comments);
  const yearWritten = Math.floor((Math.random() * 1650) + 1);



  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${query.id}/comments`)
    .then((res) => res.json())
    .then((data) => {
      setCurrentComments(data)
    })
  }, [currentComments])


  return(

    <div className={styles.container}>
      <Head>
        <title>{firstpost.title}</title>
        <meta name="description" content={firstpost.content}/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav text='Ye Olde Diary' userAuth={userAuth} updateUserAuth={updateUserAuth} />

      <div className={styles.blogWrapper}>
        <div className={styles.leftsideBar}>
          <Ship className={styles.postImagediv} />
        </div>
        <div className={styles.blogDiv}>
          {firstpost.map((post) => (
            <Blog thumb={thumb} post={post} />


          ))}
          <div className={styles.commentWrapper}>
            <h3>Remarks</h3>
          {currentComments.map((comment) =>(

            <Comments thumb={thumb} comment={comment} />
          ))}
          <CommentReply  />
        </div>

        </div>

        <div className={styles.rightSideBar}>
            {firstpost.map((post) => (
              <Rightsidebar yearWritten={yearWritten} post={post} />
            ))}
        </div>
        </div>



      </div>


)

}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/api/posts');
  const allPosts = await res.json();

  const paths = allPosts.map((post) => ({
    params: {id: post._id},
  }))

  return {paths, fallback: false}
}

export async function getStaticProps({params}) {

  const res = await fetch (`http://localhost:5000/api/posts/${params.id}`);
  const post = await res.json();

  const response = await fetch(`http://localhost:5000/api/posts/${params.id}/comments`);
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
