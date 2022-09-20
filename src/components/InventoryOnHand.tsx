import { ChangeEvent, useState } from "react";
import { DayNumbers, InventoryData, InventoryValues } from "../models/Inventory";
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
  const [todayOrder, setTodayOrder] = useState(newOrderState);
  const [calculatedOrder, setCalculatedOrder] = useState<InventoryValues | undefined>();
  const [isCalculated, setIsCalculated] = useState(false);

  // TODO: get date from server... don't trust client
  const date = new Date();
  const day = date.getDay() as DayNumbers;

  // FUNCTIONS
  function newOrderState(): InventoryValues {
    let newOrderState = {} as InventoryValues;
    for (let i = 0; i < inventoryData.length; i++) {
      newOrderState = { ...newOrderState, [inventoryData[i].houseName]: 0 };
    }
    return newOrderState;
  }

  function addToTodayOrder(state: InventoryValues, key: string, e: ChangeEvent<HTMLInputElement>): InventoryValues {
    const newTodayOrderState: InventoryValues = { ...state, [key]: Number(e.currentTarget.value) };
    return newTodayOrderState;
  }

  function calculateOrderAmmounts(state: InventoryValues) {
    let inventoryNeeded = {} as InventoryValues;
    for (let i = 0; i < inventoryData.length; i++) {
      inventoryNeeded = { ...inventoryNeeded, [inventoryData[i].houseName]: inventoryData[i].inventoryOrderByDay[day] };
    }

    let orderAmmounts = {} as InventoryValues;
    for (const [key, value] of Object.entries(state)) {
      if (value < inventoryNeeded[key]) {
        orderAmmounts = { ...orderAmmounts, [key]: inventoryNeeded[key] - value };
      } else {
        orderAmmounts = { ...orderAmmounts, [key]: 0 };
      }
    }

    setCalculatedOrder(orderAmmounts);
    setIsCalculated(true);
  }
  console.log(todayOrder);

  // RENDER
  return (
    <div className="InventoryOnHand">
      <h1>INVENTORY ON HAND</h1>
      <h2>{date.toDateString()}</h2>
      <div className="on-hand">
        {Object.keys(todayOrder).map((key, index) => (
          <div className="on-hand__itemContainer" key={index + key}>
            <label htmlFor={`onHandValue${formatAppendedClassName(key)}`}>
              <div className="on-hand__itemName">{formatFirstLettersToUpperCase(key) + ":"}</div>
            </label>
            <div className="on-hand__itemValue">
              <input
                type="number"
                placeholder={"0"}
                min={0}
                max={30}
                onChange={(e) => setTodayOrder(addToTodayOrder(todayOrder, key, e))}
                id={`onHandValue${formatAppendedClassName(key)}`}
              />
            </div>
          </div>
        ))}
        <Button text={"CALCULATE ORDER"} backgroundColor={"green"} onClick={() => calculateOrderAmmounts(todayOrder)} />
      </div>

      <CalculatedOrder calculatedOrder={calculatedOrder} isCalculated={isCalculated} setIsCalculated={setIsCalculated} />
    </div>
  );
}

export default InventoryOnHand;
