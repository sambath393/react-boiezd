import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [temp, setTemp] = useState([]);
  const [selectItem, setSelectItem] = useState({});
  const [msg, setMsg] = useState(false)

  const filterFn = (e) => {
    let text = e.target.value;
    setItem(text);

    let arr = [...temp];
    let newArr = [];

    if (text !== '') {
      arr
        .filter((title) =>
          title.item.toUpperCase().includes(text.toUpperCase())
        )
        .map((load) => newArr.push(load));

        if(newArr.length === 0) {
          setMsg(true)
        } else {
          setMsg(false)
        }
    } else {
      newArr = [...temp];
      setMsg(false)
    }

    setItemList(newArr);
  };

  const addItem = (e) => {
    if (e.key === 'Enter') {
      if (item !== '') {
        let arr = [];

        if (temp.length !== itemList.length) {
          arr = [...temp];
        } else {
          arr = [...itemList];
        }

        let index = arr.findIndex(
          (ele) =>
            ele.item.toUpperCase() === item.replace(/\s/g, '').toUpperCase()
        );

        let findIndexById = arr.findIndex((ele) => ele.id === selectItem.id);

        if (Object.keys(selectItem).length !== 0) {
          if (index !== -1 && index !== findIndexById) {
            alert('Duplicate Item');
          } else {
            arr[findIndexById] = { ...arr[findIndexById], item: item };

            setItemList(arr);
            setTemp(arr);
            setItem('');
            setSelectItem({});
          }
        } else {
          if (index === -1) {
            arr.push({
              id: item,
              item: item,
            });

            setItemList(arr);
            setTemp(arr);
            setItem('');
          } else {
            alert('Duplicate item');
          }
        }
      } else {
        alert('No empty item');
      }
    }
    setMsg(false)
  };

  const deleteItem = (index) => {
    let arr = [...temp];
    arr.splice(index, 1);
    setItemList(arr);
    setTemp(arr);
  };

  const editItem = (index, e) => {
    setItem(e.item);
    setSelectItem(e);
    // deleteItem(index);
  };

  return (
    <div>
      <input
        value={item}
        placeholder="item"
        onChange={(e) => filterFn(e)}
        onKeyDown={(e) => addItem(e)}
      />
      <ul>
        {itemList?.map((load, index) => (
          <li key={load.id} className="item">
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
        {
          msg && (
            <li>
              <span> no item found </span>
            </li>
          )
        }
      </ul>
    </div>
  );
}
