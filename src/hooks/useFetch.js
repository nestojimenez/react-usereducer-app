import { useState, useReducer } from "react";
import { getBookReducer, INITIAL_STATE } from '../reducers/getBookReducer';
import { ACTION_TYPES } from '../action_types';

const useFetch = () => {
    const[state, dispatch] = useReducer(getBookReducer, INITIAL_STATE)  //useReducer
    const [response, setResponse] = useState({})
    const[imageObjectURL,setImageObjectURL] = useState({});

    const fetchData = (isbn) =>{
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
          setResponse(json);
          dispatch({type: ACTION_TYPES.FETCH_SUCCESS})
        })
        .catch((err)=>{
          dispatch({type: ACTION_TYPES.FETCH_ERROR})
          console.log('My Error ',err);
        })
        
      }

      const fetchPhoto = (isbn) => {
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

      const fetchSubject = (subject) => {
        
        dispatch({type: ACTION_TYPES.FETCH_START});
        fetch(`http://openlibrary.org/subjects/${subject}.json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(json => {
          setResponse(json);
          console.log(json);
          dispatch({type: ACTION_TYPES.FETCH_SUCCESS});
        })
        .catch((err)=>{
          dispatch({type: ACTION_TYPES.FETCH_ERROR})
          console.log('My Error ',err);
        })
      }
  return [response, imageObjectURL, fetchData, fetchPhoto, fetchSubject, state]
}

export default useFetch
