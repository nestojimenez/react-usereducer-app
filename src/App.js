import './App.css';
import {useEffect, useReducer, useState} from 'react'
import { getBookReducer, INITIAL_STATE } from './getBookReducer';
import { ACTION_TYPES } from './action_types';

function App() {
  const[state, dispatch] = useReducer(getBookReducer, INITIAL_STATE)
  const[myResult, setMyResult] = useState('')
  let isbn = '';

  const fetchData = () =>{
    dispatch({type: ACTION_TYPES.FETCH_START});
    fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
  })
    .then(response => {
      response.json()
      console.log(response);
      setMyResult(response);
      dispatch({type: ACTION_TYPES.FETCH_SUCCESS})
    })
    .then(response => {
        
      })
      .catch((err)=>{
        dispatch(ACTION_TYPES.FETCH_ERROR)
        console.log(err);
      }

    )
    
  }

  const handleChange = (e) =>{
    isbn = e.target.value;
    console.log(isbn);
  }

  return (
    <div className="container-fluid">
        <div className='row mt-5'>
            <div className='col-4'>
                <div class="input-group mb-3">
                    <input onChange={(e) => handleChange(e)} type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <span class="input-group-text" id="basic-addon2">@example.com</span>
                </div>
                <h1>Boork Name: {myResult.title}</h1>
                <h2>ISBN: {myResult.isbn_13}</h2>

                <button className='btn btn-primary' onClick={fetchData}>Search ISBN</button>
                <h3>Loading State: {state.loading.toString()}</h3>
                <h3>Loading State: {state.error.toString()}</h3>
            </div>

        </div>
      
    </div>
  );
}

export default App;
