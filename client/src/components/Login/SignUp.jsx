import React, {useState,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const SignUp = (props) => {
  
 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
      mobile: "",
    
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      mobile: Yup.number()
        .min(1000000000,"Enter A valid Phone Number")
        .max(9999999999,"Enter A valid Phone Number")
        .typeError("That doesn't look like a phone number")
        // .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password length must be greater than 8 letters")
        .required("Required"),
      cPassword: Yup.string()
        .min(8, "Password length must be greater than 8 letters")
        .required("Required")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        
    }),
    onSubmit: (values) => {
     
      const req = {
          username: values.name,
          email: values.email,
          password: values.password,
          mobile: values.mobile
      }
      axios.post("https://chatbot-backend-mv63.onrender.com/api/signup/", {
        username: values.name,
        email: values.email,
        password: values.password,
        mobile: values.mobile
    })
      .then((res)=>{
         localStorage.setItem("user_info",JSON.stringify(res.data))
         sessionStorage.setItem("logstat",1)
         props.setLogstat(1)
         toast.success("Successfully Signed up ")
         props.setOpenModal(false)
      })
      .catch((err)=>{
           console.log(err);
          //  toast.error(JSON.stringify(err.response.data))
           props.setOpenModal(false)
      })
  },
});

  
  return (
    <div className="form-box">
      
      <h2>SignUp </h2>
      <br/>
      <form onSubmit={formik.handleSubmit} className="signup">
        <div className="inputfield">
        <label>Name </label>
          <input
            type="text"
            name="name"
            required
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          
        </div>

        {formik.touched.name && formik.errors.name ? (
          <p>{formik.errors.name}</p>
        ) : null}
        <br />

        <div className="inputfield">
        <label>Email </label>
          <input
            type="email"
            name="email"
            
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
        <br />

        <div className="inputfield">
        <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            required
            autoComplete="off"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          
        </div>

        {formik.touched.mobile && formik.errors.mobile ? (
          <p>{formik.errors.mobile}</p>
        ) : null}
        <br />




        <div className="inputfield">
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
         
        </div>


        {formik.touched.password && formik.errors.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        <br />

        <div className="inputfield">
          <label>Confirm Password </label>
          <input
            type="password"
            name="cPassword"
            autoComplete="off"
            required
            value={formik.values.cPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
         
        </div>

        {formik.touched.cPassword && formik.errors.cPassword ? (
          <p>{formik.errors.cPassword}</p>
        ) : null}
        <br />
          <br/>
         


        <button className="sgnbutton" type="submit" >Sign Up</button>
        
      </form>
      
    </div>
  );
};

export default SignUp;
