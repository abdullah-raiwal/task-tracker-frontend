import React, { useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import Card from "../UI/Card";
import Barcharts from "../Charts/Barcharts";

export const NewTask = (props) => {
  const [isForm, setisForm] = useState(0);
  // 0 == form not rendered, 1 == form rendered, 2 means charts rendered
  const [isCharts, setCharts] = useState(false);

  const startEditingHander = () => {
    setisForm(1);
  };
  const stopEditingHandler = () => {
    setisForm(0);
  };

  const changeFormHandler = () => {
    setisForm(2);
  };
  const startChartHandler = () => {
    setCharts(true);
    setisForm(2);
  };

  const stopChartHandler = () => {
    setisForm(0);
    setCharts(false);
  };

  return (
    <div className="">
      {/* !isEditing means we shortcircuit the value  */}
      {isForm === 0 && (
        <div className="flex flex-row justify-center mt-4">
          <Card className="flex flex-row items-center justify-center space-x-3 bg-slate-900 py-6 mb-1 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4">
            <button
              className="text-white py-2 px-2 bg-red-700 rounded-md"
              onClick={startEditingHander}
            >
              Add New Expense
            </button>

            <button
              className="text-white py-2 px-2 bg-red-700 rounded-md"
              onClick={startChartHandler}
            >
              Show Charts
            </button>
          </Card>
        </div>
      )}

      {isForm === 1 && (
        <ExpenseForm onCancel={stopEditingHandler}></ExpenseForm>
      )}
      {isCharts && (
        <Barcharts
          onCancel={stopChartHandler}
          data={props.data}
          year={props.year}
        ></Barcharts>
      )}
    </div>
  );
};
