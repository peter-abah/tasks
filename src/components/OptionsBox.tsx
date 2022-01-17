interface Iprops {
  handleDelete: () => void;
  handleEdit: () => void;
}

const OptionsBox = ({ handleDelete, handleEdit }: Iprops) => {
  return (
    <div className="absolute top-[2rem] right-0 flex flex-col gap-2 p-4 shadow-lg">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
};

export default OptionsBox;