import styles from '../styles/Comment.module.css'
import Image from 'next/image'
import thumb from '../public/images/thumb.svg'

export default function Comments({comment}){
  const date = new Date(comment.timeStamp);
  const date_formatted = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: "numeric",
    minute: "2-digit",
  });

  return(

    <div className={styles.commentCard}>
      <div>
        <h4>{comment.user.username} says...</h4>
        <p className={styles.commentContent}>{comment.comment}</p>
      </div>
      <div className={styles.likeCount}>
        <span>{comment.likeCount}</span>
      </div>
      <div className={styles.thumbsup}>
        <Image
          width={30}
          height={30}
          src={thumb}
          alt='Thumbs up'
        />
      </div>
      <div className={styles.date}>
        <span>{date_formatted} </span>
      </div>
    </div>

  )
}
