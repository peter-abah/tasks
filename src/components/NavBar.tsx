interface Iprops {
  openModal: () => void;
}

const NavBar = ({ openModal }: Iprops) => {
  return (
    <nav className="bg-nav h-10 flex items-center justify-between px-3 shadow-navBar z-20">
      <h1>Todo</h1>
      <button onClick={openModal}>Add Todo</button>
    </nav>
  );
};

export default NavBar;
