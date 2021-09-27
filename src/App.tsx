import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useQuery } from "react-query";
// API calls
import { fetchNearbyPlaces } from "./api";

// Styles
import { Wrapper, LoadingView } from "./App.styles";
import { containerStyle, center, options } from "./settings";

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

const App: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!,
  });

  // Save ampp in ref if we want to access the map
  const mapRef = React.useRef<google.maps.Map<Element> | null>(null);

  const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>(
    {} as google.maps.LatLngLiteral
  );

  const {
    data: nearbyPositions,
    isLoading,
    isError,
  } = useQuery(
    [clickedPos.lat, clickedPos.lng],
    () => fetchNearbyPlaces(clickedPos.lat, clickedPos.lng),
    {
      enabled: !!clickedPos.lat,
      refetchOnWindowFocus: false,
    }
  );

  const onLoad = (map: google.maps.Map<Element>): void => {
    mapRef.current = map;
  };

  const onUnmount = (): void => {
    mapRef.current = null;
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    console.log(e);
  };

  if (!isLoaded) return <div>Map Loading...</div>;

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      />
    </Wrapper>
  );
};

export default App;
