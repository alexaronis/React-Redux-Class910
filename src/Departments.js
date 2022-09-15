import React from 'react';
import { useSelector, useDispatch } from 'react-redux';//allows us to access the store directly
import axios from 'axios'


const Departments = ()=>{
    const dispatch = useDispatch()
    const departments = useSelector((state)=>{
        return state.departments
    })
    const users = useSelector((state)=>{
         return state.users
    })
    const addUser = async(department)=>{
        try{
        const name = `${Math.random()}${department.name}`;
        const response = await axios.post('/api/users', {
            departmentId: department.id,
            name
        })  
        dispatch({type: 'NEW_USER', user: response.data})
        }catch(err){
            console.log(err)
        }
    }
    return (
        <ul>
           {
               departments.map( department => {
               const usersInDepartment = users.filter(user=> user.departmentId === department.id)
                   return (
                   <li key={department.id}> {department.name} <button onClick={()=> addUser(department)}>+</button>
                   <ul>{
                       usersInDepartment.map(user =>  (
                       <li key= {user.id}>{user.name}</li>
                       ))
                       
                       
                   }</ul>
                   
                   </li>
                   );
               }
               )
           }
        </ul>
        
        )
    
} //<hr />;//we can write dom elements like this b/c of React

export default Departments;