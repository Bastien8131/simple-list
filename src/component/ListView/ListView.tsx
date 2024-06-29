import React, { useEffect, useState } from "react";
import "./ListView.scss";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { ListCollectionType } from "../../type/ListCollectionType";
import { CheckboxField } from "@buildo/bento-design-system";

export default function ListView({ onExit, list }: { onExit: () => void, list: ListCollectionType }) {
  const [topHeight, setTopHeight] = useState('100vh');
  const [local, setLocal] = useState(list);
  const [newItem, setNewItem] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [dragEnabled, setDragEnabled] = useState(true);

  const changeNameList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocal({
      ...local,
      name: value
    });
    list.name = value;
  };

  const changeNameOfItemList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setLocal({
      ...local,
      items: local.items.map(item => {
        if (`item-${item.id}` === id) {
          item.name = value;
        }
        return item;
      })
    });
    list.items = local.items;
  };

  const changeStatutOfItem = (id: number) => {
    setLocal({
      ...local,
      items: local.items.map(item => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      })
    });
    list.items = local.items;
  };

  // const addItem = () => {
  //   const items = local.items;
  //   items.push({
  //     id: items.length,
  //     name: '',
  //     checked: false
  //   });
  //   setNewItem(true);
  //   setLocal({
  //     ...local,
  //     items: items
  //   });
  // };

  const deleteItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    if (value === '') {
      const items = local.items.filter((i) => `item-${i.id}` !== id);
      setLocal({
        ...local,
        items: items
      });
    }
  };

  function deleteItem2(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    const items = local.items.filter((i) => `item-${i.id}` !== id);
    setLocal({
      ...local,
      items: items
    });
    list.items = items;
  }

  const changeMode = () => {
    setDragEnabled(!dragEnabled);
    setEditMode(!editMode);
  };

  useEffect(() => {
    const height = document.getElementById('top')?.offsetHeight;
    if (height) {
      setTopHeight(`calc(100vh - ${height}px)`);
    }
  }, []);

  useEffect(() => {
    if (editMode && newItem) {
      const input = document.querySelectorAll('input.input-edit');
      if (input.length > 0) {
        const i = input[input.length - 1] as HTMLInputElement;
        i.focus();
        setNewItem(false);
      }
    }
  }, [local, setLocal]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(local.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLocal({
      ...local,
      items: items
    });
    list.items = items;
  };

  return (
    <>
      <div id={'top'}>
        <div className={"tab"}>
          <button className={'logo exit'} onClick={onExit}></button>
          {editMode ? (
            <input type="text" value={local.name} onChange={changeNameList} />
          ) : (
            <p>{local.name}</p>
          )}
          <button className={'logo edit'} onClick={changeMode}></button>
        </div>
      </div>
      <div className={'items'} style={{ minHeight: topHeight }}>
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {local.items.map((item, index) => (
                  dragEnabled ? (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {editMode ? (
                            <div className={'edit-check'}>
                              <div className={'logo grab'}></div>
                              <input
                                type="text"
                                id={`item-${item.id}`}
                                className={'input-edit'}
                                value={item.name}
                                onChange={changeNameOfItemList}
                                onBlur={deleteItem}
                              />
                              <button className={'logo del'}
                                id={`item-${item.id}`}
                                value={item.name}
                                onClick={deleteItem2}
                              ></button>
                            </div>
                          ) : (
                            <CheckboxField
                              label={item.name}
                              name={`${item.id}`}
                              value={item.checked}
                              onChange={() => { changeStatutOfItem(item.id); }}
                            />
                          )}
                        </li>
                      )}
                    </Draggable>
                  ) : (
                    <li key={item.id}>
                      {editMode ? (<></>) : (
                        <CheckboxField
                          label={item.name}
                          name={`${item.id}`}
                          value={item.checked}
                          onChange={() => { changeStatutOfItem(item.id); }}
                        />
                      )}
                    </li>
                  )
                ))}
                {provided.placeholder}
                {editMode && (
                  <li>
                    <div className={'edit-check'}>
                      <div className={'logo grab'}></div>
                      <input
                        type="text"
                        placeholder={'Add'}
                        // onClick={addItem}
                        onClick={onExit}
                      />
                      <div className={'logo void'}></div>
                    </div>
                  </li>
                )}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
