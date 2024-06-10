// import React from "react";
import "./ListCollection.scss";
import {Body, Button, List, Modal, SearchBar} from "@buildo/bento-design-system";
import {useState} from "react";
import {IconDelete} from "../../icons/IconDelete.tsx";
import {ListCollectionType as ListColl} from "../../type/ListCollectionType.tsx";

export default function ListCollection({ onExecute }: { onExecute: () => void }) {

  const [deleteMode, setDeleteMode] = useState(false);
  const [search, setSearch] = useState("");
  const [listCollection, setListCollection] = useState<ListColl[]>(
    JSON.parse(localStorage.getItem('listCollection') || '[]')
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [lastSelected, setLastSelected] = useState<number>(-1);

  const getList = () => {
    return sortingList().map((list) => ({
      label: list.name + ' : ' + list.id,
      icon: deleteMode ? IconDelete : undefined,
      onPress: () => {
        if(!deleteMode) return;
        setLastSelected(list.id);
        setConfirmDelete(true)
      },
    }))
  }

  const sortingList = (): ListColl[] => {
    return listCollection.filter((list) =>
      list.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const changeDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const deleteList = (key: number) => {
    console.log(key);

    const list = listCollection.filter((list) => list.id !== key);
    // console.log(list);
    setListCollection(list);
    localStorage.setItem('listCollection', JSON.stringify(list));
  };

  const firstId = () => {
    const list = listCollection;
    let id = 0;
    list.forEach((list) => {
      if (list.id > id) {
        id = list.id;
      }
    });
    return id;
  }

  const createList = () => {
    onExecute();
    // const list = listCollection.concat({
    //   id: firstId() + 1,
    //   name: "Nouvelle Liste",
    //   items: [
    //     {
    //       id: 0,
    //       name: "Nouvel Item"
    //     }
    //   ],
    // });
    // setListCollection(list);
    // // console.log(list);
    // localStorage.setItem('listCollection', JSON.stringify(list));
  };

  return (
    <>
      <div className={`navbar ${deleteMode ? "" : "del"}`}>
        <Button
          kind="solid"
          hierarchy={deleteMode ? "primary" : "danger"}
          label={deleteMode ? "OK" : ""}
          onPress={() => changeDeleteMode()}
        />
        <SearchBar
          placeholder="Search a value..."
          value={search}
          onChange={setSearch}
          aria-label="Search"
        />
      </div>
      <div className={'list'}>
        <List
          size="large"
          dividers
          items={getList()}
        />
      </div>
      <div className={'new'}>
        <Button
          kind="solid"
          hierarchy="primary"
          label="Nouvelle Liste"
          onPress={createList}
        />
      </div>
      {confirmDelete && (
        <Modal
          title="Est vous sûr ?"
          onClose={() => setConfirmDelete(false)}
          size={"small"}
          primaryAction={{
            label: "Oui",
            onPress: () => {
              deleteList(lastSelected);
              setConfirmDelete(false)
            },
          }}
          secondaryAction={{
            label: "Annuler",
            onPress: () => setConfirmDelete(false),
          }}
        >
          <Body size="medium">La suppresion de c'est liste sera définitive</Body>
        </Modal>
      )}
    </>
  );
}
