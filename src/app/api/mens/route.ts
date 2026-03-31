import { CountAction, Counter } from "@/utils/counter";

const mensCounter = new Counter();

export async function GET() {
    return Response.json({ count: mensCounter.getCount() });
}

export async function POST(req: Request) {
    type CountRequest = { type: CountAction };

    const { type } = (await req.json()) as CountRequest;
    const count = mensCounter.update(type);

    return Response.json({ count });
}
