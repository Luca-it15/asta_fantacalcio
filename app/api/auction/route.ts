let auction: any = null;
let bids: any[] = [];

export async function GET() {
  return Response.json({ auction, bids });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type === "start") {
    auction = { player: body.player, user: body.user };
    bids = [];
  }

  if (body.type === "bid") {
    bids.push({ user: body.user, amount: body.amount });
  }

  if (body.type === "end") {
    auction = null;
    bids = [];
  }

  return Response.json({ auction, bids });
}
