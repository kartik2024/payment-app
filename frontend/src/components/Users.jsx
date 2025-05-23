import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");


    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
            headers: {
                "Authorization": token
            }
        })
            .then((response) => {
                setUsers(response.data.user);
            })
    }, [filter])


return (
    <>
        <div className="font-bold mt-6 text-lg">Users</div>
        <div className="mt-4 mb-10">
        <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={(e) => {
            setFilter(e.target.value);
        }}/>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
    );
};
    
function User({ user }) {
    const navigate = useNavigate();

    return (
    <div className="flex justify-between">
        <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <div>
            {user.firstname}
            </div>
        </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} onClick={() => {
            navigate('/send?id=' + user._id + '&name=' + user.firstname);
        }}/>
        </div>
    </div>
    );
}
