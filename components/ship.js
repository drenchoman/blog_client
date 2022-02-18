import Image from 'next/image'
import animations from '../styles/Animations.module.css'


export default function Ship({shipImage, filter, className}){
  return(
    <div className={`${className} ${animations.animateFade} ${animations.delay1} ${filter} `}>
      <Image
        width={500}
        height={500}
        src={shipImage}
        priority
      />
    </div>
  )
}
