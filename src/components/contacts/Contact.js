import React, { Component } from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className={"card card-body mb-3"}>
              <h4>
                {name}
                <i
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    });
                  }}
                >
                  +
                </i>

                <i
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    float: "right",
                    color: "red"
                  }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                >
                  X
                </i>

                <Link to={`contact/edit/${id}`}>
                  <i
                    className={"mr-3"}
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      float: "right",
                      fontWeight: "bold"
                    }}
                  >Edit</i>
                </Link>

              </h4>
              {showContactInfo ? (
                <ul className={"list-group"}>
                  <li className={"list-group-item"}>Email: {email}</li>
                  <li className={"list-group-item"}>Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
