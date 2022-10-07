import { Dispatch, SetStateAction } from "react";
import { InventoryItemOrder } from "../models/Inventory";
import { formatHouseNameOrderName } from "../utils/Formatting";
import { compareOrders, updateOrder } from "../utils/OrderState";
import Button from "./Button";

interface Props {
  calculatedOrder: InventoryItemOrder[] | undefined;
  editedOrder: InventoryItemOrder[] | undefined;
  setEditedOrder: Dispatch<SetStateAction<InventoryItemOrder[] | undefined>>;
  isEditActive: boolean;
  setIsEditActive: Dispatch<SetStateAction<boolean>>;
}

function EditedOrder({ calculatedOrder, editedOrder, setEditedOrder, isEditActive, setIsEditActive }: Props) {
  // FUNCTIONS
  function onEditChange() {
    setIsEditActive((current) => !current);
  }

  function onSaveEdit() {
    if (compareOrders(calculatedOrder, editedOrder)) {
      setEditedOrder(undefined);
    }
    setIsEditActive((current) => !current);
  }

  // RENDER
  if (!editedOrder) return <>Oops! Something went wrong.</>;
  return (
    <div className="generated-order">
      <h1>SUP DOUGH?</h1>

      {editedOrder.map((item, index) => (
        <div className="generated-order__itemContainer" key={index + item.houseName}>
          <div className="generated-order__name">{formatHouseNameOrderName(item)}</div>

          {isEditActive && (
            <div className="generated-order__quantity">
              <input type="number" min={0} max={30} value={item.quantity} onChange={(e) => setEditedOrder(updateOrder(editedOrder, item.houseName, e))} />
            </div>
          )}
          {!isEditActive && <div className="generated-order__quantity">{item.quantity}</div>}
        </div>
      ))}

      <div className="generated-order__buttons">
        {isEditActive && <Button text={"SAVE EDIT"} backgroundColor={"green"} onClick={onSaveEdit} />}

        {!isEditActive && (
          <>
            <Button text="EDIT ORDER" backgroundColor="blue" onClick={onEditChange} />
            <Button text="PLACE ORDER" backgroundColor="green" onClick={() => console.log(editedOrder)} />
          </>
        )}
      </div>
    </div>
  );
}

export default EditedOrder;
