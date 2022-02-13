import styles from '../styles/Post.module.css'
import Longtext from '../components/longtext'
import animations from '../styles/Animations.module.css'
import Link from 'next/link'

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
    </div>
    </div>

)
}
