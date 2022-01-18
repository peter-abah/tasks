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
        <Link onClick={closeSideBar} className="py-2" key={path} to={path}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesBar;
