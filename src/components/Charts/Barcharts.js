import React from "react";
import Card from "../UI/Card";
import RadialChart from "./RadialChart";
import { useGetAllExpenseQuery } from "../../services/expenseApi";

const Barcharts = (props) => {
  const { data, error, isLoading } = useGetAllExpenseQuery();

  const filtered_data = data.filter((data_) => {
    return new Date(data_.date).getFullYear().toString() === props.year;
  });

  const max_val = Math.max(...data.map((o) => o.value));

  return (
    <div className="flex flex-row justify-center mt-4 space-y-3">
      <Card className="flex flex-col items-center justify-center space-x-3 bg-slate-900 py-6 pb-1 mb-1 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 gap-10 ">
        <div className="grid gap-10 grid-cols-4 sm:grid-cols-3">
          {filtered_data.map((data_point) => (
            <RadialChart
              key={data_point.id}
              value={data_point.value}
              max={max_val}
              date={data_point.date}
            />
          ))}
        </div>

        <div>
          <button
            className="bg-red-700 px-2 py-1 rounded-md mb-4"
            onClick={props.onCancel}
          >
            Back
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Barcharts;
