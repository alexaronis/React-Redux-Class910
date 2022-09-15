import React from 'react';
import { useSelector } from 'react-redux';//allows us to access the store directly

const Users = ()=>{
    const users = useSelector((state)=>{
        return state.users
    })
    const departments = useSelector((state)=>state.departments)
    return (
        <ul>
           {
               users.map( user => {
               const department = departments.find(department => department.id === user.departmentId)
                   return (
                   <li key={user.id}> {user.name}
                   {department ? `(${department.name})` : null}
                   </li>
                   );
               }
               )
           }
        </ul>
        
        )
    
} //<hr />;//we can write dom elements like this b/c of React

export default Users;