import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useRouter } from "next/router";
import {useState} from 'react';

export default function Blog({post, thumb}){
  const {query} = useRouter();
  const [likeClicked, setLikeClicked]= useState(false);

  const updateLike = async (e) => {
    const idobject= {
      postid: e.target.id
    }
    const postid = JSON.stringify(idobject)
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    setLikeClicked(!likeClicked);

    try{
      const req = await fetch(
        `http://localhost:5000/api/posts/${query.id}`,
        {
          method: 'PUT',
          body: postid,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
          },
        }
      );
      const myJson = await req.json();
      if(req.status !== 200){

        return;
      }
      
    } catch(err){

    }
  }

  return(
    <div className={styles.blogContainer}>
    <div className={styles.blogHeader}>
      <h2>{post.title}</h2>
    </div>
    <div className={styles.blogContent}>
      <p className={styles.hasDropcap}>{post.content}</p>
    </div>
    <div className={styles.blogfooter}>
      <div className={styles.blogfooterContent}>
        <span>Impressed with your finding?</span>
        <span>Consider giving it a like</span>
      </div>
      <div className={styles.blogfooterLikebutton}>
        <Image
          width={50}
          height={50}
          src={thumb}
          alt='Thumbs up the post'
          id={post._id}
          onClick={updateLike}
        />
      {likeClicked && <div>Thank you good sir</div>}
      </div>
    </div>
  </div>
  )
}
