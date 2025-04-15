import { Dashboard } from "./pages/Dashboard"
import { PaymentStatus } from "./pages/PaymentStatus"
import { SendMoney } from "./pages/Send"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/send' element={<SendMoney />} />
        <Route path='/paymentstatus' element={<PaymentStatus />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
