import { useDispatch, useSelector } from "../store";
import { useState, useEffect } from "react";
import {
  Vehicle,
  deleteVehicle,
  fetchVehicles,
  updateVehicle,
} from "../Slice/vehicleSlice";
import { RootState } from "../store";
import { Button } from "../components/ui/button/button";
import styles from "./vehicleApp.module.scss";
import { Card } from "../components/ui/card/card";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function VehicleApp() {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const [sortKey, setSortKey] = useState<"year" | "price" | "">("");

  useEffect(() => {
    dispatch(fetchVehicles()).catch((err) => {
      console.error("Ошибка запроса:", err);
    });
  }, [dispatch]);

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (!sortKey) return 0;
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  const center =
    vehicles.length > 0
      ? [vehicles[0].latitude, vehicles[0].longitude]
      : [59.9342802, 30.3350986]; //СПб

  return (
    <div className={styles.wrapper}>
      <div className={styles.sortButtons}>
        <Button onClick={() => setSortKey("year")}>Сортировать по году</Button>
        <Button onClick={() => setSortKey("price")}>
          Сортировать по цене
        </Button>
      </div>

      <div className={styles.cardList}>
        {sortedVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            vehiclesId={vehicle.id}
            vehiclesName={vehicle.name}
            vehiclesModel={vehicle.model}
            vehiclesYear={vehicle.year}
            vehiclesColor={vehicle.color}
            vehiclesPrice={vehicle.price}
            onEdit={(id, data) =>
              dispatch(updateVehicle({ id, data: data }))
            }
            onDelete={(id) => dispatch(deleteVehicle(id))}
          />
        ))}
      </div>

      <MapContainer
        center={center as [number, number]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "600px", marginTop: "40px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude, vehicle.longitude]}
          >
            <Popup>
              <strong>
                {vehicle.name} {vehicle.model}
              </strong>
              <br />
              Год: {vehicle.year}
              <br />
              Цена: ${vehicle.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}