
import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import  {login, logout} from './store/authSlice';
import {authService} from '../src/appwrite/auth';
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  {/* <Outlet></Outlet> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
