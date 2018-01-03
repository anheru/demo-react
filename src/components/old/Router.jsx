import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


const StaticSite = () => (
  <Router>
    <div>
      <h1>Primero pasos con React Router</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/acerca">Acerca</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/acerca" component={Acerca}/>
      <Route path="/servicios" component={Servicios}/>
      <Route path="/contacto" component={Contacto}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Hola bienvenid@s</h2>
  </div>
)

const Acerca = () => (
  <div>
    <h2>Acerca</h2>
  </div>
)

const Servicios = () => (
  <ul>
    <li>Instrucción</li>
    <li>Diseño</li>
  </ul>
)

const Contacto = () => (
  <div>
    <h2>Contacto</h2>
  </div>
)

export default StaticSite
