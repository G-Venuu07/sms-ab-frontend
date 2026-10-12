import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
      const [users,setUsers] = useState([]);
      const navigate = useNavigate();
      async function getAllUsers(){
            const token = localStorage.getItem("token");
            try{
                  const response = await axios.get("https://sms-ab-backend.onrender.com/students",{
                        headers:{
                              Authorization:`Bearer ${token}`
                        }
                  });
                  setUsers(response.data);
            }catch(err){
                  alert("Unable to get the users...");
            }
      }
      async function userUpdate(user){
            const name = prompt("enter your updated name",user.name);
            const email = prompt("enter your updated email",user.email);
            const updatedUser = {
                  name:name,
                  email:email
            };
            const token = localStorage.getItem("token");
            try{
                  await axios.put(`https://sms-ab-backend.onrender.com/students/${user.id}`,updatedUser,{
                        headers:{
                              Authorization:`Bearer ${token}`
                        }
                  });
                  alert("User updated Successfully");
                  getAllUsers();
            }catch(err){
                  alert("Update Failed");
            }
      }
      async function deleteUser(id){
            const token = localStorage.getItem("token");
            try{
                  await axios.delete(`https://sms-ab-backend.onrender.com/students/${id}`,{
                        headers:{
                              Authorization:`Bearer ${token}`
                        }
                  });
                  alert("User Deleted successfully");
                  getAllUsers();
            }catch(err){
                  alert("Deletion Failed");
            }
      }

      function logout(){
            navigate("/");
      }
      return(
            <>
                  <h3>Dashboard Page</h3>
                  <button onClick={getAllUsers}>GetAll</button>
                  <button onClick={logout}>logout</button>
                  <table border={1}>
                        <thead>
                              <tr>
                                    <th>User ID</th>
                                    <th>User Name</th>
                                    <th>User Role</th>
                                    <th>User Email</th>
                                    <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                        {
                              users.map((user)=>(
                                    <tr key={user.id}>
                                          <td>{user.id}</td>
                                          <td>{user.name}</td>
                                          <td>{user.role}</td>
                                          <td>{user.email}</td>
                                          <td>
                                                <button onClick={()=>userUpdate(user)}>Update</button>
                                                <button onClick={()=>deleteUser(user.id)}>Delete</button>
                                          </td>
                                    </tr>
                              ))
                        }
                        </tbody>
                  </table>
            </>
            
      );
}
export default Dashboard;