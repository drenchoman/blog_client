import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, {useState} from "react";
import { useRouter } from "next/router";
import styles from '../styles/Comment.module.css'
import Image from 'next/image'

export default function CommentReply({userAuth}){

  const {register, handleSubmit, reset, formState } = useForm();
  const {errors} = formState;
  const {query} = useRouter();
  const [errMessage, setErrMessage]=useState('');
  const [errStatus, setErrStatus]= useState(false);

  const submitForm = async (data, e) => {
    const formData = JSON.stringify(data);
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;

    try{
      const req = await fetch(
        `https://glacial-thicket-60246.herokuapp.com/api/posts/${query.id}/comments`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
          },
        }
      );
      const myJson = await req.json();
      if (req.status !== 200){
        setErrStatus(true);
        setErrMessage(myJson.errors[0].msg)
        return;
      }
      reset();
    } catch(err){
    }
  }

  return(
    <div className={styles.replyWrapper}>
    {userAuth &&
      <form className={styles.commentReply} onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="comment">Your Comment:</label>
        <input type="text" {...register("comment", {required: true})} />
        {errStatus && <span>{errMessage}</span>}
        <input className={styles.submitButton} type="submit" />
      </form>
    }
    </div>
  )

}
