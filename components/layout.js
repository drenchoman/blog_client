import Nav from '../components/nav'
import Footer from '../components/footer'

export default function Layout({children, userAuth, updateUserAuth }) {

  return(
    <>
    <Nav text='Ye Olde Diary' userAuth={userAuth} updateUserAuth={updateUserAuth} />
    <main>{children}</main>
    <Footer/>
    </>
  )
}
