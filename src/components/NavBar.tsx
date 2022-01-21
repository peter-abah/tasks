import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectSideBarVisibility,
  updateSideBarVisibility,
} from "../features/ui/uiSlice";
import { selectUser, logoutUser } from "../features/users/usersSlice";

import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/AddCircleOutline";

interface Iprops {
  openModal: () => void;
}

const NavBar = ({ openModal }: Iprops) => {
  const isSideBarVisible = useAppSelector(selectSideBarVisibility);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const toggleSideBar = () =>
    dispatch(updateSideBarVisibility(!isSideBarVisible));

  const logOut = () => dispatch(logoutUser());

  return (
    <nav className="bg-nav flex items-center justify-between px-3 py-2 shadow-navBar z-20 md:px-12">
      <div className="flex gap-4">
        <button onClick={toggleSideBar}>
          {isSideBarVisible ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Link to="/">
          <HomeIcon />
        </Link>
      </div>
      <div className="flex">
        <button onClick={openModal}>
          <AddIcon />
        </button>
        {user ? (
          <div className="px-4">
            <span className="px-2">{user.name}</span>
            <button className="px-2" onClick={logOut}>Log out</button>
          </div>
        ) : (
          <div className="px-4">
            <Link className="px-2" to="signin">Sign in</Link>
            <Link className="px-2" to="signup">Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
