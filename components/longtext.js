import React, {useState} from 'react'
import styles from '../styles/Post.module.css'
import Link from 'next/link'
export default function Longtext({content, limit, link}){

  const toShow = content.substring(0, limit) + "...";

  if(content.length <= limit) {
    return <p> {content}</p>
  }
  return(
  <div className={styles.longTextWrapper}>
    <p>{toShow}</p>
    <Link className={styles.longTextLink} href={link}>
    Read more
    </Link>
  </div>
)
}
