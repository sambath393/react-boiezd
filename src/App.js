import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);

  const addItem = (e) => {
    if (e.key === 'Enter') {
      if (item !== '') {
        let arr = [...itemList];
        let index = arr.findIndex((ele) => ele.item === item);

        if (index === -1) {
          arr.push({
            item: item,
          });
          setItemList(arr);
          setItem('');
        } else {
          alert('Duplicate item');
        }
      } else {
        alert('No empty item');
      }
    }
  };

  const editItem = (index, e) => {
    setItem(e.item);
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
        value={item}
        placeholder="item"
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={(e) => addItem(e)}
      />
      <ul>
        {itemList?.map((load, index) => (
          <li key={index} className="item">
            <span>{load.item}</span> &emsp;
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
