import styles from '../styles/Topblogs.module.css'
import Longtext from '../components/longtext'
import animations from '../styles/Animations.module.css'
import Link from 'next/link'
import commentImage from '../public/images/comment.svg'
import Image from 'next/image'

export default function Topblogs({post, index}){

  const date = new Date(post.timeStamp);
  const date_formatted = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',

  });
return(
    <div key={index} className={`${styles.topCard} ${animations.animateFade} ${animations.delay3}`}>
      <div>
      <Link href={'/posts/' + post._id}>
      <a>
        <h4 className={styles.cardTitle}>{post.title}</h4>
        </a>
      </Link>
    </div>
    <Longtext limit={55} content={post.content} link={'/posts/' + post._id} />
    <div className={styles.authorinfo}>
      <span><strong>{post.user.username}</strong></span>
      <span><b>Discovered {date_formatted} </b></span>
      <div className={styles.commentWrapper}>
        <Image
        src={commentImage}
        width={20}
        height={20}
        alt='Comments'
         />
         <span>{post.comments.length} </span>
      </div>
    </div>

    </div>

)
}
