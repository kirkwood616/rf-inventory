import { Dispatch, SetStateAction } from "react";
import { InventoryValues } from "../models/Inventory";
import { formatFirstLettersToUpperCase } from "../utils/Formatting";
import Button from "./Button";
import "./CalculatedOrder.css";

interface Props {
  calculatedOrder: InventoryValues | undefined;
  isCalculated: boolean;
  setIsCalculated: Dispatch<SetStateAction<boolean>>;
}

function CalculatedOrder({ calculatedOrder, isCalculated, setIsCalculated }: Props) {
  return (
    <div className={isCalculated ? "CalculatedOrder" : "CalculatedOrder hidden"}>
      <p>CALCULATED ORDER:</p>
      {!calculatedOrder && <></>}
      {calculatedOrder && (
        <>
          {Object.keys(calculatedOrder).map((item, index) => (
            <div key={index + item}>
              {formatFirstLettersToUpperCase(item)}: {calculatedOrder[item]}
            </div>
          ))}
          <div className="buttons">
            <Button text={"EDIT"} backgroundColor={"blue"}></Button>
            <Button text={"SAVE"} backgroundColor={"green"}></Button>
          </div>
          <Button text={"CLOSE"} backgroundColor={"red"} onClick={() => setIsCalculated(false)} />
        </>
      )}
    </div>
  );
}

export default CalculatedOrder;
