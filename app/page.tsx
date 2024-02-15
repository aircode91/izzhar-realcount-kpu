"use client";

import { useEffect, useState } from "react";
import CardProfile from "./components/CardProfile";


export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://sirekap-kpu.heirro.dev/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLoading(false);
        console.log(result.data)
      }
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
    // .then((res) => res.json())
    // .then((data) => {
    //   setData(data)
    //   setLoading(false)
    // })
  }, []);

  if (isLoading) return 
  if (!data) return <p>No profile data</p>

  const listPaslon = [];
  for (let i = 1; i <= Object.keys(data.paslon).length; i++) {
    listPaslon.push({ no_urut: i , ...data.paslon[i] });
  }

  console.log(listPaslon);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="font-bold text-2xl text-center">Hasil Rekapitulasi Real Count KPU</div>
      <div className="font-bold text-xl">{ data.timestamp }</div>
      <div className="w-full items-center justify-between font-mono text-sm lg:flex gap-x-3 gap-y-2">
        {
          listPaslon?.map((item, key): any => {
            console.log(key)
            return (
                <CardProfile key={key} data={item}/>
            )
          })
        }
      </div>
    </main>
  );
}
