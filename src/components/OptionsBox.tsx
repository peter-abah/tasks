import React from "react";

interface Iprops {
  handleDelete: () => void;
  handleEdit: () => void;
}

const OptionsBox = React.forwardRef<HTMLDivElement, Iprops>((props, ref) => {
  const { handleEdit, handleDelete } = props;
  return (
    <div
      ref={ref}
      className="absolute top-[2rem] right-0 flex flex-col gap-2 p-4 shadow-lg z-10"
    >
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});

export default OptionsBox;
