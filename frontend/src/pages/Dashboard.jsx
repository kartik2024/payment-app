import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Dashboard() {
    const [balance, setBalance] = useState(0); 
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('token');

        if(!userToken) {
            alert("Please sign in");
            navigate('/signin')
        } else {
            axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: userToken
                }
            })
            .then(response => setBalance(response.data.balance))
        }
    }, [navigate])

    return (
        <div>
            <AppBar />
            <div className="m-8">
                <Balance value={balance.toFixed(2)} />
            </div>
            <Users />
        </div>
    )
}