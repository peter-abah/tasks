import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectSideBarVisibility,
  updateSideBarVisibility,
} from "../features/ui/uiSlice";

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
  const dispatch = useAppDispatch();

  const toggleSideBar = () =>
    dispatch(updateSideBarVisibility(!isSideBarVisible));

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
      <button onClick={openModal}>
        <AddIcon />
      </button>
    </nav>
  );
};

export default NavBar;
