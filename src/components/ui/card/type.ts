export type TEditData = {
    name: string;
    price: number;
  };
  
  export type TUICardProps = {
    vehiclesId: number;
    vehiclesName: string;
    vehiclesModel: string;
    vehiclesYear: number;
    vehiclesColor: string;
    vehiclesPrice: number;
    onEdit?: (id: number, data: TEditData) => void;
    onDelete?: (id: number) => void;
  };