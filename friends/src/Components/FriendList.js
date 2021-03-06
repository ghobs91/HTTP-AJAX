import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios';
import AddFriendForm from './AddFriendForm';
import FriendDetails from './FriendDetails';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      name: '',
      age: '',
      email: '',
    };
  }

  addNewFriend = (e) => {
    axios
    .post("http://localhost:5000/friends", {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
     })
    .then((response) => this.setState({ friends: response.data }))
    .catch(err => console.log(err))
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => {
        console.log ("this is the response:", response);
        this.setState({friendList: response.data }, () => console.log(this.state.friendList));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="friend-list">
        <AddFriendForm {...this.state}
          handleInput={this.handleInput}
          addNewFriend={this.addNewFriend}/>
        {this.state.friendList.map(friend => (
          <FriendDetails key={friend.id} friend={friend} />
        ))}
      </div>
    );
  }

}

export default FriendList;