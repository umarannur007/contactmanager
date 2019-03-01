import React, { Component } from "react";

class Test extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(data =>
        this.setState({ name: data.name, email: data.email, phone: data.phone })
      );
  }

  // componentWillMount() {
  //   console.log('componentWillMount...');
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate...');
  // }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate...');
  // }

  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('componentWillReceiveProps...');
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     test: 'something'
  //   };
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(' getSnapshotBeforeUpdate...');
  // }

  render() {
    const { name, email, phone } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    );
  }
}

export default Test;