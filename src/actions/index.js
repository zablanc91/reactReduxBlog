import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

//still have to dispatch even though we call the other action creator
//await makes sure inner dispatch is done before moving on
//make sure to add and call this @ PostList.js
export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());

        //use lodash, has an array of unique userIds
        //no await needed for this
        /*vanilla JS alt: 
        const userIds = [...new Set(getState().posts.map(p => p.userId))];
        
        userIds.forEach(id => dispatch(fetchUser(id)));
        */

        const userIds = _.uniq(_.map(getState().posts, 'userId'));

        userIds.forEach(id => dispatch(fetchUser(id)));
    };
};

//this Redux-Thunk action creator returns a function instead of an action object
//see index.js @ src to see how Redux-Thunk gets wired
export const fetchPosts = () => {
    //dispatch allows changing of data, getState is for read/access (not used in this example)
    return async (dispatch, getState) => {
        const response =  await jsonPlaceholder.get('/posts');

        //the entire json response is too much, just get data
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
    };
};

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        //payload is an object with information on user
        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
    };
};


/*
old solution to fetchUser, will now just use a larger action, fetchPostsAndUsers(), that make use of our already made actions

//PostList will pass down post id as props to UserHeader to use this action creator
//needs memoization because we don't need 100 get calls!!
export const fetchUser = (id) => {
    return (dispatch) => {
        _fetchUser(id, dispatch);
    };
};

//need function outside our fetchUser action cretor for memoization
//this is a private function
const _fetchUser =  _.memoize(async(id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

        //payload is an object with information on user
        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
});
*/