'use client';

import { useEffect, useState } from "react";
import { AppConfig } from "@/constants/appConfigs";

export default function Mens() {
    type CountResponse = { count: number };

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        fetchCount();
    }, []);

    const fetchCount = async () => {
        const res = await fetch(AppConfig.API_URL_MENS);
        const data = (await res.json()) as CountResponse;
        setCount(data.count);
    };

    const updateCount = async (type: "increment" | "decrement") => {
        const res = await fetch(AppConfig.API_URL_MENS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ type })
        });

        const data = (await res.json()) as CountResponse;
        setCount(data.count);
    };

    return (
        <div>
            <main>
                <h1 className="text-center font-bold">男の数</h1>
                <p className="mt-6 text-center text-5xl font-semibold">{count}</p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white transition hover:bg-blue-700"
                        onClick={() => updateCount("increment")}
                    >
                        +
                    </button>
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-800 transition hover:bg-slate-300"
                        onClick={() => updateCount("decrement")}
                    >
                        -
                    </button>
                </div>
            </main>
        </div>
    );
}
