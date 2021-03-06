import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from "./pages/Home"
import TrailsIndex from "./pages/TrailsIndex"
import TrailsProfile from "./pages/TrailsProfile"
import Questionnaire from "./pages/Questionnaire"
import QuestionnaireEdit from "./pages/QuestionnaireEdit"
import CommentIndex from "./pages/CommentIndex"
import UserProfile from "./pages/UserProfile"
import UserFavorites from "./pages/UserFavorites"
import UserSettings from "./pages/UserSettings"
import UserActivity from "./pages/UserActivity"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Header from "./Header.js"
import Footer from "./Footer.js"
import NotFound from "./NotFound.js"


const App = (props) => {

  const { user, logged_in, apiKey } = props
  const currentUserId = user.id
  const currentUserName = user.user_name
  
  return (
    <Router>
      <div id="app-container">

        <Header logged_in={props.logged_in}
          sign_in_route={props.sign_in_route}
          sign_up_route={props.sign_up_route}
          sign_out_route={props.sign_out_route}
          user_id={currentUserId}
        />

        <div id="main-container">
          <Switch>
            {!logged_in &&
              <Route path="/user" render={() => <Redirect to="/" />} />
            }

            <Route exact path="/" render={() => < Home apiKey={apiKey} logged_in={logged_in} sign_in_route={props.sign_in_route} user_id={currentUserId} sign_up_route={props.sign_up_route} />} />

            <Route exact path="/about" render={() => < About />} />

            <Route exact path="/contact" render={() => < Contact />} />

            <Route exact path="/trails" render={() => < TrailsIndex apiKey={apiKey} />} />

            <Route exact path="/trails/:id" render={(props) => < TrailsProfile {...props} user_id={currentUserId} user_name={currentUserName} logged_in={logged_in} apiKey={apiKey} />} />

            <Route exact path="/trails/:id/questionnaire" render = { (props) => < Questionnaire user_id={currentUserId} {...props} apiKey={apiKey}/>}/>

            <Route exact path="/submission/:id" render = { (props) => < QuestionnaireEdit user_id={currentUserId} {...props} apiKey={apiKey} />}/>

            <Route exact path="/user/:id" render={(props) => < UserProfile {...props} user_name={currentUserName} user_id={currentUserId} apiKey={apiKey} edit_user_route={props.edit_user_route}/>} />

            <Route exact path="/user/:id/favorites" render={(props) => < UserFavorites {...props} user_id={currentUserId} apiKey={apiKey} />} />

            <Route exact path="/user/:id/settings" render={(props) => < UserSettings {...props} user_id={currentUserId} />} />
            
            <Route exact path="/user/:id/activity" render={(props) => < UserActivity {...props} user_id={currentUserId} />} />
            
            <Route component={ NotFound } />
          </Switch>
        </div>

        <div id="footer-container">
          <Footer />
        </div>

      </div>
    </Router>
  );
}

export default App
