import React from "react";
import "./monthsCard.css";

export default function WeekCard(props) {
  const { months, show, selectMonth } = props;
  return (
    <div
      style={{ display: `${show ? "block" : "none"}` }}
      className="monthsCardBox"
    >
      <ul>
        {months.map((m, i) => {
          return (
            <li key={m} value={i} onClick={() => selectMonth(i)}>
              {m}
            </li>
          );
        })}
        {}
      </ul>
    </div>
  );
}
