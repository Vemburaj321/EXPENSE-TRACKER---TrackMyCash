import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import NavBar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}

      <ExpenseTracker/>
    </BrowserRouter>
  );
}

export default App;
