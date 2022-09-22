import { ChangeEvent, useState } from "react";
import { DayNumbers, InventoryData, InventoryItemOrder } from "../models/Inventory";
import { formatAppendedClassName, formatFirstLettersToUpperCase } from "../utils/Formatting";
import Button from "./Button";
import CalculatedOrder from "./CalculatedOrder";
import "./InventoryOnHand.css";

const inventoryData: InventoryData[] = [
  {
    houseName: "english muffin toast",
    orderName: "english muffin toast",
    inventoryOrderByDay: {
      0: 0,
      1: 9,
      2: 9,
      3: 9,
      4: 10,
      5: 28,
      6: 0,
    },
  },
  {
    houseName: "sourdough",
    orderName: "sourdough",
    inventoryOrderByDay: {
      0: 0,
      1: 5,
      2: 5,
      3: 5,
      4: 6,
      5: 16,
      6: 0,
    },
  },
  {
    houseName: "white",
    orderName: "italian",
    inventoryOrderByDay: {
      0: 0,
      1: 5,
      2: 5,
      3: 5,
      4: 6,
      5: 14,
      6: 0,
    },
  },
  {
    houseName: "rye",
    orderName: "pumpernickel",
    inventoryOrderByDay: {
      0: 0,
      1: 4,
      2: 4,
      3: 4,
      4: 5,
      5: 10,
      6: 0,
    },
  },
  {
    houseName: "raisin",
    orderName: "raisin",
    inventoryOrderByDay: {
      0: 0,
      1: 4,
      2: 4,
      3: 4,
      4: 5,
      5: 18,
      6: 0,
    },
  },
  {
    houseName: "wheat",
    orderName: "multigrain",
    inventoryOrderByDay: {
      0: 0,
      1: 5,
      2: 5,
      3: 5,
      4: 7,
      5: 14,
      6: 0,
    },
  },
  {
    houseName: "french toast",
    orderName: "challah",
    inventoryOrderByDay: {
      0: 0,
      1: 10,
      2: 10,
      3: 10,
      4: 10,
      5: 26,
      6: 0,
    },
  },
  {
    houseName: "sub bun",
    orderName: "sub bun",
    inventoryOrderByDay: {
      0: 0,
      1: 6,
      2: 6,
      3: 6,
      4: 9,
      5: 12,
      6: 0,
    },
  },
  {
    houseName: "burger bun",
    orderName: "burger bun",
    inventoryOrderByDay: {
      0: 0,
      1: 18,
      2: 18,
      3: 18,
      4: 10,
      5: 24,
      6: 0,
    },
  },
];

function InventoryOnHand() {
  // STATE
  const [onHand, setOnHand] = useState<InventoryItemOrder[]>(newOnHandState);
  const [calculatedOrder, setCalculatedOrder] = useState<InventoryItemOrder[] | undefined>();
  const [isCalculated, setIsCalculated] = useState(false);

  // TODO: get date from server... don't trust client
  const date = new Date();
  const day = date.getDay() as DayNumbers;

  // FUNCTIONS
  function newOnHandState(): InventoryItemOrder[] {
    const newOrderState: InventoryItemOrder[] = inventoryData.map((item) => {
      return {
        houseName: item.houseName,
        orderName: item.orderName,
        quantity: 0,
      };
    });
    return newOrderState;
  }

  function addToOnHand(houseName: string, e: ChangeEvent<HTMLInputElement>) {
    const newTodayOrderState: InventoryItemOrder[] = onHand.map((obj) => {
      if (obj.houseName === houseName) {
        return { ...obj, quantity: Number(e.target.value) };
      } else {
        return { ...obj };
      }
    });
    return newTodayOrderState;
  }

  function calculateOrderAmmounts() {
    const inventoryNeeded: InventoryItemOrder[] = onHand.map((item, index) => {
      const inventoryDataItem = inventoryData.find((dataItem) => dataItem.houseName === item.houseName);
      if (!inventoryDataItem) return item;
      if (item.quantity < inventoryData[index].inventoryOrderByDay[day]) {
        return { ...item, quantity: inventoryDataItem.inventoryOrderByDay[day] - onHand[index].quantity };
      } else {
        return { ...item, quantity: 0 };
      }
    });
    setCalculatedOrder(inventoryNeeded);
    setIsCalculated(true);
  }

  // RENDER
  return (
    <div className="InventoryOnHand">
      <h1>INVENTORY ON HAND</h1>
      <h2>{date.toDateString()}</h2>
      <div className="on-hand">
        {onHand.map((item, index) => (
          <div className="on-hand__itemContainer" key={index + item.houseName}>
            <div className="on-hand__itemName">{formatFirstLettersToUpperCase(item.houseName) + ":"}</div>
            <div className="on-hand__itemValue">
              <input
                type="number"
                placeholder={"0"}
                min={0}
                max={30}
                onChange={(e) => setOnHand(addToOnHand(item.houseName, e))}
                id={`onHandValue${formatAppendedClassName(item.houseName)}`}
              />
            </div>
          </div>
        ))}
        <Button text={"CALCULATE ORDER"} backgroundColor={"green"} onClick={() => calculateOrderAmmounts()} />
      </div>
      <CalculatedOrder calculatedOrder={calculatedOrder} isCalculated={isCalculated} setIsCalculated={setIsCalculated} />
    </div>
  );
}

export default InventoryOnHand;
