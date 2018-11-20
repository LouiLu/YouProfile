import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, GET_PUBLIC_PROFILE } from '../actions/types';

const initialState = {
   profile: null,
   profiles: null,
   publicProfile: null,
   loading: false
}

export default function(state = initialState, action) {
   switch(action.type) {
      case PROFILE_LOADING:
         return {
            ...state,
            loading: true
         };
      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: false
         };
      case GET_PUBLIC_PROFILE:
         return {
            ...state,
            publicProfile: action.payload,
            loading: false
         };
      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null
         };
      case GET_PROFILES:
         return {
            ...state,
            profiles: action.payload,
            loading: false
         };
      default:
         return state;
   }
}