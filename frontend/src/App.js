import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
