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

import Home from './pages'
import About from './pages/About'
import DashboardCourses from './pages/protected'
import Error from './pages/Error404'
import Login from './pages/Login'
import Register from './pages/Register'
import {logout} from './helpers/Auth'
import 'pure-css'
import './index.css'
import edteamLogo from './media/edteam-logo.png'

import {courses} from '../data/courses.json'

const PrivateRoute = ({component: Component, authed, rest}) => (
  <Route
    {...rest}
    render={
      props => authed === true
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    }
  />
)

const PublicRoute = ({component: Component, authed, rest}) => (
  <Route
    {...rest}
    render={
      props => authed === false
        ? <Component {...props}/>
        : <Redirect to="/cursos" />
    }
  />
)

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

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    return this.state.loading === true
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
                  <li className="pure-menu-item">
                    <Link to="/" onClick={this.handleOnClick} className="pure-menu-link">Home</Link>
                  </li>
                  <li className="pure-menu-item">
                    <Link to="/acerca" onClick={this.handleOnClick} className="pure-menu-link">Acerca</Link>
                  </li>
                    {
                      (this.state.authed)
                       ?
                        <span>
                          <li className="pure-menu-item">
                            <Link to="/cursos" onClick={this.handleOnClick} className="pure-menu-link">Cursos</Link>
                          </li>
                          <li className="pure-menu-item">
                            <Link to="/acerca" onClick={() => {
                              logout()
                              this.setState({authed: false})
                              this.handleOnClick()
                            }} className="pure-menu-link">Logout</Link>
                          </li>
                        </span>
                      :
                        <span>
                          <li className="pure-menu-item">
                            <Link to="/registro" onClick={this.handleOnClick} className="pure-menu-link">Registro</Link>
                          </li>
                          <li className="pure-menu-item">
                            <Link to="/login" onClick={this.handleOnClick} className="pure-menu-link">Login</Link>
                          </li>
                        </span>
                    }
                </ul>
              </div>
            </header>
            <main className="main">
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/acerca" component={About}/>
                <PublicRoute authed={this.state.authed} path="/registro" component={Register}/>
                <PublicRoute authed={this.state.authed} path="/login" component={Login}/>
                <PrivateRoute authed={this.state.authed} path="/cursos" component={DashboardCourses}/>
                <Route path="/404" component={Error}/>
              </Switch>
            </main>
          </div>
        </Router>
      )
  }
}


export default App
