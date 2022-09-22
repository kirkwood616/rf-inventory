import { InventoryItemOrder } from "../models/Inventory";

export function formatFirstLettersToUpperCase(string: string) {
  if (string.includes(" ")) {
    let splitArray = string.split(" ");
    for (let i = 0; i < splitArray.length; i++) {
      splitArray[i] = splitArray[i][0].toUpperCase() + splitArray[i].substring(1);
    }
    return splitArray.join(" ");
  } else {
    return string[0].toUpperCase() + string.substring(1);
  }
}

export function formatAppendedClassName(string: string) {
  if (string.includes(" ")) {
    let splitArray = string.split(" ");
    for (let i = 0; i < splitArray.length; i++) {
      splitArray[i] = splitArray[i][0].toUpperCase() + splitArray[i].substring(1);
    }
    return splitArray.join("");
  } else {
    return string[0].toUpperCase() + string.substring(1);
  }
}

export function formatHouseNameOrderName(orderItem: InventoryItemOrder) {
  if (orderItem.houseName === orderItem.orderName) {
    return formatFirstLettersToUpperCase(orderItem.houseName);
  } else {
    const houseName = formatFirstLettersToUpperCase(orderItem.houseName);
    const orderName = formatFirstLettersToUpperCase(orderItem.orderName);
    return `${houseName} (${orderName})`;
  }
}
