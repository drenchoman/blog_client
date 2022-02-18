import React, {useState} from "react";
import styles from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export default function Loginform({updateUserAuth, className, formCard, redirect}){
  const router = useRouter();
  const [logErr, setLogErr] = useState(false);
  const [errMessage, setErrMessage] = useState('')


  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const submitForm = async (data, e) => {

   const formData = JSON.stringify(data);
   try {
     const req = await fetch(
       'https://glacial-thicket-60246.herokuapp.com/api/login',
       {
         method: 'post',
         body: formData,
         headers: {
           'Content-Type': 'application/json'
         },
       }
     );
     const myJson = await req.json();

     if (req.status !== 200){
       setErrMessage(myJson.info.message);
       setLogErr(true);
       return;
     }
     await updateUserAuth(true);
     await localStorage.setItem("token", myJson.token);
     await localStorage.setItem("userAuth", true);
     await localStorage.setItem("username", myJson.body.username);
     await localStorage.setItem("id", myJson.body._id);

     if(redirect){
       router.push('/')
     }
   } catch(err){
     console.log(err);
   }
};


  return(
    <div className={className}>
      <h2>Login</h2>
      <div className={formCard}>

      <form className={styles.formRegister} onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="username">Username</label>
        <input className={`${errors.username ? styles.isInvalid : styles.valid}`} placeholder="Thomas Aquinas" {...register("username")}  />
          <div className={`${errors.username ? styles.isInvalid : ''}`}>{errors.username?.message}</div>

        <label  htmlFor="password">Password</label>
        <input className={`${errors.password ? styles.isInvalid : styles.valid}`} placeholder="Hunter2" type="password" {...register("password")} />
          <div className={`${errors.password ? styles.isInvalid : ''}`}>{errors.password?.message}</div>
        <input className={styles.submit} type="submit" />
        {logErr && <span>{errMessage}</span>}
      </form>
      </div>
    </div>

  )
}
