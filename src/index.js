import {createRoot} from 'react-dom/client';
import React, { useEffect } from 'react';
import store from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Departments from './Departments';
import Users from './Users'
//useSelector is used so that we don't have to use 'subscribe' every time we want to update the store
const root = createRoot(document.querySelector('#root'));
//we want to load Users and Departments. we need axios to do that, but we get to axios
//via useEffect from react
const App = ()=>{
    const dispatch = useDispatch();//this allows use to access store without needing to type it every time we use it 
    const users = useSelector(state => state.users)//this line is saying "users, we want to get the users even if they change. give me the old, then the new"
    console.log(users)
    const departments = useSelector(state => state.departments)
    useEffect(()=>{
        const fetchUsers = async()=> {
            try{
                const response = await axios.get('/api/users');
                /*store.see note next to dispatch*/dispatch({type: 'SET_USERS', users: response.data})//ALWAYS needs a type or else you get an error
                console.log(response.data)//must dispath in order to update the current state to the new state/store
            } catch(err){
                console.log(err);
            }
            
        };
        fetchUsers();
    }, []);
    
    useEffect(()=>{
        const fetchDepartments = async()=> {
            try{
                const response = await axios.get('/api/departments');
                /*store.see note next to dispatch*/dispatch({type: 'SET_DEPARTMENTS', departments: response.data})//ALWAYS needs a type or else you get an error
                console.log(response.data)//must dispath in order to update the current state to the new state/store
            } catch(err){
                console.log(err);
            }
            
        };
        fetchDepartments();
        
    }, []);
    
    return (//we can reference Departments and Users directly like this if we set up another file with a matching name
        <div>
          <h1>Welcome to Acme HR</h1>
          <div>
            We currently have {users.length} users!
            We currently have {departments.length} departments!
          </div>
          <main>
            <Departments />
          </main>
          <main>
            <Users />
          </main>
        
        </div>
        )
}

root.render(<Provider store={store}><App /></Provider>);