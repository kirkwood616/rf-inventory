import { useEffect, useState } from "react";
import { DayNumbers, InventoryData, InventoryItemOrder } from "../models/Inventory";
import { formatAppendedClassName, formatFirstLettersToUpperCase } from "../utils/Formatting";
import { updateOrder } from "../utils/OrderState";
import Button from "./Button";
import GeneratedOrder from "./GeneratedOrder";
import "./InventoryOnHand.css";

function InventoryOnHand() {
  // STATE
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([]);
  const [onHand, setOnHand] = useState<InventoryItemOrder[]>([]);
  const [calculatedOrder, setCalculatedOrder] = useState<InventoryItemOrder[] | undefined>();
  const [isCalculated, setIsCalculated] = useState(false);

  // DATE
  const date = new Date();
  const day = date.getDay() as DayNumbers;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001/rf-inventory-backend/us-central1/api/bread/products");
        const json = await res.json();
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then((data) => {
      setInventoryData(data);
      setOnHand(newOnHandState(data));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FUNCTIONS
  function sortDataById(data: InventoryData[]) {
    return data.sort((a, b) => a.sort_id - b.sort_id);
  }

  function newOnHandState(data: InventoryData[]): InventoryItemOrder[] {
    const sortedData = sortDataById(data);
    let newOrderState: InventoryItemOrder[] = sortedData.map((item) => {
      return {
        sort_id: item.sort_id,
        houseName: item.houseName,
        orderName: item.orderName,
        quantity: 0,
      };
    });
    return newOrderState;
  }

  function calculateOrderAmmounts() {
    const inventoryNeeded: InventoryItemOrder[] = onHand.map((item, index) => {
      const inventoryDataItem = inventoryData.find((dataItem) => dataItem.houseName === item.houseName);
      if (!inventoryDataItem) return item;
      if (item.quantity < inventoryDataItem.inventoryOrderByDay[day]) {
        return { ...item, quantity: inventoryDataItem.inventoryOrderByDay[day] - onHand[index].quantity };
      } else {
        return { ...item, quantity: 0 };
      }
    });

    setCalculatedOrder(inventoryNeeded);
    setIsCalculated((current) => !current);
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
                onChange={(e) => setOnHand(updateOrder(onHand, item.houseName, e))}
                id={`onHandValue${formatAppendedClassName(item.houseName)}`}
              />
            </div>
          </div>
        ))}
        <Button text={"CALCULATE ORDER"} backgroundColor={"green"} onClick={calculateOrderAmmounts} />
      </div>

      <GeneratedOrder calculatedOrder={calculatedOrder} isCalculated={isCalculated} setIsCalculated={setIsCalculated} />
    </div>
  );
}

export default InventoryOnHand;
