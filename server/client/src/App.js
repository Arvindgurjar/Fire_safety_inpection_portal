
import Dashboard from './Login&Deshboard/Dashboard';
import Login from './Login&Deshboard/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { RequireAuth } from 'react-auth-kit';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<RequireAuth loginPath='/'>
            <Dashboard />
          </RequireAuth>} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
