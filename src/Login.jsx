import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
      const navigate = useNavigate();
      const [loginUser,setLoginUser] = useState({
            email:"",
            password:""
      });
      const handleChange=(e)=>{
            setLoginUser({
                  ...loginUser,
                  [e.target.name]:e.target.value
            });
      };
      async function submit(){
            try{
                  const response = await axios.post("https://sms-ab-backend.onrender.com/students/login",loginUser);

                  console.log(response.data);
                  localStorage.setItem("token",response.data.token);

                  alert("User login successfull");
                  navigate("/home");
            }catch(err){
                  alert("Email or Password is Wrong");
            }
      }
      return(
            <>
                  <h1>Login Page</h1>
                  <input 
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  />
                  <input 
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  />
                  <button onClick={submit}>Login</button>
                  <p>
                        <a href="/register">new user?</a>
                  </p>
            </>
      );
}
export default Login;