import styles from '../styles/Subheader.module.css'
import animations from '../styles/Animations.module.css'


export default function Subheader({text}){
  return(
    <div className={styles.subheaderDiv}>
    <div className={`${styles.etchings} ${animations.animateFade}`}>
      <h1>{text}</h1>
      <p>Rediscover lost texts and gain insight from a forgotten time in history. </p>
    </div>
    </div>
  )
}
