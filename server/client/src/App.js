
import Dashboard from './Login&Deshboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />


        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
