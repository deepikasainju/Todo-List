import React, { useState } from 'react';

function ToDo() {
  const [inputText, setInputText] = useState('');
  const [checkboxList, setCheckboxList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Index of checkbox currently in edit mode
  const [editText, setEditText] = useState(''); // Text being edited

  const handleChangeInput = (event) => {
    setInputText(event.target.value);
  };

  const handleAddCheckbox = () => {
    if (inputText.trim() !== '') {
      setCheckboxList([...checkboxList, { text: inputText, checked: false }]);
      setInputText('');
    }
  };

  const handleChangeCheckbox = (index) => {
    const updatedCheckboxList = [...checkboxList];
    updatedCheckboxList[index].checked = !updatedCheckboxList[index].checked;
    setCheckboxList(updatedCheckboxList);
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the checkbox in edit mode
    setEditText(checkboxList[index].text); // Set the text being edited
  };

  const handleUpdate = (index) => {
    const updatedCheckboxList = [...checkboxList];
    updatedCheckboxList[index].text = editText;
    setCheckboxList(updatedCheckboxList);
    setEditIndex(-1); // Exit edit mode
  };

  const handleRemoveCheckbox = (index) => {
    const updatedCheckboxList = [...checkboxList];
    updatedCheckboxList.splice(index, 1);
    setCheckboxList(updatedCheckboxList);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleChangeInput}
          placeholder="Enter Todo Task"
        />
        <button onClick={handleAddCheckbox}>Add Checkbox</button>
      </div>

      <div>
        {checkboxList.map((checkbox, index) => (
          <div key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleUpdate(index)}>Save</button>
              </div>
            ) : (
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={checkbox.checked}
                    onChange={() => handleChangeCheckbox(index)}
                  />
                  {checkbox.text}
                </label>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleRemoveCheckbox(index)}>Remove</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
