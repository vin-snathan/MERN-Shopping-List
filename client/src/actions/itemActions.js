import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
	dispatch(setItemsLoading());

	axios
	.get('/api/items')
	.then(response => {
		dispatch({
			type: GET_ITEMS,
			payload: response.data
		})
	})
	.catch(err => console.log(err))
}

export const addItem = (item) => dispatch => {
	axios
	.post('/api/items', item)
	.then(response => {
		dispatch({
			type: ADD_ITEM,
			payload: response.data
		})
	})
}

export const deleteItem = (id) => dispatch => {
	axios
	.delete(`/api/items/${id}`)
	.then(response => {
		dispatch({
			type: DELETE_ITEM,
			payload: id
		})
	})
}

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
}

// fetch('./api/some.json')
//   .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });