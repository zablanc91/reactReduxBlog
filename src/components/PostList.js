import React from 'react';
import {connect} from 'react-redux';
import {fetchPostsAndUsers} from '../actions';
import UserHeader from './UserHeader';

class PostList extends React.Component{
    //call our action after the component renders; Json get which will set our this.props.posts
    componentDidMount(){
        this.props.fetchPostsAndUsers();
    }

    //helper method to be used in render
    renderList(){
        return this.props.posts.map(post => {
            return(
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    </div>
                    <UserHeader userId={post.userId} />
                </div>
            );
        });
    }
    
    //be wary of initial render when state is still blank! props.posts is initially blank array
    render(){
        return(
            <div className="ui relaxed divided list">
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //remember, state has a posts variable from combineReducers!; posts is empty array at default, but changes if action, from the axios get, matches 
    return {posts: state.posts};
}

//add state to PostList's props as well as action (fetchPostsAndUsers) in order to update state
export default connect(mapStateToProps, {
    fetchPostsAndUsers
})(PostList);