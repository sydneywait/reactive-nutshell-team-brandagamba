import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
import NewsAPIManager from "../modules/NewsManager"
import MessageAPIManager from "../modules/MessageManager"
import EventAPIManager from "../modules/EventManager"
// import FriendAPIManager from "../modules/FriendManager"
import EventList from './event/EventList'
import EventForm from './event/EventForm'
import EventEditForm from './event/EventEditForm'
import TaskAPIManager from "../modules/TaskManager"
import TaskList from "./tasks/TaskList"
import TaskEditForm from "./tasks/TaskEditForm"
import TaskForm from "./tasks/TaskForm"
import NewsList from "./news/NewsList"
import NewsForm from "./news/NewsForm"
import NewsEditForm from "./news/NewsEditForm"
import AuthenticationManager from "../modules/AuthenticationManager"
import RegisterForm from "./authentication/RegisterForm"
import LoginForm from "./authentication/LoginForm"
import MessageList from "./messages/MessageList"



export default class ApplicationViews extends Component {

  state = {
    users: [],
    events: [],
    news: [],
    messages: [],
    friends: [],
    tasks: [],
    activeUser: sessionStorage.getItem("activeUser")
}

  // when login/register route is created, the onClick function will be handled here.
  // Set session storage, make api calls to get news/events/chat etc for this user
  // and set the state.


  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null


  // ********** Event Functions ***********
  addEvent = (event) => {
    EventAPIManager.addEventAndList(event)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => this.setState({
        events: events
      }
      ))
  }

  deleteEvent = (id) => {
    EventAPIManager.deleteEventAndList(id)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => this.setState({
        events: events
      })
      )
  }


  updateEvent = (eventObj) => {
    EventAPIManager.updateEventAndList(eventObj)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => this.setState({
        events: events
      }))
  }


  // activeUser=sessionStorage.getItem(activeUser)

  componentDidMount() {




    const newState = {}

    // Get all info from the API and set state
    // comment or uncomment your module as needed

    UserAPIManager.getAllUsers()
      .then(users => newState.users = users)
      .then(users => newState.users = users)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => newState.events = events)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => newState.news = news)
      .then(MessageAPIManager.getAllMessages)
      .then(messages => newState.messages = messages)
      //             .then(FriendAPIManager.getAllFriends)
      //             .then(friends => newState.friends = friends)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => newState.tasks = tasks)
      .then(() => this.setState(newState))
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
  }

  deleteArticle = (id) => {
    return NewsAPIManager.deleteArticle(id)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => this.setState({
        news: news

      })
      )
  }
  addNewArticle = (newArticle) => {
    return NewsAPIManager.addNewArticle(newArticle)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => this.setState({
        news: news

      })
      )
  }


  editArticle = (editedArticle) => {
    return NewsAPIManager.editArticle(editedArticle)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => this.setState({
        news: news
      })
      )
  }
  addNewMessage = (newMessage) => {
    return MessageAPIManager.addNewMessage(newMessage)
      .then(MessageAPIManager.getAllMessages)
      .then(messages => this.setState({
        messages: messages
      })
      )
  }

  editMessage = (editedMessage) =>{
    return MessageAPIManager.editMessage(editedMessage)
    .then(MessageAPIManager.getAllMessages)
    .then(messages => this.setState({
      messages: messages
    })
    )

  }


  addTask = taskObject => {
    return TaskAPIManager.addNewTask(taskObject)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => this.setState({
        tasks: tasks
      }))
  }


  updateTask = editedTaskObject => {
    return TaskAPIManager.editTask(editedTaskObject)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => this.setState({
        tasks: tasks
      }))
  }

  completeTask = (taskObject, taskId) => {
    return TaskAPIManager.completeTask(taskObject, taskId)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => this.setState({
        tasks: tasks
      }))
  }

  checkUserEmail = (email) => {
    return AuthenticationManager.checkForEmail(email)
  }

  checkUserName = (username) => {
    return AuthenticationManager.checkForUsername(username)
  }

  addUser = (userObject) => {
    return AuthenticationManager.registerNewUser(userObject)
  }

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            if(this.isAuthenticated()){
              return <NewsList {...props}
              news={this.state.news}
              deleteArticle={this.deleteArticle} />
            } else {
              return <Redirect to="/login" />
            }
          }} />
        <Route
          path="/news/new" render={props => {
            if(this.isAuthenticated()){
            return <NewsForm {...props}
              news={this.state.news}
              addNewArticle={this.addNewArticle}
            />
            } else {
              return <Redirect to="/login" />
            }

          }} />
        <Route
          path="/news/:newsId(\d+)/edit" render={props => {
            if(this.isAuthenticated()){
            return <NewsEditForm {...props}
              news={this.state.news}
              editArticle={this.editArticle}
            />
            } else {
              return <Redirect to="/login" />
            }

          }} />


        <Route
          exact path="/events" render={props => {
            if(this.isAuthenticated()) {
              return <EventList {...props} events={this.state.events} deleteEvent={this.deleteEvent} />
            } else {
              return <Redirect to="/login" />
            }

          }}
        />
        <Route
           path="/events/new" render={props => {
             if(this.isAuthenticated()){
            return <EventForm  {...props} events={this.state.events} addEvent={this.addEvent}/>
             } else {
               return <Redirect to="/login" />
             }
          }}
        />
         <Route
           path="/events/:eventId(\d+)/edit" render={props => {
             if(this.isAuthenticated()) {
            return <EventEditForm  {...props} events={this.state.events} updateEvent={this.updateEvent}/>
             } else {
               return <Redirect to="/login" />
             }
          }}
        />


        {/* <Route
          path="/friends" render={props => {
            if(this.isAuthenticated()){
               return null
            // Remove null and return the component which will show list of friends
            } else {
              return <Redirect to="/login" />
            }

          }}
        /> */}

        <Route
          path="/messages" render={props => {
            if(this.isAuthenticated()){
            return <MessageList {...props}
              activeUser={this.state.activeUser}
              messages={this.state.messages}
              deleteMessage={this.deleteMessage}
              addNewMessage={this.addNewMessage}
              editMessage={this.editMessage}/>
            } else {
              return <Redirect to="/login" />
            }


          }}
        />

        <Route
          exact path="/tasks" render={props => {
            if(this.isAuthenticated()){
              return (
                <TaskList {...props} tasks={this.state.tasks} completeTask={this.completeTask}/>
              )
            } else {
              return <Redirect to="/login" />
            }


          }}
        />

        <Route path="/tasks/:taskId(\d+)/edit" render={props => {
          if(this.isAuthenticated()){
            return (
              <TaskEditForm {...props} tasks={this.state.tasks} updateTask={this.updateTask}/>
            )
          } else {
            return <Redirect to="/login" />
          }

        }} />

        <Route exact path="/tasks/new" render={props=> {
          if(this.isAuthenticated()) {
            return (
              <TaskForm {...props} tasks={this.state.tasks} addTask={this.addTask}/>
            )
          } else {
            return <Redirect to="/login" />
          }

        }}/>

        <Route path="/register" render={props => {
          return (
            <RegisterForm {...props} users={this.state.users} checkUserEmail={this.checkUserEmail} checkUserName={this.checkUserName}
            addUser={this.addUser}/>
          )
        }} />

        <Route exact path="/login" render={props => {
          return (
            <LoginForm {...props} checkUserName={this.checkUserName} checkUserEmail={this.checkUserEmail} users={this.state.users}/>
          )
        }} />

      </React.Fragment>
    );
  }
}
