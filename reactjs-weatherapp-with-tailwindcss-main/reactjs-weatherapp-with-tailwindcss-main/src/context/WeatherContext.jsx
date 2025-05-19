import axios from "axios";

import { createContext, useState, useEffect } from "react"; //contextimizi oluşturuyoruz.
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("İstanbul"); //aratılacak şehir için state oluşturma.

  const [currentWeather, setCurrentWeather] = useState({}); // api üzeirnden gelen datayı state üzerinde alma
  const [fiveDaysForecast, setFiveDaysForecast] = useState([]);

  const key = "d001d2d7c16eee968a64aa9a4425e1f7";

  // eger ilk olarak konum için veri istiyorsak burayı kullanmalıyız.

  // useEffect(() => {
  //   // uygulamamız açıldğında direkt konum üzerindeki bilgileri çekiyoruz.
  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude } = position.coords;

  //       const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  //       const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

  //       // Şimdiki hava durumu için API isteği gönderme
  //       const currentWeather = await axios.get(currentWeatherUrl);
  //       setCurrentWeather(currentWeather.data);
  //       console.log(currentWeather.data);

  //       // 5 günlük hava durumu tahmini için API isteği gönderme
  //       const fiveDaysForecast = await axios.get(forecastUrl);
  //       setFiveDaysForecast(
  //         fiveDaysForecast.data.list.filter((data) =>
  //           data.dt_txt.includes("12:00:00")
  //         )
  //       );
  //       console.log(fiveDaysForecast.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, []);

  // ilk olarak ilstanbul için verileri getirsin
  useEffect(() => {
    city === "" ? alert("Please fill in the search field ! ") : null; //search kısmı boş ise uyarı versin
    setCity(""); //arama yapıldıktan sonra inputu boşaltma işlemi
    async function getData() {
      //verileri çekmek için oluşturdugumuz fonksiyonumuz
      try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;
        const currentWeather = await axios.get(currentWeatherUrl);
        setCurrentWeather(currentWeather.data); //anlık gelen verimizi state üzerine gönderme
        console.log(currentWeather.data);

        const fiveDaysForecast = await axios.get(forecastUrl);
        setFiveDaysForecast(
          fiveDaysForecast.data.list.filter((data) =>
            data.dt_txt.includes("12:00:00")
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  //istenilen konum için bilgiler
  const handleSearch = () => {
    city === "" ? alert("Please fill in the search field ! ") : null; //search kısmı boş ise uyarı versin
    setCity(""); //arama yapıldıktan sonra inputu boşaltma işlemi
    async function getData() {
      //verileri çekmek için oluşturdugumuz fonksiyonumuz
      try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;
        const currentWeather = await axios.get(currentWeatherUrl);
        setCurrentWeather(currentWeather.data); //anlık gelen verimizi state üzerine gönderme
        console.log(currentWeather.data);

        const fiveDaysForecast = await axios.get(forecastUrl);
        setFiveDaysForecast(
          fiveDaysForecast.data.list.filter((data) =>
            data.dt_txt.includes("12:00:00")
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  };

  // konumun farklı oldugu düşünülüyor ise tekrar konum için bilgiler.
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

        // Şimdiki hava durumu için API isteği gönderme
        const currentWeather = await axios.get(currentWeatherUrl);
        setCurrentWeather(currentWeather.data); //tekrar verilerimizi state üzerinde gönderme
        console.log(currentWeather.data);

        // 5 günlük hava durumu tahmini için API isteği gönderme
        const fiveDaysForecast = await axios.get(forecastUrl);
        setFiveDaysForecast(
          fiveDaysForecast.data.list.filter((data) =>
            data.dt_txt.includes("12:00:00")
          )
        );
        console.log(fiveDaysForecast.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //context verilerimizi value olarak diger componentlere gönderme.
  const values = {
    city,
    setCity,
    currentWeather,
    setCurrentWeather,
    fiveDaysForecast,
    setFiveDaysForecast,
    handleClick,
    handleSearch,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
