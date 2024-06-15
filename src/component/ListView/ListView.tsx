// import React from "react";
import "./ListView.scss";
import {useEffect, useState} from "react";
import {ListCollectionType} from "../../type/ListCollectionType.tsx";
import {CheckboxField} from "@buildo/bento-design-system";

export default function ListView({onExit, list}: { onExit: () => void, list: ListCollectionType }) {

  const [topHeight, setTopHeight] = useState('100vh');
  const [local, setLocal] = useState(list)
  const [editMode, setEditMode] = useState(true)
  const [newItem, setNewItem] = useState(false)

  const changeNameList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setLocal({
      ...local,
      name: value
    });
    list.name = value;
  };

  const changeNameOfItemList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
    const value = e.target.value

    setLocal({
      ...local,
      items: local.items.map(item => {
        if (`item-${item.id}` === id) {
          item.name = value
        }
        return item
      })
    });

    list.items = local.items;
  };

  const changeStatutOfItem = (id: number) => {

    setLocal({
      ...local,
      items: local.items.map(item => {
        if (item.id === id) {
          item.checked = !item.checked
        }
        return item
      })
    });

    list.items = local.items;
  };

  const addItem = () => {
    const items = local.items;
    items.push({
      id: items.length,
      name: '',
      checked: false
    });

    setNewItem(true);

    setLocal({
      ...local,
      items: items
    });

    
  }

  const deleteItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
    const value = e.target.value
    if(value === ''){
      const items = local.items.filter((i) => `item-${i.id}` !== id);

      setLocal({
        ...local,
        items: items
      });
    }
  }

  const changeMode = () => {
    setEditMode(!editMode)
  }

  useEffect(() => {
    const height = document.getElementById('top')?.offsetHeight;
    if (height) {
      setTopHeight(`calc(100vh - ${height}px)`);
    }
  }, []);

  useEffect(() => {
    if(editMode && newItem){
      const input = document.querySelectorAll('input.input-edit');
      if(input.length > 0){
        const i = input[input.length - 1] as HTMLInputElement;
        i.focus();
        setNewItem(false);
      }
    }
  }, [local, setLocal]);


  return (
    <>
      <div id={'top'}>
        <div className={"tab"}>
          <button onClick={onExit}>X</button>
          {editMode ?
            <input type="text" value={local.name} onChange={changeNameList}/>
            :
            <p>{local.name}</p>
          }
          <button onClick={changeMode}>C</button>
        </div>
      </div>
      <div className={'items'} style={{minHeight: topHeight}}>
        <ul>
          {local.items.map(item => {
            return (
              <li key={item.id}>
                {editMode ?
                  <div className={'edit-check'}>
                    <div className={'grab'}>::</div>
                    <input type="text" id={`item-${item.id}`} className={'input-edit'} value={item.name}
                           onChange={changeNameOfItemList}
                           onBlur={deleteItem}
                    />
                  </div>
                  :
                  <CheckboxField
                    label={item.name}
                    name={`${item.id}`}
                    value={item.checked}
                    onChange={() => {changeStatutOfItem(item.id)}}
                  />
                }
              </li>
            )
          })}
          <li><button onClick={addItem} >Add</button></li>
        </ul>
      </div>
    </>
  );
}
