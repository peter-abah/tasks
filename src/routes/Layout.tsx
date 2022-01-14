import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Layout = () => {
  return (
    <main>
      <NavBar />
      <div>
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;