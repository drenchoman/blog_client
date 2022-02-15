import '../styles/Oldbook.css'
import {useEffect, useState} from 'react'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  const [userAuth, setUserAuth]= useState(() =>{
    if (typeof window !== 'undefined'){
      const user = localStorage.getItem("userAuth");
      const init = JSON.parse(user);
      return init || false;
    }
  });

  useEffect(() =>{
    let isMounted = true;
    (async () => {
    if (isMounted) {
        await localStorage.setItem("userAuth", JSON.stringify(userAuth))
      }
    })()
    return () => isMounted = false;
  }, [userAuth])

const updateUserAuth = (boolean) => {
  setUserAuth(boolean)

};

  return <Layout userAuth={userAuth} updateUserAuth={updateUserAuth}>
          <Component {...pageProps} updateUserAuth={updateUserAuth} userAuth={userAuth} />
          </Layout>
}

export default MyApp
