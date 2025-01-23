import { Outlet } from 'react-router-dom';
import config from './config/config';
import Login from './Components/Login';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import SocketClient from './Components/SocketClient';
function App() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
