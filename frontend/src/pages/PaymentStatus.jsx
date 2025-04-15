import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const PaymentStatus = () => {

  const navigate = useNavigate();


  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="bg-green-300 md:w-1/4 text-center py-10 px-5 m-4 text-green-900 font-bold text-3xl">
        Money Sent
        <div className="text-center text-black text-sm font-semibold py-4">
            <Button label={"Go back"} onClick={() => {
                navigate('/dashboard')
            }} />
        </div>
      </div>
    </div>
  );
};