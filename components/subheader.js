import styles from '../styles/Home.module.css'
import animations from '../styles/Animations.module.css'


export default function Subheader({text, className}){
  return(
    <div className={className}>
    <div className={`${styles.etchings} ${animations.animateFade}`}>
      <h2 >{text}</h2>
      <p>Rediscover lost texts and gain insight from a forgotten time in history. </p>
    </div>
    </div>
  )
}
