import React, { Component } from 'react';

class AddContact extends Component{
    constructor (props) {
        super(props)

         this.nameInput = React.createRef();
         this.emailInput = React.createRef();
         this.phoneInput = React.createRef();
    }

    onsubmit = (e) => {
        e.preventDefault();
        const contacts = {
            name : this.nameInput.current.value,
            email : this.emailInput.current.value,
            phone : this.phoneInput.current.value
        };

        console.log(contacts);
    };

    static defaultProps = {
        name: "Umar Annur",
        email: "umarannur@gmail.com",
        phone: "08088853855"
    };

    render(){
        const { name, email, phone } = this.props;
        return(
            <div className={"container"}>
                <div className={"card mb-3"}>
                    <div className={"card-header"}>Add Contact</div>
                    <div className={"card-body"}>
                        <form onSubmit={this.onsubmit}>
                            <div className={"form-group"}>
                                <label htmlFor="name">Name</label>
                                <input
                                    className={"form-control form-control-lg"}
                                    type="text"
                                    name={"name"}
                                    placeholder={"Enter Name..."}
                                    defaultValue={name}
                                    ref={this.nameInput}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor="email">Email</label>
                                <input
                                    className={"form-control form-control-lg"}
                                    type="email"
                                    name={"email"}
                                    placeholder={"Enter Email..."}
                                    defaultValue={email}
                                    ref={this.emailInput}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    className={"form-control form-control-lg"}
                                    type="text"
                                    name={"phone"}
                                    placeholder={"Enter Phone..."}
                                    defaultValue={phone}
                                    ref={this.phoneInput}
                                />
                            </div>
                            <input type="submit" value={"Add Contact"} className={"btn btn-block btn-light"}/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddContact;
