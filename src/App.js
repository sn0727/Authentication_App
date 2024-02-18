import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Sign_Up from './pages/Sign_Up/Sign_Up';
import Forgote_Password from './pages/Forgote_Password/Forgote_Password';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/sign_up' element={<Sign_Up />}></Route>
        <Route path='/forgote_password' element={<Forgote_Password />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
