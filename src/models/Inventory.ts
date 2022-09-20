export type DayNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayInventory = { [DayNumber in DayNumbers]: number };

export type InventoryItemName = string;

export type InventoryMap = { [Name in InventoryItemName]: string };

export type InventoryValues = {
  [InventoryValue in InventoryMap as string]: number;
};

export interface InventoryData {
  houseName: string;
  orderName: string;
  inventoryOrderByDay: DayInventory;
}
