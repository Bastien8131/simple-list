import React, { useEffect, useState } from "react";
import "./ListView.scss";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { ListCollectionType } from "../../type/ListCollectionType";
import {Box, CheckboxField, Menu, Switch} from "@buildo/bento-design-system";

export default function ListView({ onExit, list }: { onExit: () => void, list: ListCollectionType }) {
  const [topHeight, setTopHeight] = useState('100vh');
  const [local, setLocal] = useState(list);
  const [newItem, setNewItem] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(false);

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
  };

  const sortAtoZ = () => {
    const items = local.items;
    items.sort((a, b) => a.name.localeCompare(b.name))

    setLocal({
      ...local,
      items: items
    });
    list.items = local.items;
  }

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

  function deleteItemThisID(id: string) {
    // const id = e.currentTarget.id;
    console.log(id);
    const items = local.items.filter((i) => `item-${i.id}` !== id);
    console.log(items);
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

  const idIsLasted = (id: number) => {
    return id === local.items[local.items.length - 1].id;
  }

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
          <Menu
            size="large"
            items={[
              {
                label:
                  <Switch
                    label="Modifier"
                    name="Modifier"
                    value={editMode}
                    switchPosition={'trailing'}
                    onChange={(e) => {e}}
                  />
                ,
                onPress: () => changeMode(),
              },
              {
                label: "Trier de A à Z",
                onPress: () => sortAtoZ(),
              }
            ]}
            trigger={(ref, triggerProps, { toggle }) => (
              <Box
                ref={ref}
                display="inline-block"
                onClick={() => toggle()}
                cursor="pointer"
                {...triggerProps}
              >
                <button className={'logo edit'}></button>
              </Box>
            )}
            offset={10}
            dividers
            closeOnSelect
          />
        </div>
      </div>
      <div className={'items'} style={{ height: topHeight }}>
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
                              <Menu
                                size="medium"
                                items={[
                                  {
                                    label: 'Ajouter une image',
                                    onPress: () => console.log(''),
                                  },
                                  {
                                    label: <span className={'alert'}>Supprimer</span>,
                                    // label: "Supprimer",
                                    onPress: () => deleteItemThisID(`item-${item.id}`),
                                  }
                                ]}
                                trigger={(ref, _triggerProps, { toggle }) => (
                                  <Box
                                    ref={ref}
                                    display="inline-block"
                                    onContextMenu={(e) => {
                                      e.preventDefault();  // Empêche le menu contextuel par défaut du navigateur
                                      toggle();  // Ouvre/ferme le menu
                                    }}
                                    cursor="pointer"
                                  >
                                    <input
                                      type="text"
                                      id={`item-${item.id}`}
                                      className={'input-edit'}
                                      value={item.name}
                                      onChange={changeNameOfItemList}
                                      onBlur={deleteItem}
                                      // addItems if enter key pressed
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter' && idIsLasted(item.id) ) {
                                          addItem();
                                        }
                                      }}

                                      // onContextMenu={(e) => deleteItem2(e)}
                                    />
                                  </Box>
                                )}
                                offset={10}
                                dividers
                                closeOnSelect
                                // initialIsOpen
                              />
                              <button className={'logo void'}
                                      id={`item-${item.id}`}
                                      value={item.name}
                                // onClick={deleteItem2}
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
                        onFocus={addItem}
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
