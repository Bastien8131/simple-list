// import React from "react";
import "./ListCollection.scss";
import {Body, Button, List, Modal, SearchBar} from "@buildo/bento-design-system";
import {useState} from "react";
import {IconDelete} from "../../icons/IconDelete.tsx";
import {ListCollectionType, ListCollectionType as ListColl} from "../../type/ListCollectionType.tsx";
import OutsideFrame from "../OutsideFrame/OutsideFrame";
// import ListView from "../ListView/ListView.tsx";
import ListView from "../ListView/ListView.tsx";

export default function ListCollection() {

  const [deleteMode, setDeleteMode] = useState(false);
  const [search, setSearch] = useState("");
  const [listCollection, setListCollection] = useState<ListColl[]>(
    JSON.parse(localStorage.getItem('listCollection') || '[]')
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [lastSelected, setLastSelected] = useState<number>(-1);
  const [showFrame, setShowFrame] = useState(false);
  const [selectedList, setSelectedList] = useState({} as ListCollectionType)

  const changeFrameVisibility = () => {
    setShowFrame(!showFrame)
  }

  const getList = () => {
    return sortingList().map((list) => ({
      label: list.name,
      icon: deleteMode ? IconDelete : undefined,
      onPress: () => {
        if(deleteMode) {
          setLastSelected(list.id);
          setConfirmDelete(true)
        }else{
          changeSelectedList(list.id)
        }
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
    updateLocalStorage('listCollection', list)
  };

  const avalableId = () => {
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
    const nl : ListColl = {
      id: avalableId() + 1,
      name: "Nouvelle Liste",
      items: [],
    };
    setSelectedList(nl);
    const list = listCollection.concat(nl);
    setListCollection(list);
    setShowFrame(!showFrame)
    updateLocalStorage('listCollection', list)
  };

  const updateLocalStorage = (key: string, list: ListColl[]) =>{
    localStorage.setItem(key, JSON.stringify(list));
  }

  const onExitFrame = () => {
    const list = selectedList
    const listColl = listCollection

    list.items = list.items.filter((item) => {return item.name !== ''})

    listColl.forEach((l, index) => {
      if (l.id === list.id) {
        listColl[index] = list
      }
    })

    setListCollection(listColl)
    updateLocalStorage('listCollection', listColl)

    changeFrameVisibility()
  }

  const changeSelectedList = (id: number) => {
    const list = listCollection.filter((l) => l.id === id)[0]
    if(list) {
      setSelectedList(list)
      changeFrameVisibility()
    }
  }

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
          placeholder="Rechercher une liste..."
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

      <OutsideFrame showFrame={showFrame}>
        <ListView
          onExit={onExitFrame}
          list={selectedList}
        />
      </OutsideFrame>
    </>
  );
}
