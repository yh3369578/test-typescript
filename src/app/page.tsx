'use client';

import { useEffect, useState } from "react";
import { AppConfig } from "@/constants/appConfigs";

export default function Home() {
    type CountResponse = { count: number };

    const [counts, setCounts] = useState({ mens: 0, girls: 0 });

    useEffect(() => {
        fetchCount();

        const intervalId = setInterval(() => {
            fetchCount();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const fetchCount = async () => {
        const resMens = await fetch(AppConfig.API_URL_MENS);
        const dataMens = (await resMens.json()) as CountResponse;

        const resGirls = await fetch(AppConfig.API_URL_GIRLS);
        const dataGirls = (await resGirls.json()) as CountResponse;
        
        setCounts({
            mens: dataMens.count,
            girls: dataGirls.count,
        });
    };
    
    return (
        <div>
            <main>
                <h1 className="text-center font-bold">家族</h1>
                <section>
                    <h2 className="text-center mt-4 font-semibold">構成</h2>
                    <div className="mt-4 flex justify-center gap-4">
                        <p>男：{counts.mens}</p>
                        <p>女：{counts.girls}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
