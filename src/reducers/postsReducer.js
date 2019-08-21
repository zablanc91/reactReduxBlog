//deals with array of posts

export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_POSTS':
            //matches our fetchPosts action
            return action.payload;
        default:
            //no match, so no change to state
            return state;
    }
};