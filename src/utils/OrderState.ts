import { ChangeEvent } from "react";
import { InventoryItemOrder } from "../models/Inventory";

export function updateOrder(order: InventoryItemOrder[], houseName: string, e: ChangeEvent<HTMLInputElement>) {
  const newEditedOrderState: InventoryItemOrder[] = order.map((item) => {
    if (item.houseName === houseName) {
      return { ...item, quantity: Number(e.target.value) };
    } else {
      return { ...item };
    }
  });
  return newEditedOrderState;
}

export function compareOrders(calculated: InventoryItemOrder[] | undefined, edited: InventoryItemOrder[] | undefined) {
  if (JSON.stringify(calculated) === JSON.stringify(edited)) return true;
  else return false;
}
