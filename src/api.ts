import { MarkerType, WeatherType } from "./App";

const PLACE_RADIUS = 2500;
const TYPE = "bar";

export const fetchNearbyPlaces = async (
  lat: number,
  lng: number
): Promise<MarkerType[]> => {
  const response = await fetch(
    `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&type=${TYPE}&radius=${PLACE_RADIUS}&language=en`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "trueway-places.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Oh gosh darn it! Map an error.");
  }

  const data = await response.json();
  return data.results;
};

export const fetchWeather = async (
  marker: MarkerType
): Promise<WeatherType> => {
  const response = await fetch(
    `https://yahoo-weather5.p.rapidapi.com/weather?lat=${marker.location.lat}&long=${marker.location.lng}&format=json&u=c`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Oh gosh darn it! Weather an error.");
  }

  const data = await response.json();
  return {
    temp: data.current_observation.condition.temperature,
    text: data.current_observation.condition.text,
  };
};
