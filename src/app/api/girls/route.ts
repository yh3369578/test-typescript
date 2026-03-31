import { CountAction, Counter } from "@/utils/counter";

const girlsCounter = new Counter();

export async function GET() {
    return Response.json({ count: girlsCounter.getCount() });
}

export async function POST(req: Request) {
    type CountRequest = { type: CountAction };

    const { type } = (await req.json()) as CountRequest;
    const count = girlsCounter.update(type);

    return Response.json({ count });
}
