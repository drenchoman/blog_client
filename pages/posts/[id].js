import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Nav from '../../components/nav'
import Subheader from '../../components/subheader'
import Ship from '../../components/ship'
import Rightsidebar from '../../components/rightsidebar'
import Comments from '../../components/comments'
import thumb from '../../public/images/thumbpost.svg'


function BlogPost({firstpost, comments}){
  return(

    <div className={styles.container}>
      <Head>
        <title>{firstpost.title}</title>
        <meta name="description" content={firstpost.content}/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav text='Ye Olde Diary' />

      <div className={styles.blogWrapper}>
        <div className={styles.leftsideBar}>
          <Ship className={styles.postImagediv} />
        </div>
        <div className={styles.blogDiv}>
          {firstpost.map((post) => (
            <div className={styles.blogContainer}>
            <div className={styles.blogHeader}>
              <h2>{post.title}</h2>
            </div>
            <div className={styles.blogContent}>
              <p className={styles.hasDropcap}>{post.content}</p>
            </div>
            <div className={styles.blogfooter}>
              <div className={styles.blogfooterContent}>
                <span>Impressed with your finding?</span>
                <span>Consider giving it a like</span>
              </div>
              <div className={styles.blogfooterLikebutton}>
                <Image
                  width={50}
                  height={50}
                  src={thumb}
                  alt='Thumbs up the post'
                />
              </div>
            </div>
          </div>

          ))}
          <div className={styles.commentWrapper}>
            <h3>Remarks</h3>
          {comments.map((comment) =>(

            <Comments comment={comment} />
          ))}
        </div>

        </div>

        <div className={styles.rightSideBar}>
            {firstpost.map((post) => (
              <Rightsidebar post={post} />
            ))}
        </div>
        </div>



      </div>


)

}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/api/posts');
  const allPosts = await res.json();

  const paths = allPosts.map((post) => ({
    params: {id: post._id},
  }))

  return {paths, fallback: false}
}

export async function getStaticProps({params}) {

  const res = await fetch (`http://localhost:5000/api/posts/${params.id}`);
  const post = await res.json();

  const response = await fetch(`http://localhost:5000/api/posts/${params.id}/comments`);
  const comments = await response.json();


  const firstpost= post.post

  return{
    props:{
    firstpost,
    comments,
  },
}
}

export default BlogPost
