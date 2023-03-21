import './App.css';
import {useEffect, useReducer, useState} from 'react'
import { getBookReducer, INITIAL_STATE } from './reducers/getBookReducer';
import { ACTION_TYPES } from './action_types';
import useFetch from './hooks/useFetch';

function App() {
  const [response, imageObjectURL, fetchData, fetchPhoto, fetchSubject, state] = useFetch() //Custo Hook
  
  const[isbn, setIsbn] = useState('');

 useEffect(()=>{
  fetchPhoto(isbn);
 },[response])

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
                <h1>Boork Name: {response.title}</h1>
                <h2>ISBN: {response.isbn_13}</h2>

                <button className='btn btn-primary' onClick={()=>fetchData(isbn)}>Search ISBN</button>
                <button className='btn btn-primary' onClick={()=>fetchSubject(isbn)}>Search by subject</button>
                
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
