interface Iprops {
  openModal: () => void
}

const NavBar = ({ openModal }: Iprops) => {
  return (
    <nav className="py-4 px-3">
      <h1>Todo</h1>
      <button onClick={openModal}>Add Todo</button>
    </nav>
  );
};

export default NavBar;
