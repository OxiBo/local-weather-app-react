import React from "react";
import SearchBar from "./SearchBar";

const UpdateInfo = props => {
    const {isLocationLoading, isWeatherLoading, updatedTime, interval, onSubmit } = props; 
  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {interval && <div><p>The weather will be updated every {interval} hours</p></div>}
      
      <div className="updated">
        Updated:
        {isLocationLoading && isWeatherLoading ? (
          <p> Loading... </p>
        ) : (
          updatedTime
        )}
      </div>
    </div>
  );
};

export default UpdateInfo;
