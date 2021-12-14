import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [dsp, setDsp] = useState('');
  const [itemList, setItemList] = useState([]);

  const addItem = (e) => {
    if (e.key === 'Enter') {
      if (dsp !== '') {
        let arr = [...itemList];
        let index = arr.findIndex((ele) => ele.dsp === dsp);

        if (index === -1) {
          arr.push({
            dsp: dsp,
          });
          setItemList(arr);
          setDsp('');
        } else {
          alert('Duplicate item');
        }
      } else {
        alert('No empty item');
      }
    }
  };

  const editItem = (index, e) => {
    setDsp(e.dsp);
    let arr = [...itemList];
    arr.splice(index, 1);
    setItemList(arr);
  };

  const deleteItem = (index) => {
    let arr = [...itemList];
    arr.splice(index, 1);
    setItemList(arr);
  };

  return (
    <div>
      <input
        value={dsp}
        placeholder="item"
        onChange={(e) => setDsp(e.target.value)}
        onKeyDown={(e) => addItem(e)}
      />
      <ul>
        {itemList?.map((load, index) => (
          <li key={index} className="item">
            <span>{load.dsp}</span> &emsp;
            <buttom className="edit-btn" onClick={() => editItem(index, load)}>
              edit
            </buttom>
            &emsp;
            <buttom className="delete-btn" onClick={() => deleteItem(index)}>
              delete
            </buttom>
          </li>
        ))}
      </ul>
    </div>
  );
}
