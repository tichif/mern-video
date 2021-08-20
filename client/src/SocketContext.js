import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

// create the context
const SocketContext = createContext();

// initiate the socket
const socket = io('http://localhost:5000');

// create a React Context Provide
const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});

  const myVideo = useRef();

  useEffect(() => {
    // use the navigator to use the webcam and the microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({
        isReceivedCall: true,
        from,
        name: callerName,
        signal,
      });
    });
  }, []);

  // create all the functions for the video calls
  const answerCall = () => {};

  const callUSer = () => {};

  const leaveCall = () => {};
};
