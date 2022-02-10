import React, {useState} from "react";
import styles from "../styles/Register.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Loginform({updateUserAuth}){

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
       'http://localhost:5000/api/login',
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
     console.log("SAVED", myJson)
     localStorage.setItem("token", myJson.token)
     localStorage.setItem("userAuth", true);
     localStorage.setItem("username", myJson.body.username);
     localStorage.setItem("id", myJson.body._id)
     updateUserAuth();
     reset();
     window.location.href = '/'

   } catch(err){
     console.log(err);
   }
};


  return(
    <div className={styles.formWrapper}>
      <h2>Login</h2>
      <div className={styles.formCard}>

      <form className={styles.formRegister} onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="username">Username</label>
        <input className={`${errors.username ? styles.isInvalid : ''}`} placeholder="Thomas Aquinas" {...register("username")}  />
          <div className={`${errors.username ? styles.isInvalid : ''}`}>{errors.username?.message}</div>

        <label  htmlFor="password">Password</label>
        <input className={`${errors.password ? styles.isInvalid : ''}`} placeholder="Hunter2" type="password" {...register("password")} />
          <div className={`${errors.password ? styles.isInvalid : ''}`}>{errors.password?.message}</div>
        <input className={styles.submit} type="submit" />
        {logErr && <span>{errMessage}</span>}
      </form>
      </div>
    </div>

  )
}
