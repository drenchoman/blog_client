import React, {useState} from 'react'

export default function Longtext({content, limit}){

  const toShow = content.substring(0, limit) + "...";

  if(content.length <= limit) {
    return <p>{content}</p>
  }
  return(
  <div>
    <p>{toShow}</p>
    <button>Read more</button>
  </div>
)
}
