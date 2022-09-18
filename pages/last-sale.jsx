import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalePage = () => {
  const [sales, setSales] = useState();

  const { data, error } = useSWR(
    "https://dummy-f3781-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedSales = [];
    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    setSales(transformedSales);
  }, [data]);

  if (error) {
    return <p>Fail to Load</p>;
  }

  if (!data || !sales) {
    return <p>Loading.....</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalePage;
