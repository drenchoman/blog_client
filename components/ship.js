import shipImage from '../public/images/ship.svg'
import Image from 'next/image'


export default function Shop({className}){
  return(
    <div className={className}>
      <Image
        width={500}
        height={500}
        src={shipImage}
      />
    </div>
  )
}
