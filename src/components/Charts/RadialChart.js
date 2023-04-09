import React from "react";

const RadialChart = (props) => {
  const month = new Date(props.date).toLocaleString("en-US", { month: "long" })
  console.log('in radial chart')
  console.log(props.date)
  
  const val_per = Math.round((props.value / props.max) * 100);
  return (
    <div>
      <div>
        <div
          className="radial-progress"
          style={{
            "--value": val_per.toString(),
            "--size": "4rem",
            "--thickness": "2px",
          }}
        >
          {val_per} %
        </div>
        <p>{month}</p>
      </div>
    </div>
  );
};

export default RadialChart;
