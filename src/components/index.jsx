import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import {firebaseAuth} from '../data/config'

import 'pure-css'
import './index.css'
import edteamLogo from './media/edteam-logo.png'
// import PropTypes from 'prop-types'
// import CoursesList from './CoursesList'
// import CourseAddForm from './CourseAddForm'
// import uid from 'uid'

import {courses} from '../data/courses.json'

class App extends Component {
  constructor(...props) {
    super(...props)

    this.state = {
      loading: true,
      authed: false
    }

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick () {
    document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked')
    document.getElementById('toggle').classList.toggle('x')
  }

  render () {
    return this.state.loading === false
      ? <h1>Cargando...</h1>
      : (
        <Router>
          <div>
            <header className="custom-menu-wrapper">
              <div className="pure-menu custom-menu custom-menu-top">
                <a href="#" className="pure-menu-heading custom-menu-brand">
                  <img src={edteamLogo} alt="EDteam"/>
                </a>
                <a href="#" className="custom-menu-toggle" id="toggle" onClick={this.handleOnClick}><s className="bar"></s><s className="bar"></s></a>
              </div>
              <div className="pure-menu pure-menu-horizontal pure-menu-scrollable custom-menu custom-menu-bottom custom-menu-tucked" id="tuckedMenu">
                <div className="custom-menu-screen"></div>
                <ul className="pure-menu-list">
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">About</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Contact</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Blog</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">GitHub</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Twitter</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Apple</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Google</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Wang</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Yahoo</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">W3C</a></li>
                </ul>
              </div>
            </header>
            <main className="main">
              <Switch>
              </Switch>
            </main>
          </div>
        </Router>
      )
  }
}


export default App
