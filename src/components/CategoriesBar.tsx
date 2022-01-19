import { Link } from "react-router-dom";

interface Iprops {
  closeSideBar: () => void;
}
const CategoriesBar = ({ closeSideBar }: Iprops) => {
  const links = [
    { name: "All", path: "/all" },
    { name: "Today", path: "/today" },
    { name: "Overdue", path: "/overdue" },
  ];

  return (
    <div className="flex flex-col pt-2 pb-4">
      {links.map(({ name, path }) => (
        <Link onClick={closeSideBar} className="p-2 mb-2 rounded-lg hover:bg-neutral-800" key={path} to={path}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesBar;
