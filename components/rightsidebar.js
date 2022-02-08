import styles from '../styles/Post.module.css'

export default function Rightsidebar({post}){
  const date = new Date(post.timeStamp);
  const date_formatted = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
  const yearWritten = Math.floor((Math.random() * 1650) + 1);

  return(
    <div className={styles.rightSideContent}>
      <span>An etching by <b>{post.user.username}</b> </span>
      <span>Discovered on {date_formatted} </span>
      <span>Estimated year written <strong>{yearWritten} AD</strong> </span>
    </div>
  )
}
