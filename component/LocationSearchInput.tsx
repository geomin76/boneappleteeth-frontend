import React, { useState, useEffect, useRef } from "react";

let autoComplete: google.maps.places.Autocomplete;

const loadScript = (url: string, callback: { (): void; (): void; }) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery: React.Dispatch<React.SetStateAction<string>>, lat: number, lng: number, setLat: any, setLng: any, autoCompleteRef: React.MutableRefObject<null>) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, lat, lng, setLat, setLng)
  );
}

async function handlePlaceSelect(updateQuery: (arg0: any) => void, lat: number, lng: number, setLat: any, setLng: any) {
  const addressObject = autoComplete.getPlace();
  console.log(addressObject.geometry?.location?.lat());
  console.log(addressObject.geometry?.location?.lng());
  const query = addressObject.formatted_address;
  updateQuery(query);
  setLat(addressObject.geometry?.location?.lat())
  setLng(addressObject.geometry?.location?.lng())
}

function SearchLocationInput(lat: number, lng: number, setLat: any, setLng: any) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=places`,
      () => handleScriptLoad(setQuery, lat, lng, setLat, setLng, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
}

export default SearchLocationInput;