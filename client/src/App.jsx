import { useState,useEffect } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import Landingpage from './components/landingpage';
import Modal from './components/Login/components/Modal';
function App() {
 
  const [loginsignup, setLoginsignup] = useState(false)
  const toggleLoginModal = () => {
    setLoginsignup(!loginsignup);
  };
  const [logstat, setLogstat] = useState()
  useEffect(()=>{
    if(sessionStorage.getItem("logstat")==null)
   {sessionStorage.setItem("logstat",0)
    setLogstat(0)
  }
  else setLogstat(sessionStorage.getItem("logstat"))
  },[])

  return (
    <div className=' h-[100vh] w-[100vw] '>
      <ToastContainer />
    <Landingpage setloginsignup={toggleLoginModal} logstat={logstat} setLogstat={setLogstat}/> 

{
 loginsignup && <Modal setOpenModal={toggleLoginModal} logstat={logstat} setLogstat={setLogstat}/>
}
     
    </div>
  )
}

export default App
