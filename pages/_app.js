import '../styles/Oldbook.css'
import {useEffect, useState} from 'react'

function MyApp({ Component, pageProps }) {
  const [userAuth, setUserAuth]= useState(() =>{
    if (typeof window !== 'undefined'){
      const user = localStorage.getItem("userAuth");
      const init = JSON.parse(user);
      return init || false;
    }
  });

const updateUserAuth = () => {
  setUserAuth(!userAuth)
  localStorage.setItem("userAuth", userAuth)



};

  return <Component {...pageProps} updateUserAuth={updateUserAuth} userAuth={userAuth} />
}

export default MyApp
