import { Dispatch, SetStateAction } from "react";
import { InventoryItemOrder } from "../models/Inventory";
import { formatHouseNameOrderName } from "../utils/Formatting";
import Button from "./Button";
import "./CalculatedOrder.css";

interface Props {
  calculatedOrder: InventoryItemOrder[] | undefined;
  isCalculated: boolean;
  setIsCalculated: Dispatch<SetStateAction<boolean>>;
}

function CalculatedOrder({ calculatedOrder, isCalculated, setIsCalculated }: Props) {
  return (
    <div className={isCalculated ? "CalculatedOrder" : "CalculatedOrder hidden"}>
      <h1>CALCULATED ORDER</h1>
      {!calculatedOrder && <></>}
      {calculatedOrder && (
        <div className="calculated-order">
          {calculatedOrder.map((item, index) => (
            <div className="calculated-order__itemContainer" key={item.houseName + index}>
              <div className="calculated-order__name">{formatHouseNameOrderName(item)}:</div>
              <div className="calculated-order__quantity">{item.quantity}</div>
            </div>
          ))}
          <div className="calculated-order__buttons">
            <Button text={"EDIT QUANTITIES"} backgroundColor={"blue"}></Button>
            <Button text={"PLACE ORDER"} backgroundColor={"green"}></Button>
          </div>
          <Button text={"CLOSE"} backgroundColor={"red"} onClick={() => setIsCalculated(false)} />
        </div>
      )}
    </div>
  );
}

export default CalculatedOrder;
