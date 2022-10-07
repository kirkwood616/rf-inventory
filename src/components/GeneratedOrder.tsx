import "./GeneratedOrder.css";

import { Dispatch, SetStateAction, useState } from "react";
import { InventoryItemOrder } from "../models/Inventory";
import Button from "./Button";
import CalculatedOrder from "./CalculatedOrder";
import EditedOrder from "./EditedOrder";

interface Props {
  calculatedOrder: InventoryItemOrder[] | undefined;
  isCalculated: boolean;
  setIsCalculated: Dispatch<SetStateAction<boolean>>;
}

function GeneratedOrder({ calculatedOrder, isCalculated, setIsCalculated }: Props) {
  // STATE
  const [isEditActive, setIsEditActive] = useState(false);
  const [editedOrder, setEditedOrder] = useState<InventoryItemOrder[] | undefined>();

  // FUNCTIONS
  function onClose() {
    if (isEditActive) setIsEditActive((current) => !current);
    setIsCalculated((current) => !current);
    setEditedOrder(undefined);
  }

  function isEditedOrder() {
    if (editedOrder || isEditActive) return true;
    return false;
  }

  return (
    <div className={isCalculated ? "GeneratedOrder" : "GeneratedOrder hidden"}>
      <h1>{!editedOrder ? "CALCULATED " : "EDITED "}ORDER</h1>

      {!isEditedOrder() && (
        <CalculatedOrder
          calculatedOrder={calculatedOrder}
          isCalculated={isCalculated}
          isEditActive={isEditActive}
          setIsEditActive={setIsEditActive}
          setEditedOrder={setEditedOrder}
        />
      )}

      {isEditedOrder() && (
        <EditedOrder
          calculatedOrder={calculatedOrder}
          editedOrder={editedOrder}
          setEditedOrder={setEditedOrder}
          isEditActive={isEditActive}
          setIsEditActive={setIsEditActive}
        />
      )}

      <Button text={"CLOSE"} backgroundColor={"red"} onClick={onClose} />
    </div>
  );
}

export default GeneratedOrder;
