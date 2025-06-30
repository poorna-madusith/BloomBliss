import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Signup from './components/signup'
import Login from './components/login'
import Profile from './components/profile'

function App() {
  return (
    <Router>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Router>
  )
}

export default App;
