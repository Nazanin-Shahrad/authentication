import React, { useEffect, useRef, useState } from "react";
import loginImg from "../img/login.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosRequest from '../api/axios';
import useAuth from "./../hooks/useAuth";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = "/auth/login";

const Login = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [isValidUn, setIsValidUn] = useState(false);
  const [unFocus, setUnFocus] = useState(false);

  const [password , setPassword] = useState('');
    const [isValidPsw , setIsValidPsw] = useState(false);
    const [pswFocus , setPswFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);

  useEffect(() => {
    setIsValidUn(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setIsValidPsw(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosRequest.post(LOGIN_URL , JSON.stringify
        ({username , password}),
        {
          headers : { " Content-Type":"application/json"},
          withCredentials: true
        })

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({username , roles , accessToken});
        setUsername("");
        setPassword("");
        navigate(from ,{replace : true})

    }catch(err){
      if(!err?.response){
        setErrMsg("No response from server side!")
      } else if (err.response?.status === 400){
        setErrMsg("username and password can not be empty!")

      }else if (err.response?.status === 401){
        setErrMsg("username or password is not correct")
      } else {
        setErrMsg("error happend in login time")
      }

    }
   
     
  };

  return (
    <section>
      <div className="h-screen w-full flex justify-center items-center bgBlueGradient ">
        <div className="m-3 md:m-0 flex flex-col p-4 bg-white justify-start items-center w-[400px] rounded-md shadow-md overflow-hidden">
          <p className="text-center text-3xl pt-3 font-black text-cyan-300">
            Login Site
          </p>
          <div className="flex items-center justify-center">
            <div className="w-52 h-52 inline-block">
              <img src={loginImg} alt="" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 justify-center items-center w-full p-4 my-3"
          >
            {errMsg && (
              <p className="mt-4 bg-red-200 p-2 text-center w-full rounded-md text-red-700">
               Server Error
              </p>
            )}
            <div className="w-full">
              <input
                ref={usernameRef}
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUnFocus(true)}
                onBlur={() => setUnFocus(false)}
                className="textInput"
                placeholder=" username "
                type="text"
              />
              <p
                className={`errMsg ${
                  !isValidUn && unFocus && username ? "visible" : "hidden"
                }`}
              >
                username should be more than 3 character
              </p>
            </div>
            <div className="w-full">
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPswFocus(true)}
                onBlur={() => setPswFocus(false)}
                className="textInput"
                placeholder="password"
                type="password"
              />
              <p
                className={`errMsg ${
                  !isValidPsw && password && pswFocus ? "visible" : "hidden"
                }`}
              >
               Password should be at least 8 character and includes !@#$%&
              </p>
            </div>

            <button
              disabled={!isValidUn || !isValidPsw ? true : false}
              className="cyanBtn disabled:bg-cyan-200"
            >
              Login to your Account
            </button>
          </form>
          <div className="flex justify-center items-center">
            <span className="text-gray-500"> Don't have Account </span>
            <Link
              className="mr-2 text-cyan-400 font-semibold hover:text-cyan-500"
              to="/register"
            >
             Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;