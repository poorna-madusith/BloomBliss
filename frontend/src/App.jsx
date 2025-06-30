import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/signup'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element />
      </Routes>
    </Router>
  )
}

export default App
