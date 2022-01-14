import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <main>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;