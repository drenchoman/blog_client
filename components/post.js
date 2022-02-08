import styles from '../styles/Post.module.css'
import Longtext from '../components/longtext'

function Post({post}) {
const date = new Date(post.timeStamp);
const date_formatted = date.toLocaleDateString('en-GB', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',

});

  return(
  <div key={post._id} className={styles.card}>
    <div className={styles.cardTitle}>
      <a href={'/posts/' + post._id}>
        <h4 className={styles.cardTitle}>{post.title}</h4>
      </a>
    </div>
    <Longtext limit={30} content={post.content} link={'/posts/' + post._id} />
    <div className={styles.authorinfo}>
      <span><strong>{post.user.username}</strong></span>
      <span><b>Discovered {date_formatted} </b></span>
    </div>
  </div>
)
}

export default Post