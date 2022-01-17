interface Iprops {
  handleDelete: () => void;
  handleEdit: () => void;
}

const OptionsBox = ({ handleDelete, handleEdit }: Iprops) => {
  return (
    <div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
};

export default OptionsBox;