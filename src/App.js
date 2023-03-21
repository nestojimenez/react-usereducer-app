import './App.css';
import {useEffect, useReducer, useState} from 'react'
import { getBookReducer, INITIAL_STATE } from './getBookReducer';
import { ACTION_TYPES } from './action_types';

function App() {
  const[state, dispatch] = useReducer(getBookReducer, INITIAL_STATE)
  const[myResult, setMyResult] = useState('')
  const[isbn, setIsbn] = useState('');
  const[imageObjectURL,setImageObjectURL] = useState({});

  const fetchData = () =>{
    dispatch({type: ACTION_TYPES.FETCH_START});
    fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(json => {
      console.log(json);
      setMyResult(json);
      dispatch({type: ACTION_TYPES.FETCH_SUCCESS})
    })
    .catch((err)=>{
      dispatch({type: ACTION_TYPES.FETCH_ERROR})
      console.log('My Error ',err);
    })
    
  }

  const fetchPhoto = () => {
    dispatch({type: ACTION_TYPES.FETCH_START});
    fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
  })
    .then((response) => response.blob())
    .then(json => {
      setImageObjectURL(URL.createObjectURL(json));
      console.log(json);
      dispatch({type: ACTION_TYPES.FETCH_SUCCESS});
    })
    .catch((err)=>{
      dispatch({type: ACTION_TYPES.FETCH_ERROR})
      console.log('My Error ',err);
    })
  }

 useEffect(()=>{
  fetchPhoto();
 },[myResult])

  const handleChange = (e) =>{
    setIsbn(e.target.value);
    console.log(isbn);
  }

  return (
    <div className="container-fluid">
        <div className='row mt-5'>
            <div className='col-6'>
                <div class="input-group mb-3">
                    <input onChange={(e) => handleChange(e)} type="text" class="form-control" placeholder="Book's ISBN" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <span class="input-group-text" id="basic-addon2">Enter Book ISBN</span>
                </div>
                <h1>Boork Name: {myResult.title}</h1>
                <h2>ISBN: {myResult.isbn_13}</h2>

                <button className='btn btn-primary' onClick={fetchData}>Search ISBN</button>
                
                <h3>Loading State: {state.loading.toString()}</h3>
                <h3>Error State: {state.error && 'Unable to load your book review ISBN'} {!state.error && 'Book found successfully'}</h3>
                
            </div>
            <div className='col-4'>
                <img src={imageObjectURL}></img>
            </div>

        </div>
      
    </div>
  );
}

export default App;
