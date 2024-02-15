import Detail  from '../../components/Detail'
import React, {useEffect, useState} from 'react';


export default function DetailPaslon({
  params,
}: {
  params: { no_urut: number };
    }) {
    
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
        setData(result.data.province);
        setLoading(false);
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  if (isLoading) return;
  if (!data) return <p>No data</p>;

    return <div>
        {
            data.map((item, key) => {
                <Detail key={key} data={item} />
            })
        }
    </div>;
}
