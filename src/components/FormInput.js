const FormInput = ({ inputID, value, onChange }) => {
  return (
    <>
      <label htmlFor={inputID} className="sr-only">{inputID}</label>
      <input 
        type="text" 
        id={inputID} 
        className="add-book-input"
        value={value}
        onChange={onChange}
        placeholder={inputID}
      />
    </>
  )
}

export default FormInput;