import React from "react";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

function DailyForecast() {
  const { fiveDaysForecast } = useContext(WeatherContext); // contexten gelen 5 günlük verimizin tutuldugu state i çagırma işlemi.

  return (
    <div>
      {Array.isArray(fiveDaysForecast) && ( // verimizin olup olmadıgnı kontrol ediyoruz
        <div>
          <div className=" items-center justify-start mt-6 mb-4">
            <p className="text-white font-medium uppercase ">Daily Forecast</p>
          </div>
          <hr className="my-2 mb-3" />
          <div className="flex flex-col sm:flex-row  justify-between items-center mb-6 text-white">
            {fiveDaysForecast.map((item) => {
              //gelen verilerimizi okunabilir olması için düzenliyoruz.
              const date = new Date(item.dt_txt);
              const dayWeek = date.toLocaleDateString("en-US", {
                weekday: "long",
              });

              const dayItem = fiveDaysForecast.filter((listItem) => {
                const listItemDate = new Date(listItem.dt_txt);
                return date.getDate() === listItemDate.getDate();
              });

              return (
                //gelen verimzi map ile istenilen şekilde listeleme işlemleri.
                <div
                  key={item.dt_txt}
                  className="flex flex-col items-center justify-center my-3"
                >
                  <p className="font-light text-md ">{dayWeek}</p>
                  <img
                    src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    className="w-12 my-1"
                  />
                  <p className="  font-light mb-3 ">
                    <span>{Math.round(item.main.temp)}°C </span>
                  </p>

                  <hr className="block  sm:hidden   w-40" />

                  {dayItem.map((listItem) => (
                    <div key={listItem.dt_txt}></div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyForecast;
