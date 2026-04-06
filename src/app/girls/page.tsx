'use client';

import { useEffect } from "react";

import { useFamilyCountStore } from "@/stores/useFamilyCountStore";

export default function Girls() {
    const count = useFamilyCountStore((state) => state.girls);
    const fetchGirls = useFamilyCountStore((state) => state.fetchGirls);
    const updateGirls = useFamilyCountStore((state) => state.updateGirls);

    useEffect(() => {
        void fetchGirls();
    }, [fetchGirls]);

     return (
        <div>
            <main>
                <h1 className="text-center font-bold">女の数</h1>
                <p className="mt-6 text-center text-5xl font-semibold">{count}</p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white transition hover:bg-blue-700"
                        onClick={() => void updateGirls("increment")}
                    >
                        +
                    </button>
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-800 transition hover:bg-slate-300"
                        onClick={() => void updateGirls("decrement")}
                    >
                        -
                    </button>
                </div>
            </main>
        </div>
    );
}
