import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './SignIn.css';
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// toast.configure();
function SignIn (props) {
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(6, "Password length must be greater than 6 letters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      
     axios.post("https://chatbot-backend-mv63.onrender.com/api/login/",{
       email:values.email,
       password:values.password,
     }).then((res)=>{
      // console.log(res);
      sessionStorage.setItem("logstat",1)
      props.setLogstat(1)
        localStorage.setItem("user_info",JSON.stringify(res.data));
        
       
        console.log("Logged in succesfully");
        toast.success("Logged in succesfully")
        props.setOpenModal(false);


     })
     .catch((err)=>{
          console.log(err);
          
          toast.error(err)
          props.setOpenModal(false);
          
     })
    },
  });

  return (

    
     <>
     
     <div className="form-box1">
   
      <h2>Sign In</h2>
      
      <form className="signin" onSubmit={formik.handleSubmit}>
        <div className="inputfield">
        <span><FaIcons.FaUserTie/></span><label>Email:</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        
        
        <div className="inputfield">
        <span><RiIcons.RiLockPasswordFill/></span><label>Password:</label>
          <input
            name="password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        
        <br/>
        <button className="sgnbutton" type="submit" >Sign In</button>
      </form>
      
    </div>
    

     </> 
    

  );
};

export default SignIn;
