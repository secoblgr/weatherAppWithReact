import React from "react";

function TimeAndLocation() {
  const date = new Date(); //anlık gün ve saat için date  kullanıyoruz.
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const hours = date.toLocaleTimeString();
  const day = date.toLocaleDateString("en-US", options);

  return (
    <div>
      <div className="flex  text-center items-center justify-center my-6">
        <div className="text-white flex flex-col text-lg  sm:flex-row font-extralight">
          <p className="tracking-wider">{day}</p>
          <p className="ml-3 tracking-wider">{hours}</p>
        </div>
      </div>
    </div>
  );
}

export default TimeAndLocation;
