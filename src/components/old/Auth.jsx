import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'

const Home = () => <h3>Home</h3>
const Public = () => <h3>Contenido Publico</h3>
const Protected = () => <h3>Contenido Protegido</h3>

const fakeAuth = {
  isAuthenticated: false,
  autenticated(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 10) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 10) // fake async
  }
}

const AuthButton = withRouter((history) => (
  (fakeAuth.isAuthenticated)
    ?
      <div>
        <h2>¡Bienvenido!</h2>
        <button onClick={() => fakeAuth.signout(() => history.push('/'))}>Salir</button>
      </div>
    :
      <h2>¡No estas logeado! :(</h2>
))

const PrivateRoute = ({component: Component, rest}) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated
      ? <Component {...props}/>
      : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}
  />
)

class Login extends Component {
  constructor (...props) {
    super(...props)
    this.state = {
      redirectRoute: false
    }
    this.login = this.login.bind(this)
  }

  login () {
    fakeAuth.autenticated(() => this.setState({redirectRoute: true}))
  }

  render () {
    const {from} = this.props.location.state || {from: {pathname: '/'}}
    const {redirectRoute} = this.state
    if (redirectRoute) {
      return(
        <Redirect to={from}/>
      )
    } else {
      return(
        <div>
          <h3>Debes estar logeado para acceder a esta página
            <mark>{from.pathname}</mark>
          </h3>
          <button onClick={this.login}>Log in</button>
        </div>
      )
    }
  }
}

const AuthSite = () => (
  <Router>
    <div>
      <AuthButton></AuthButton>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="public">Página Publica</Link></li>
        <li><Link to="protected">Página Protegida</Link></li>
      </ul>

      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/public" exact component={Public}/>
        <PrivateRoute path="/protected" exact component={Protected}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
    </div>
  </Router>
)

export default AuthSite
