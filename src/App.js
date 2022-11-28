import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Home from './page/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<DefaultLayout><Home /></DefaultLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
