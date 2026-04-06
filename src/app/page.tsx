'use client';

import { useEffect } from "react";

import { useFamilyCountStore } from "@/stores/useFamilyCountStore";

export default function Home() {
    const mens = useFamilyCountStore((state) => state.mens);
    const girls = useFamilyCountStore((state) => state.girls);
    const fetchCounts = useFamilyCountStore((state) => state.fetchCounts);

    useEffect(() => {
        void fetchCounts();

        const intervalId = setInterval(() => {
            void fetchCounts();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [fetchCounts]);
    
    return (
        <div>
            <main>
                <h1 className="text-center font-bold">家族</h1>
                <section>
                    <h2 className="text-center mt-4 font-semibold">構成</h2>
                    <div className="mt-4 flex justify-center gap-4">
                        <p>男：{mens}</p>
                        <p>女：{girls}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
