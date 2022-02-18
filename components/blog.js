import styles from '../styles/Blog.module.css'
import Image from 'next/image'
import { useRouter } from "next/router";
import {useState, useEffect} from 'react';

export default function Blog({post, thumb, userAuth}){
  const {query} = useRouter();
  const [likeClicked, setLikeClicked]= useState(false);
  const [isAuthorised, setIsAuthorised]= useState(userAuth)
  const [message, setMessage]=useState('');
  const [warning, setWarning]=useState(false);

  const checkIfLiked = (id) => {
    if(post.likes.includes(id)){
      setLikeClicked(true);
    } else{
      setLikeClicked(false);
    }
  };

  const checkLoggedIn = () =>{
    if(userAuth){
      setWarning(false);
      setMessage('');
    } else{
      setIsAuthorised(userAuth)
    }
  }


  useEffect(() => {
    const id = localStorage.getItem("id");
    checkIfLiked(id)
    checkLoggedIn();
  }, [userAuth])

  const updateLike = async (e) => {
    if(!isAuthorised){
      setMessage('Log in to add a like')
      setWarning(true);
      return;
    }
    setLikeClicked(!likeClicked);
    const idobject= {
      postid: e.target.id
    }
    const postid = JSON.stringify(idobject)
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;


    try{
      const req = await fetch(
        `https://glacial-thicket-60246.herokuapp.com/api/posts/${query.id}`,
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
      <div className={likeClicked ? styles.blogfooterLikebuttonLiked : styles.blogfooterLikebutton}>
        <Image
          width={50}
          height={50}
          src={thumb}
          alt='Thumbs up the post'
          id={post._id}
          onClick={updateLike}
        />
      {likeClicked && <div className={styles.thankyou}>Merci!</div>}
      {warning && <div>{message}</div>}
      </div>
    </div>
  </div>
  )
}
