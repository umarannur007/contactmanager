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

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users/",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });
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
                    value={"Add Contact"}
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
