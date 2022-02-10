import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, {useState} from "react";
import { useRouter } from "next/router";

export default function CommentReply(){

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
        `http://localhost:5000/api/posts/${query.id}/comments`,
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
        console.log(myJson);
        setErrStatus(true);
        setErrMessage(myJson.errors[0].msg)
        return;
      }
      console.log("comment saved", myJson)
      reset();
    } catch(err){
      console.log(err);
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="comment">Comment</label>
        <input type="text" {...register("comment", {required: true})} />
        {errStatus && <span>{errMessage}</span>}
        <input type="submit" />
      </form>
    </div>
  )

}
