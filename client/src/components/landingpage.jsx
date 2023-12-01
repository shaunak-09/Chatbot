import React, { useEffect, useState } from "react";
import "./landingpage.css";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import regeneratorRuntime from "regenerator-runtime";
// import {useSpeechSynthesis} from "react-speech-kit"
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const socket = io.connect("https://chatbot-backend-mv63.onrender.com");

function Landingpage(props) {
  const handleclick = () => {
    props.setloginsignup(true);
  };

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [name, setName] = useState("");
  const messageInput = document.getElementById("msginp");
  const text_inp = document.querySelector(".textinp");
  const [Name, setName1] = useState("");
  // const {speak} =useSpeechSynthesis();
  const [receivedmsg, setReceivedmsg] = useState("")

  let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition,
    recognition,
    recording = false;

  var synth = window.speechSynthesis;

  useEffect(()=>{
    console.log(messageList);
  },[messageList])

  useEffect(()=>{
  // console.log(receivedmsg);
  if(receivedmsg!="")
 { var toSpeak = new SpeechSynthesisUtterance(receivedmsg);
  // speak({text:receivedmsg})
  synth.speak(toSpeak);}
  setReceivedmsg("")
  },[receivedmsg])

  useEffect(() => {
    sessionStorage.getItem("name") == null
      ? setName1("")
      : setName1(sessionStorage.getItem("name"));
    // console.log(Name);
  }, []);
  

  useEffect(() => {
    socket.on("user-joined", (Name) => {
      console.log(`${Name} joined the chat`);
      toast.success(`${Name} joined the chat`);
    });

    socket.on("receive_msg", (data) => {
      setReceivedmsg(data.message)
      // console.log(messageList);
      setMessageList((list) => [...list, data]);
   });
  }, [socket]);

 



  const handlerecord = (e) => {
    e.preventDefault();
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.language = "English";
    recording=true;

    recognition.start();
    
    // console.log(messageInput);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;

      //detect when intrim results
      if (event.results[0].isFinal) {
        setCurrentMessage(currentMessage + speechResult);
        // text_inp.innerHTML += "" + speechResult;
        // result.querySelector("p").remove();
      } else {
        if (!document.querySelector(".textinp")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          text_inp.appendChild(interim);
          document.querySelector(".interim").innerHTML = " " + speechResult;
        }
      }
    };

    recognition.onerror = (event) => {
      stopRecording();
      recognition.stop();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  };

  const stopRecording=()=>{
    recognition.stop();
    recording=false;
  }

  const enterchat = () => {
    socket.emit("new-user-joined", name);
    sessionStorage.setItem("name", name);
    setName1(name);
    toast.success("Joined succesfully");
    // document.getElementById("name").disabled = true;
  };
  const logout = () => {
    props.setLogstat(0);
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("logstat");

    toast.success("Logged out successfully");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        author: Name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await  socket.emit("send_msg", messageData);
      // console.log("1");
      setMessageList((list) => [...list, messageData]);
      // messageList.push(messageData)
      
      const token = JSON.parse(localStorage.getItem("user_info")).token;
      axios
        .post(
          "https://chatbot-backend-mv63.onrender.com/api/msg/",
          { message: currentMessage },
          { headers: { "x-access-token": token } }
        )
        .then((res) => {
          console.log(res.data);
          
          setCurrentMessage("");
        
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      {props.logstat == 1 ? (
        <>
          <button
            class="p-3 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={logout}
          >
            LOGOUT
          </button>
          {Name ? (
            <>
              <p className=" text-2xl font-bold bg-black text-white p-3 my-4">Hi {Name}</p>
              <div className="msg-cont  bg-gray-200 w-[50%] p-2 h-[60vh] overflow-y-auto">
                {messageList.map((item, i) => {
                  return item.author == Name ? (
                    <div
                    key={i}
                      // id={Name === item.author ? "you" : "other"}
                      className="msg-1 my-3 text-left  float-right clear-both"
                    >
                      <p className="text-sm">{item.author}</p>
                      <p className="text-lg font-semibold">{item.message}</p>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="msg-2 my-3 text-left float-left clear-both "
                    >
                      <p className=" text-sm">{item.author}</p>
                      <p className="text-lg font-semibold">{item.message}</p>
                    </div>
                  );
                })}
              </div>
              <div className="send">
                <form action="#" id="send-cont">
                  {/* <p>Microphone: {recording ? 'on' : 'off'}</p> */}
                  <input
                    type="text"
                    id="msginp"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                      setCurrentMessage(event.target.value);
                    }}
                  ></input>
                  {/* <button id="record" className="p-2 m-2 bg-blue-950 text-white" onClick={SpeechRecognition.startListening}>Record</button> */}

                  <button
                    onClick={(e)=>handlerecord(e)}
                    className="p-2 m-2 bg-blue-950 text-white"
                  >
                    Record
                  </button>
                  <button
                    id="record"
                    className="p-2 m-2 bg-blue-950 text-white"
                    onClick={stopRecording}
                  >
                    Stop
                  </button>
                  <p className="textinp"></p>
                  <button
                    className="btn bg-green-500 p-3 m-2 font-bold "
                    type="submit"
                    onClick={(e) => sendMessage(e)}
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>

              <button onClick={enterchat} className="p-3 bg-gray-200 font-bold text-lg my-3">Join</button>
            </>
          )}
        </>
      ) : (
        <>
          <button
            class="p-3 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={handleclick}
          >
            SIGNIN
          </button>
        </>
      )}
    </div>
  );
}

export default Landingpage;
