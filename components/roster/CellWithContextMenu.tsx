"use client";

import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";
import React from "react";
import { ICellRendererParams } from "ag-grid-community";

export const CELL_MENU_ID = "CELL_MENU_ID";

const CellWithContextMenu: React.FC<ICellRendererParams> = (params) => {
  const { show } = useContextMenu({ id: CELL_MENU_ID });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    show({
      event: e,
      props: {
        value: params.value,
        rowIndex: params.node?.rowIndex,
        colId: params.column?.getId(),
      },
    });
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      <p>{params.value}</p>
    </div>
  );
};

export const CellContextMenu = () => (
  <Menu id={CELL_MENU_ID}>
    <Item id="copy">Copy</Item>
    <Item id="cut">Cut</Item>
    <Separator />
    <Item disabled>Disabled</Item>
    <Separator />
    <Submenu label="Foobar">
      <Item id="reload">Reload</Item>
      <Item id="something">Do something else</Item>
    </Submenu>
  </Menu>
);

export default CellWithContextMenu;
