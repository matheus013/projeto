import { useSidebar } from "@/hooks/useSidebar";
import { useState } from "react";
import { List } from "./styled";

interface SList {
  name?: string;
  icon?: string;
  active?: boolean | undefined;
  value: number;
}

const SList = ({ name, icon, active, value }: SList) => {
  const { setPage } = useSidebar();

  return (
    <List
      className={active ? "group__list active" : "group__list"}
      onClick={() => setPage(value)}
    >
      <span className="material-symbols-rounded list__icon">{icon}</span>
      <span className="list__name">{name}</span>
    </List>
  );
};

export default SList;
