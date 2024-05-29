type EditTodoProps = {
  handleSave: () => void;
  editValue: string;
  setEditValue: (value: string) => void;
};

const EditTodo = ({ handleSave, editValue, setEditValue }: EditTodoProps) => {
  return (
    <>
      <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default EditTodo;
