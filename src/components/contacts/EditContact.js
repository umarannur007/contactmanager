import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { name, email, phone } = res.data;
    this.setState({
      name,
      email,
      phone
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onsubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({ error: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "Phone is required" } });
      return;
    }

    const { id } = this.props.match.params;
    const updContact = {
      name,
      email,
      phone
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    //Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      error: {}
    });
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, error } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className={"card mb-3"}>
              <div className={"card-header"}>Add Contact</div>
              <div className={"card-body"}>
                <form onSubmit={this.onsubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label={"Name"}
                    name={"name"}
                    placeholder={"Enter Name..."}
                    value={name}
                    error={error.name}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label={"Email"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Enter Email..."}
                    value={email}
                    error={error.email}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label={"Phone"}
                    name={"phone"}
                    placeholder={"Enter Phone..."}
                    value={phone}
                    error={error.phone}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value={"Update Contact"}
                    className={"btn btn-block btn-light"}
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
