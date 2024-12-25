import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import rawWarehouseData from "./warehouse.json";

const WarehouseMap = () => {
  const [district, setDistrict] = useState(""); 
  const [filteredWarehouses, setFilteredWarehouses] = useState([]); 

  
  const warehouseData = rawWarehouseData.filter(
    (item) => item.latitude !== "NA" && item.longitude !== "NA"
  );

  
  const districts = [...new Set(warehouseData.map((item) => item.district))];

  // Filter warehouses based on selected district
  useEffect(() => {
    if (district) {
      const filtered = warehouseData.filter(
        (item) => item.district === district
      );
      setFilteredWarehouses(filtered);
    } else {
      setFilteredWarehouses([]);
    }
  }, [district, warehouseData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* District Dropdown */}
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        <option value="">Select a district</option>
        {districts.map((dist) => (
          <option key={dist} value={dist}>
            {dist}
          </option>
        ))}
      </select>

      {/* Warehouse List */}
      <div>
        <h3>Warehouses in {district}</h3>
        <ul>
          {filteredWarehouses.map((warehouse) => (
            <li key={warehouse._id}>
              <strong>{warehouse.name}</strong>: {warehouse.address}
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        center={[11.0, 79.0]} // Center on Tamil Nadu
        zoom={7}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add Markers for Filtered Warehouses */}
        {filteredWarehouses.map((warehouse) => (
          <Marker
            key={warehouse._id}
            position={[warehouse.latitude, warehouse.longitude]}
          >
            <Popup>
              <strong>{warehouse.name}</strong>
              <br />
              {warehouse.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WarehouseMap;
