import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalePage = (props) => {
  const [sales, setSales] = useState(props.sales);

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

  if (!data && !sales) {
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

export async function getStaticProps() {
  const response = await fetch(
    "https://dummy-f3781-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}

export default LastSalePage;
