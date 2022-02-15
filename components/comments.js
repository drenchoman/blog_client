import styles from '../styles/Comment.module.css'
import Image from 'next/image'
import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";

export default function Comments({comment, thumb, index}){
  const date = new Date(comment.timeStamp);
  const date_formatted = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: "numeric",
    minute: "2-digit",
  });

  const [likeClicked, setLikeClicked]= useState(false);

const checkLikedComments = (id) => {
  if(comment.likes.includes(id)){
    setLikeClicked(true)
  }
};

useEffect(() =>{
  const id = localStorage.getItem("id");
  checkLikedComments(id);
}, [])

const updateLike = async (e) => {
  setLikeClicked(!likeClicked)
  const idobject= {
    commentid: e.target.id
  }
  const commentid = JSON.stringify(idobject)
  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;

  try{
    const req = await fetch(
      `https://glacial-thicket-60246.herokuapp.com/api/comments`,
      {
        method: 'PUT',
        body: commentid,
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


if (comment === 'undefined' || null || comment.length == 0){
  return(
    <div>
    <span> It appears there are no remarks. Hmph. </span>
    <span>{comment}</span>
    </div>
  )
} return (
    <div className={styles.commentCard} key={index}>
      <div>
        <h4>{comment.user.username} says...</h4>
        <p className={styles.commentContent}>{comment.comment}</p>
      </div>
      <div className={styles.likeCount}>
        <span>Likes: {comment.likeCount}</span>
      </div>
      <div className={likeClicked ? styles.likedComment : styles.thumbsup } >

        <Image
          width={30}
          height={30}
          src={thumb}
          alt='Thumbs up'
          type='image'
          name='commentid'
          id={comment._id}
          onClick={updateLike}
        />
     </div>
      <div className={styles.date}>
        <span>{date_formatted} </span>
      </div>
    </div>


  )
}
