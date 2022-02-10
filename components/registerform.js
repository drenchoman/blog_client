import React, {useState} from "react";
import styles from "../styles/Register.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Registerform(){

  const [regErr, setRegErr] = useState(false);
  const [errMessage, setErrMessage] = useState('')

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')],'Passwords must match')
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const submitForm = async (data, e) => {
   const formData = JSON.stringify(data);
   try {
     const req = await fetch(
       'http://localhost:5000/api/register',
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
       setErrMessage(myJson.errors[0].msg);
       setRegErr(true);
       return;
     }
     console.log("SAVED", data)
     reset();
     window.location.href = '/login'
   } catch(err){
     console.log(err);
   }
};


  return(
    <div className={styles.formWrapper}>
      <h2>Register</h2>
      <div className={styles.formCard}>

      <form className={styles.formRegister} onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="username">Username</label>
        <input className={`${errors.username ? styles.isInvalid : ''}`} placeholder="Thomas Aquinas" {...register("username")}  />
          <div className={`${errors.username ? styles.isInvalid : ''}`}>{errors.username?.message}</div>

        <label  htmlFor="password">Password</label>
        <input className={`${errors.password ? styles.isInvalid : ''}`} placeholder="Hunter2" type="password" {...register("password")} />
          <div className={`${errors.password ? styles.isInvalid : ''}`}>{errors.password?.message}</div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input className={`${errors.confirmPassword ? styles.isInvalid: ''}`} placeholder="Hunter2" type="password" {...register("confirmPassword")} />
          <div className={`${errors.confirmPassword ? styles.isInvalid: ''}`}>{errors.confirmPassword?.message}</div>
        <input className={styles.submit} type="submit" />
        {regErr && <span>{errMessage}</span>}
      </form>
      </div>
    </div>

  )
}
