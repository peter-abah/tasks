import { Triangle } from "react-loader-spinner";

const MainLoadingAnim = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Triangle color="white" width={100} height={100} />
    </div>
  );
};

export default MainLoadingAnim;
