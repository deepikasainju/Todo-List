import React from "react";
import { useState } from "react";
import "./ToDo.css";
import Header from "../Header";
// import { useNavigate } from "react-router-dom";

const ToDo = () => {
  // navigate
  // const navigate = useNavigate();

  // list handler
  const [inputText, setInputText] = useState("");
  const [checkboxList, setCheckboxList] = useState([]);
  const [filter, setFilter] = useState('all');

  // edit
  const [editIndex, setEditIndex] = useState(-1); // Index of checkbox currently in edit mode
  const [editText, setEditText] = useState(''); // Text being edited


  const handleChangeInput = (event) => {
    setInputText(event.target.value);
  };

  const handleAddCheckbox = () => {
    if (inputText.trim() !== "") {
      setCheckboxList([...checkboxList, { text: inputText, checked: false }]);
      setInputText(""); // Clear the input field after adding a checkbox
    }
    
  };

  const handleChangeCheckbox = (index) => {
    const updatedCheckboxList = [...checkboxList];
    updatedCheckboxList[index].checked = !updatedCheckboxList[index].checked;
    console.log(index)
    setCheckboxList(updatedCheckboxList);
  };

  const handleRemoveCheckbox = (index) => {
    const updatedCheckboxList = [...checkboxList];
    updatedCheckboxList.splice(index, 1);
    console.log(index);
    setCheckboxList(updatedCheckboxList);
  };

  // Function to filter items based on the selected filter
  const filteredItems = checkboxList.filter((checkbox) => {
    if (filter === 'all') {
      return true; // Show all items if 'all' is selected
    } else if (filter === 'active') {
      return !checkbox.checked; // Show active items (unchecked items)
    } else if (filter === 'completed') {
      return checkbox.checked; // Show completed items (checked items)
    }
    return false;
  });

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


  return (
    <div>
      <Header />


      <div className="main lg:ml-40 lg:mr-40 lg:p-7 lg:rounded-2xl m-3 p-5">
        {/* -----enter------ */}
        <div className="m-10 bg-orange-200 p-4 rounded">
          <input
            type="text"
            value={inputText}
            placeholder="Enter Todo Task"
            className="border-solid border-2 h-12 lg:w-96 p-2"
            onChange={handleChangeInput}
          />
          <button
            className="Button p-4 m-4 rounded w-28 hover:text-white"
            onClick={handleAddCheckbox}
          >
            Add
          </button>
        </div>



        {/* ----status----- */}
        <div className="secondPart m-10 p-4 bg-orange-200 rounded">
          <select
            name="status"
            id="status"
            className="border-solid border-2 h-11 lg:w-80 p-1"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>


        
        {/* --------- List ------- */}
        <div className='thirdPart border-solid border-2 m-10 p-4 bg-orange-200 rounded'>
            <h1 className="w-full text-3xl m-4"><strong>Task To Do</strong></h1>
            {(() => {
                if (filteredItems.length===0) {
                    return <p className="m-4">Empty!!!!!....</p>;
                }
            })()}
            {filteredItems.map((checkbox, index) => (
                <div className='flex flex-row justify-between mb-2 border-b-2 border-black border-solid'
                key={index}>

                  {/* ----- condition to check index for editing----- */}

                  {editIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={editText}
                        className="border-solid border-2 h-12 lg:w-96 p-2 rounded-lg m-2"
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button 
                        onClick={() => handleUpdate(index)}
                        className="Button p-4 m-4 rounded w-28 hover:text-white"
                      >Save</button>
                    </div>
                  ):(
                    <>
                      <div className="m-3">
                        <input
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={() => handleChangeCheckbox(index)}
                        />
                        <span className="p-5"><strong>{checkbox.text}</strong></span>
                      </div>

                      <div className="flex justify-end">
                          {/* --edit-- */}
                          <i class="fa-solid fa-pen-to-square" 
                              style={{color: "#4d28d2", fontSize: "30px", marginLeft: "0.5rem",marginRight: "0.5rem"}}
                              onClick={() => handleEdit(index)}
                              ></i>
                          {/* --remove-- */}
                          <i class="fa-solid fa-trash" 
                              style={{color: "#ca2216", fontSize: "30px", marginLeft: "0.5rem", marginRight: "0.5rem"}}
                              onClick={() => handleRemoveCheckbox(index)}
                          ></i>
                      </div>
                  </>
                  )}
                  
                </div>
          ))}
        </div>

        {/* <div className='thirdPart border-solid border-2 m-10 p-4 bg-orange-200 rounded'>
               ----- todo list1------- 
              <div className='flex flex-row justify-between mb-2 border-b-2 border-black border-solid'>
                <div>
                  <input type="checkbox" name='list' id='1' className='p-2 m-4'/> ToDo 1
                </div>
                <div className='flex justify-end'>
                  <i class="fa-solid fa-pen-to-square" style={{color: '#4d28d2', fontSize:'30px', marginLeft:'0.5rem', marginRight:'0.5rem'}}></i>
                  <i class="fa-solid fa-trash" style={{color: '#ca2216', fontSize:'30px', marginLeft:'0.5rem', marginRight:'0.5rem'}}></i>
                </div>
                
              </div>
              
              -----todo list2------ 
              <div className='flex flex-row justify-between mb-2 border-b-2 border-black border-solid'>
                <div>
                  <input type="checkbox" name='list' id='2' className='p-2 m-4'/> ToDo 2
                </div>
                <div className='flex justify-end'>
                  <i class="fa-solid fa-pen-to-square" style={{color: '#4d28d2', fontSize:'30px', marginLeft:'0.5rem', marginRight:'0.5rem'}}></i>
                  <i class="fa-solid fa-trash" style={{color: '#ca2216', fontSize:'30px', marginLeft:'0.5rem', marginRight:'0.5rem'}}></i>
                </div>
              </div> 
            </div> */}


            {/* ----- test button ------ */}
        {/* <button
          className="Button p-4 m-4 rounded w-28 hover:text-white"
          onClick={() => {
            return navigate(`/test`);
          }}
        >
          Test
        </button> */}


      </div>
    </div>
  );
};

export default ToDo;
