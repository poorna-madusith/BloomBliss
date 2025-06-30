import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <route path="/login" element />
        <route path="/signup" element />
        <route path="/profile" element />
      </Routes>
    </Router>
  )
}

export default App
