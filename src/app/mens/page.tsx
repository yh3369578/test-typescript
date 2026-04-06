'use client';

import { useEffect } from "react";

import { useFamilyCountStore } from "@/stores/useFamilyCountStore";

export default function Mens() {
    const count = useFamilyCountStore((state) => state.mens);
    const fetchMens = useFamilyCountStore((state) => state.fetchMens);
    const updateMens = useFamilyCountStore((state) => state.updateMens);

    useEffect(() => {
        void fetchMens();
    }, [fetchMens]);

    return (
        <div>
            <main>
                <h1 className="text-center font-bold">男の数</h1>
                <p className="mt-6 text-center text-5xl font-semibold">{count}</p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white transition hover:bg-blue-700"
                        onClick={() => void updateMens("increment")}
                    >
                        +
                    </button>
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-800 transition hover:bg-slate-300"
                        onClick={() => void updateMens("decrement")}
                    >
                        -
                    </button>
                </div>
            </main>
        </div>
    );
}
