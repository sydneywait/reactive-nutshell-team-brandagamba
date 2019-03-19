//Conditionally route in application views so you only see register until logged in
//fetch call to username to check for existing username
//fetch call to email to check for existing email
//conditional statement (array.length = 0) to create an account
//then post new user to database
//sessionStorage.setItem("activeUser") using objectId just saved to database
//create new user object

import React, {Component} from "react"

export default class RegisterForm extends Component {
    //creates new state

    state = {
        username: "",
        email: "",
        errorMessage: ""
    }

    //Handles form imputs and sets them to state

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    //Checks to see if username or password are already in database. If in database, they will receive an alert and not be able to create an account, otherwise, their information will be posted to the database and they will be logged in with session storage

    createNewUser = evt => {
        evt.preventDefault()
        let errorMessage = ""
        if(this.props.checkUserName(this.state.username).length === 0){
            if(this.props.checkUserEmail(this.state.email).length === 0){
                const newUser = {
                    username: this.state.username,
                    email: this.state.email
                }
                this.props.registerNewUser(newUser)
                this.props.history.push("/")
            } else {
                errorMessage = "That email is already registered. Please register with a new email"
                this.setState({
                    errorMessage: errorMessage
                })
            }

        } else {
            errorMessage = "That username is already taken. Please enter a different username!"
            this.setState({
                errorMessage: errorMessage
            })
        }

    }



    //Returns form and/or error message
    render(){
        return(
            <React.Fragment>
            <h1>Please Register</h1>
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.handleFieldChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleFieldChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h4>{this.errorMessage}</h4>
            </React.Fragment>

        )
    }
}