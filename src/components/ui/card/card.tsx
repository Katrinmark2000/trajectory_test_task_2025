import { useState } from 'react';
import { Input } from "../input/input"; // путь к Input компоненту
import { Button } from "../button/button";
import { TEditData, TUICardProps } from "./type";
import styles from './card.module.scss';
import btn from '../ui/button/button.module.scss';


export const Card = ({
  vehiclesId,
  vehiclesName,
  vehiclesModel,
  vehiclesYear,
  vehiclesColor,
  vehiclesPrice,
  onEdit,
  onDelete,
}: TUICardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<TEditData>({
    name: vehiclesName,
    price: vehiclesPrice,
  });

  const handleSave = () => {
    if (onEdit) onEdit(vehiclesId, editData);
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {vehiclesName} <span>{vehiclesModel}</span>
        </h2>
        <span className={styles.id}>#{vehiclesId}</span>
      </div>

      <div className={styles.details}>
        <p>
          <strong>Year:</strong> {vehiclesYear}
        </p>
        <p> 
          <strong>Color:</strong> {vehiclesColor} 
        </p>
        <p>
          <strong>Price:</strong> ${vehiclesPrice.toLocaleString()}
        </p>
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <Input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Название"
            />
            <Input
              type="number"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: Number(e.target.value) })
              }
              placeholder="Цена"
            />
            <Button onClick={handleSave}>Сохранить</Button>
            <Button onClick={() => setIsEditing(false)}>Отмена</Button>
          </>
        ) : (
          <>
            {onEdit && (
              <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            )}
            {onDelete && (
              <Button onClick={() => onDelete(vehiclesId)}>Удалить</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};