// Settings for the map goes inside this file
import mapStyles from "./mapStyles";

export const containerStyle = {
  width: "100%",
  height: "100vh",
};

// Center on Kalmar
export const center = {
  lat: 55.95,
  lng: -3.19,
};

// Disable default UI
export const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
