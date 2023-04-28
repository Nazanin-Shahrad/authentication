import React, { useEffect, useRef, useState } from 'react';
import registerImg from "../img/register.jpg";
import {Link} from 'react-router-dom';


const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

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
        setIsValidUn(USERNAME_REGEX.test(username))
    } ,[username]);

    useEffect(() => {
        setIsValidPsw(PWD_REGEX.test(password));
        setIsMatchPsw(password === matchPsw);
    } ,[password , matchPsw]);

    useEffect(() => {
        setErrorMsg("");
    } ,[username , password]);

    const handleSubmit = async (e) => {
        e.prevetDefault();
        const usernameValidation = USERNAME_REGEX .test(username);
        const passwordValidation = PWD_REGEX.test(password);
        if(!usernameValidation || !passwordValidation){
            setErrorMsg("Please fill out the form");
        }

        try{

        }catch(err){
            
        }
    }

  return (
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

                <form className='flex flex-col space-y-6 justufy-center items-center w-full p-4 my-3'>
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
  )
}

export default Register