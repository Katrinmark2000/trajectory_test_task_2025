import { useDispatch, useSelector } from "../store";
import { useState, useEffect } from "react";
import {
  deleteVehicle,
  fetchVehicles,
  updateVehicle,
} from "../slice/vehicleSlice";
import { RootState } from "../store";
import { Button } from "../components/ui/button/button";
import styles from "./vehicleApp.module.scss";
import { Card } from "../features/card/card";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type SortKey = 'price' | 'year' | '';

export default function VehicleApp() {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const [sort, setSort] = useState<{ key: 'price' | 'year' | ''; order: 'asc' | 'desc' | '' }>({ key: '', order: '' }); //сортировка по году по цене, по взорастанию по убыванию, без сортировки

  //получаем данные с сервера
  useEffect(() => {
    dispatch(fetchVehicles()).catch((err) => {
      console.error("Ошибка запроса:", err);
    });
  }, [dispatch]);

//смена сортировки
  const toggleSort = (key: SortKey) => {
    if (sort.key !== key) {
      setSort({ key, order: 'asc' });
    } else if (sort.order === 'asc') {
      setSort({ key, order: 'desc' });
    } else {
      setSort({ key: '', order: '' });
    }
  };

//сортировка
  const sortedVehicles = [...vehicles].sort((a, b) => {
    const { key, order } = sort;
    if (!key || !order) return 0;

    const aValue = a[key];
    const bValue = b[key];

    if (order === 'asc') return aValue - bValue; //по возрастанию, a-b
    if (order === 'desc') return bValue - aValue; //по убыванию b-a
    return 0;
  });

 //изначальное положение на карте
  const center =
    vehicles.length > 0
      ? [vehicles[0].latitude, vehicles[0].longitude]
      : [59.9342802, 30.3350986]; //СПб

  return (
    <div className={styles.wrapper}>
      <div className={styles.sortButtons}>
        <Button
          onClick={() => toggleSort("year")}
          className={sort.key === "year" ? styles.activeSort : ""}
        >
          Год {sort.key === "year" && (sort.order === "asc" ? "↑" : sort.order === "desc" ? "↓" : "↕")}
        </Button>

        <Button
          onClick={() => toggleSort("price")}
          className={sort.key === "price" ? styles.activeSort : ""}
        >
          Цена {sort.key === "price" && (sort.order === "asc" ? "↑" : sort.order === "desc" ? "↓" : "↕")}
        </Button>
      </div>

      <div className={styles.sortLabel}>
        {!sort.key && <span>Сортировка не выбрана</span>}
        {sort.key && (
          <span>
            Сортировка: по {sort.key === "year" ? "году" : "цене"} (
            {sort.order === "asc" ? "возрастание" : "убывание"})
          </span>
        )}
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
        style={{ height: "400px", width: "100%", marginTop: "40px" }}
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