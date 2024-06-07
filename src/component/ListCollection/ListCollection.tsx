import React from "react";
import "./ListCollection.scss";
import { List } from "@buildo/bento-design-system";

export default function ListCollection() {
  const ListCollection = [
    {
      id: 1,
      name: "Liste de Courses",
      items: [
        { id: 1, name: "Pain" },
        { id: 2, name: "Lait" },
        { id: 3, name: "Beurre" },
      ],
    },
    {
        id: 2,
        name: "Mes Jeux Video",
        items: [
            { id: 1, name: "Zelda" },
            { id: 2, name: "Mario" },
            { id: 3, name: "Tetris" },
        ],
    }
  ];

  return (
    <>
      <List
        size="large"
        dividers
        items={
            ListCollection.map((list) => ({
                key: list.id,
                label: list.name
            }))
        }
      />
    </>
  );
}
