import React, { useEffect, useRef, useState } from 'react';
import registerImg from "../img/register.jpg";
import successImg from "../img/success.png";
import {Link} from 'react-router-dom';
import axiosRequest from '../api/axios';


const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const Register = () => {
    const usernameRef = useRef();
   
    const [username , setUsername] = useState('');
    const [isValidUn , setIsValidUn] = useState(false);
    const [userFocus , setUserFocus] = useState(false);

    const [password , setPassword] = useState('');
    const [isValidPsw , setIsValidPsw] = useState(false);
    const [pswFocus , setPswFocus] = useState(false);

    const[matchPsw , SetMatchPsw] = useState('')
    const [isMatchPsw , setIsMatchPsw] = useState(false);

    const [ errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);

    useEffect(()=> {
        usernameRef?.current?.focus();
    } ,[])

    useEffect(() => {
        setIsValidUn(USERNAME_REGEX.test(username));
        
    } ,[username]);

    useEffect(() => {
        setIsValidPsw(PWD_REGEX.test(password));
        setIsMatchPsw(password === matchPsw);
    } ,[password , matchPsw]);

    // useEffect(() => {
    //     setErrorMsg("");
    // } ,[username , password]);

   

    // const handleSubmit = async (e) => {
    //     e.prevetDefault();
    //     console.log("hello")
    //     const usernameValidation = USERNAME_REGEX.test(username);
    //     const passwordValidation = PWD_REGEX.test(password);
    //     if(!usernameValidation || !passwordValidation){
    //         setErrorMsg("Please fill out the form");
    //     }

    //     try{
    //         await axiosRequest.post(
    //             REGISTER_URL,
    //             JSON.stringify({username:username , password:password}),
    //             {
    //                 headers : {"Content-Type": "application/json"},
    //                 withCredentials : true
    //             }
    //         )
    //         console.log("errooooorrrr::::",setErrorMsg);
    //         setSuccess(true);
    //         setUsername("");
    //         setPassword("");
    //         SetMatchPsw("");

    //     }catch(err){
    //         // console.log(err.message);
    //         // if(!err?.response){
    //         //     setErrorMsg("No error recieved from server")
    //         // } else if(err.response?.status === 409){
    //         //     setErrorMsg("this username is already used.")
    //         // } else {
    //         //     setErrorMsg("error happened during registration")
    //         // }
    //         console.log(err);

    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
            const usernameValidation = USERNAME_REGEX.test(username);
            const passwordValidation = PWD_REGEX.test(password);
            if(!usernameValidation || !passwordValidation){
                setErrorMsg("Please fill out the form");
            }
    
       
        try {
            await axiosRequest.post(
                            REGISTER_URL,
                            JSON.stringify({username:username , password:password}),
                            {
                                headers : {"Content-Type": "application/json"},
                                withCredentials : true
                            }
                        )
                        // console.log("errooooorrrr::::",setErrorMsg);
                        setSuccess(true);
                        setUsername("");
                        setPassword("");
                        SetMatchPsw("");
         
        } catch (err) {
          console.log(err);
          console.log(err.message);
            if(!err?.response){
                setErrorMsg("No error recieved from server")
            } else if(err.response?.status === 409){
                setErrorMsg("this username is already used.")
            } else {
                setErrorMsg("error happened during registration")
            }
            console.log(err);
        }
      };

  return (
  <>
  {success ? (
  <section className='h-screen w-full flex justify-center items-center bgBlueGradient'>
    <div className='flex flex-col m-4 justify-center space-y-6 items-center bg-white shadow-sm rounded-md overflow-hidden px-4 pb-14'>
        <img className='h-72 object-contain' src={successImg} alt="" />
        <h1 className='text-[#4AACF3] text-lg sm:text-2xl font-black p-3'>Registered Successfully</h1>
        <Link className='bg-yellow-200 w-52 rounded-md text-gray-800 font-semibold text-center hover:bg-yellow-300 transition-all p-3 inline-block' to="/login">Login to website</Link>
    </div>
  </section>
  ) : ( 
     <section>
        <div className='h-screen w-full flex justify-center items-center bgBlueGradient '>
            <div className='m-3 md:m-0 flex-col p-4 bg-white justify-start items-center w-[400px] rounded-md rounded-md overflow-hidden'>
            {/* <div className='bg-white'> */}
                <p className='text-center text-3xl pl-3 font-black text-cyan-300'>Register</p>
                <div className='flex items-center justify-center'>
                    <div className='w-52 h-52 inline-block'>
                        <img src={registerImg} alt="" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 justufy-center items-center w-full p-4 my-3'>
                {/* <form> */}
                    {errorMsg &&

                        <p className='mt-4 bg-red-200 p-2 text-center w-full rounded-md text-red-700'>server error</p>
                     }
                       <div className='w-full'>
                            <input ref={usernameRef} value={username} onChange={(e) => setUsername(e.target.value) }  onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} className='textInput' placeholder='Enter your username' type='text' /> <p className={` errMsg  ${!isValidUn && userFocus && username ? "visible" : "hidden"}`}>username should be more than 3 charactor</p>
                       </div> 

                        <div className='w-full'>
                            <input 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            onFocus={() => setPswFocus(true)} 
                            onBlur={() => setPswFocus(false)} 
                            className='textInput' 
                            placeholder='Enter your password' 
                            type='password'
                            /> 
                            <p 
                            className={`errMsg ${!isValidPsw && password && pswFocus ? "visible" : "hidden"}`}>password should be at least 8 charactor among number and !&%$#@</p>
                        </div>
                       <div className='w-full'>
                            <input required   value={matchPsw} onChange={(e)=> SetMatchPsw(e.target.value)} className='textInput' placeholder='confirm your password' type='password'/> <p className={`errMsg ${!isMatchPsw && matchPsw ? "visible" : "hidden"}`}>passwords should be the same</p>
                       </div> 
                  <button disabled={!isValidUn || !isValidPsw || !isMatchPsw ? true : false } className='cyanBtn disabled:bg-cyan-200'>Register</button>
                </form>
                <div className='flex justify-center items-center'>
                    <span className='text-gray-500'>Have You Registered Before?</span>
                    <Link to="/login" className='mr-2 text-cyan-400 font-semibold hover:text-cyan-500'>Login</Link>
                </div>
              
            </div>
           
        </div>
    </section>
    
    )}
  
  </>
  )
}

export default Register