import React from 'react';
import {connect} from 'react-redux';
//import {fetchUser} from '../actions';

class UserHeader extends React.Component {
    /*
    no longer needed as our fetchPostsAndUsers action creator does everything
    componentDidMount(){
        this.props.fetchUser(this.props.userId);
    }
    */
    
    render(){
        const {user} = this.props;
        if(!user){
            return null;
        }

        return(
            <div className="header">
                {user.name}
            </div>
        );
    }
}

//map state to props also can props from the component that were passed down by parent! (ownProps, in this case userId)
const mapStateToProps = (state, ownProps) => {
    //users from our combinedReducer

    return {
        user: state.users.find(user => user.id === ownProps.userId)
    };
};

//add state to PostList's props as well as action (fetchUser, used to do this) in order to update state
export default connect(mapStateToProps)(UserHeader);