import React, {useState} from 'react'

export default function Longtext({content, limit, link}){

  const toShow = content.substring(0, limit) + "...";

  if(content.length <= limit) {
    return <p> {content}</p>
  }
  return(
  <div>
    <p>{toShow}</p>
    <a href={link}>
    Read more
    </a>
  </div>
)
}
