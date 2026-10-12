import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
function App(){
  return(
    <BrowserRouter>
            <h1>Student Management System</h1>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Dashboard/>} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;