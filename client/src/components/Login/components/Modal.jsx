import React,{useRef,useState} from 'react'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import './Modal.css'

function Modal (props){
  const [active, setActive] = useState("signin");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const modalRef = useRef();
  
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.setOpenModal(false);
    }
  }
  const Modal =() =>{
    if(active === "signin"){
      return <div id='signinm'><SignIn  setOpenModal={props.setOpenModal} setLogstat={props.setLogstat}/>
              
              <h4>Don't have an account? <span onClick={()=>{setActive("signup")}}>Sign Up</span></h4>
              <h4 id="fp" onClick={()=>{setActive("forgot1")}}>Forgot Password?</h4>
            </div>
    }
    else if(active === "signup"){
      return <div id="signupm">
              <SignUp  setOpenModal={props.setOpenModal} setLogstat={props.setLogstat}/>
    
                <h4>Already have an account? <span onClick={()=>{setActive("signin")}}> Sign In</span></h4>
                <br/>
    
            </div>
    }
    
  }
  return (
 
  <div className="sgnmodalBackground" onClick={closeModal} ref={modalRef}>
   
    <div className="sgnmodalContainer">
     
      <div className="sgnmodalclose">
        <button
          onClick={() => {
            props.setOpenModal(false);
          }}
         >
          X
        </button>
      
      </div>
      
      <Modal/>

      
    </div>  
  </div> 
  )
}

export default Modal