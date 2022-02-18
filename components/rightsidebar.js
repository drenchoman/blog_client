import styles from '../styles/Rightsidebar.module.css'
import {useState} from "react";

export default function Rightsidebar({post, yearWritten}){
  const date = new Date(post.timeStamp);
  const date_formatted = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
  const [yWritten, setYWritten] = useState(yearWritten)

  return(
    <div className={styles.rightSideContent}>
      <span>An etching by <b>{post.user.username}</b> </span>
      <span>Discovered on {date_formatted} </span>
      <span>Estimated year written <strong>{yWritten} AD</strong> </span>
    </div>
  )
}
