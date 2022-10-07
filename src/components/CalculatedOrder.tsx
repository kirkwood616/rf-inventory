import { Dispatch, SetStateAction } from "react";
import { InventoryItemOrder } from "../models/Inventory";
import { formatHouseNameOrderName } from "../utils/Formatting";
import Button from "./Button";
// import "./CalculatedOrder.css";

interface Props {
  calculatedOrder: InventoryItemOrder[] | undefined;
  isCalculated: boolean;
  isEditActive: boolean;
  setIsEditActive: Dispatch<SetStateAction<boolean>>;
  setEditedOrder: Dispatch<SetStateAction<InventoryItemOrder[] | undefined>>;
}

function CalculatedOrder({ calculatedOrder, isCalculated, isEditActive, setIsEditActive, setEditedOrder }: Props) {
  // FUNCTIONS
  function onEditCalculated() {
    setEditedOrder(calculatedOrder);
    setIsEditActive((current) => !current);
  }

  // RENDER
  if (!calculatedOrder) return <>Oops!</>;
  return (
    <div className={isCalculated ? "CalculatedOrder" : "CalculatedOrder hidden"}>
      {calculatedOrder && (
        <div className="generated-order">
          {calculatedOrder.map((item, index) => (
            <div className="generated-order__itemContainer" key={item.houseName + index}>
              <div className="generated-order__name">{formatHouseNameOrderName(item)}:</div>
              <div className="generated-order__quantity">{item.quantity}</div>
            </div>
          ))}

          <div className="generated-order__buttons">
            <Button text={"PLACE ORDER"} backgroundColor={"green"} onClick={() => console.log(calculatedOrder)} />

            {!isEditActive && <Button text={"EDIT QUANTITIES"} backgroundColor={"blue"} onClick={onEditCalculated} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalculatedOrder;
