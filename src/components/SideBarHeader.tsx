import AddIcon from "@mui/icons-material/Add";

interface Iprops {
  toggleForm: () => void;
}

const SideBarHeader = ({ toggleForm }: Iprops) => {
  return (
    <header className="flex justify-between items-center py-3">
      <h2 className="font-bold">Projects</h2>
      <button onClick={toggleForm}>
        <AddIcon className="!text-lg" />
      </button>
    </header>
  );
};

export default SideBarHeader;
