import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function SignIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder="random@gmail.com" onChange={(e) => {
                    setUsername(e.target.value);
                }} />    
                <InputBox label={"Password"} placeholder="12345678" onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <Button label={"Sign in"} onClick={async () => {
                try {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password,
                    });
                

                    const token = response.data.token;
                
                    localStorage.setItem("token", "Bearer " + token);
                    navigate("/dashboard");
                    } catch (error) {
                    if (error.response) {
                        if (error.response.status === 400) {
                        alert("Wrong Credentials");
                        } else {
                        alert("An error occurred: " + error.response.data.message);
                        }
                    }
                    }
                }} />
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to='/signup' />
            </div>
        </div>
    </div>
    )
}