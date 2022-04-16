import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./users.module.css"

type PropsType = {
  pageSize: number,
   currentPage: number, 
   onPageChanged: (p: number) => void, 
   totalItemsCount: number, 
   portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ pageSize, currentPage, onPageChanged, totalItemsCount, portionSize = 10 }) => {
  let pages = [];
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let portionsCount = (pagesCount / portionSize);
  let [portion, setPortion] = useState(1);
  let leftBorderPortion = (portion - 1) * portionSize + 1;
  let rightBorderPortion = portion * portionSize;
  useEffect(()=>{
    setPortion(portion);
  }, [portion]);
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let prev = "<";
  let next = ">";
  return (
    <div className={classes.pages}>
      { portion > 1 && <button className={classes.button} onClick={() => setPortion(portion - 1)}>{prev}</button>}
      {pages.filter(p => p >= leftBorderPortion && p <= rightBorderPortion)
      .map((p) => (
        <span
          key={p}
          className={
            currentPage === p
              ? classes.selected + " " + classes.pageNumber
              : classes.pageNumber
          }
          onClick={() => onPageChanged(p)}
        >
          {p}
        </span>
      ))}
      {portionsCount > portion && <button className={classes.button} onClick={() => setPortion(portion + 1)}>{next}</button>}
    </div>
    
  );
};
export default Paginator;
