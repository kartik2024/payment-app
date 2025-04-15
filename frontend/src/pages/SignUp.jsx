import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios';



export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


    return(
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => {
              setFirstName(e.target.value);
            }}label={"First Name"} placeholder="John" />
          <InputBox onChange={(e) => {
              setLastName(e.target.value);
            }}label={"Last Name"} placeholder="Doe" />
          <InputBox onChange={(e) => {
              setEmail(e.target.value);
            }}label={"Email"} placeholder="random@gmail.com" />
          <InputBox onChange={(e) => {
              setPassword(e.target.value);
            }}label={"Password"} placeholder="12345678" />
          <Button label={"Sign up"} onClick={async () => {
             const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
              username: email,
              firstname: firstName,
              lastname: lastName,
              password: password
            })
            const token = response.data.token;
            localStorage.setItem('token', "Bearer " + token)
            navigate('/dashboard')
          }} />
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to='/signin' />
        </div>
      </div>
    </div>
    )
}


