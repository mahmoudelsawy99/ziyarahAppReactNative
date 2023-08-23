// redux/reducers/destinationReducer.js
const initialState = {
    destinations: [], // Initial empty array for destinations
  };
  
  const destinationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DESTINATIONS':
        return { ...state, destinations: action.payload };
      default:
        return state;
    }
  };
  
  export default destinationReducer;
  