import React from "react";

const FilterExpense = (props) => {
  const dropDownHandler = (event) => {
    props.onchangeFilter(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center mb-2">
      <div className="">
        <select onChange={dropDownHandler} value={props.selected_year}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default FilterExpense;
