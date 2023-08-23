// redux/actions/destinationActions.js
// import axios from 'axios';

export const setDestinations = (destinations) => {
  return {
    type: 'SET_DESTINATIONS',
    payload: destinations,
  };
};

export const fetchDestinations = () => {
  return (dispatch) => {
    axios
      .get('https://ziyarh.com/api/destinations')
      .then((response) => {
        const destinations = response.data; // Assuming the API response contains an array of destinations
        dispatch(setDestinations(destinations));
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });
  };
};
