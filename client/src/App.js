import './App.css';
import Fib from './Fib';
import OtherPage from './OtherPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        
        <Routes>
          <Route exact path="/" element={<Fib/>}/>
          <Route path="/otherpage"element={<OtherPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
