import { createStore } from 'redux'//this store.js file must go in src because it is attached to react or webpack or something

const intitialState = {
    departments: [],
    users: []
};

const reducer = (state = intitialState, action) =>{//redux needs reducer because it reduces the store based upon different actions, but it must start with state
   if(action.type === 'SET_USERS'){
       state = {...state, users: action.users};//we use the ... to get the current state, and then add action users to get the updated state
   }
      if(action.type === 'SET_DEPARTMENTS'){
       state = {...state, departments: action.departments};//we use the ... to get the current state, and then add action users to get the updated state
   }
   console.log(state);
    return state
    
}

const store = createStore(reducer);

export default store;// this a default export because it's not in an object
    