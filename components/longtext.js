import React, {useState} from 'react'
import styles from '../styles/Longtext.module.css'
import Link from 'next/link'
export default function Longtext({content, limit, link}){

  const toShow = content.substring(0, limit) + "...";

  if(content.length <= limit) {
    return <p> {content}</p>
  }
  return(
  <div >
    <p>{toShow}</p>
    <Link href={link}>
    <a>
    Read more
    </a>
    </Link>
  </div>
)
}
