export type CountAction = "increment" | "decrement";

export class Counter {
    private count: number;

    constructor(initialCount = 0) {
        this.count = initialCount;
    }

    getCount() {
        return this.count;
    }

    update(type: CountAction) {
        if (type === "increment") {
            this.count += 1;
        } else if (this.count > 0) {
            this.count -= 1;
        }

        return this.count;
    }
}
