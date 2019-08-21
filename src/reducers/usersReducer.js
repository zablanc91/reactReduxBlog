//dealing with array of users
export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_USER':
            //add the user to our array
            return [...state, action.payload];
        default:
            return state;
    }
};