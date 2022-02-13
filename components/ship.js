import shipImage from '../public/images/ship.svg'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import animations from '../styles/Animations.module.css'


export default function Ship(){
  return(
    <div className={`${styles.welcomeImagediv} ${animations.animateFade} ${animations.delay1} `}>
      <Image
        width={500}
        height={500}
        src={shipImage}
      />
    </div>
  )
}
