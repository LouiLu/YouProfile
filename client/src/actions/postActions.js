import axios from 'axios';
import {
   ADD_POST,
   GET_POSTS,
   GET_ERRORS,
   DELETE_POST,
   POST_LOADING
} from './types';

// get posts
export const getPosts = () => dispatch => {
   dispatch(setPostLoading());

   axios
      .get('/api/posts')
      .then(res => 
         dispatch({
            type: GET_POSTS,
            payload: res.data
         })
      )
      .catch(err =>
         dispatch({
            type: GET_POSTS,
            payload: null
         })
      );
}

// set loading state
export const setPostLoading = () => {
   return {
      type: POST_LOADING
   }
}

// delete post
export const deletePost = (id) => dispatch => {
   axios
      .delete(`/api/posts/${id}`)
      .then(res => 
         dispatch({
            type: DELETE_POST,
            payload: id
         })
      )
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         })
      );
}

// add post
export const addPost = (postData) => dispatch => {
   axios
      .post('/api/posts', postData)
      .then(res => 
         dispatch({
            type: ADD_POST,
            payload: res.data
         })
      )
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         })
      );
}

// add likes
export const addLike = (id) => dispatch => {
   axios
      .post(`/api/posts/like/${id}`)
      .then(res => dispatch(getPosts()))
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         })
      );
}

// remove likes
export const removeLike = (id) => dispatch => {
   axios
      .post(`/api/posts/unlike/${id}`)
      .then(res => dispatch(getPosts()))
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         })
      );
}
