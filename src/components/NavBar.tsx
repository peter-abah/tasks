import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectSideBarVisibility,
  updateSideBarVisibility,
} from "../features/ui/uiSlice";
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
    <nav className="bg-nav h-10 flex items-center justify-between px-3 shadow-navBar z-20">
      <div className="flex gap-4">
        <button onClick={toggleSideBar}>
          {isSideBarVisible ? <CloseIcon /> : <MenuIcon />}
        </button>
        <h1>Todo</h1>
      </div>
      <button onClick={openModal}>
        <AddIcon />
      </button>
    </nav>
  );
};

export default NavBar;
