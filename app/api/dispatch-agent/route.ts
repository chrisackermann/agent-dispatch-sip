import { AgentDispatchClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const name = searchParams.get("name") || 'customer'
    const phoneNumber = searchParams.get("phone") || ''

    console.log(`Connecting agent for: ${name} with phone: ${phoneNumber}`)

    const roomName = `room_${Math.random().toString(36).substring(2, 15)}`;
    const agentName = 'outbound-caller';

    if (!process.env.LIVEKIT_URL || !process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
        throw new Error('Missing required LiveKit environment variables');
    }

    const agentDispatchClient = new AgentDispatchClient(
        process.env.LIVEKIT_URL,
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET
    );

    // create a dispatch request for an agent named "test-agent" to join "my-room"
    const dispatch = await agentDispatchClient.createDispatch(roomName, agentName, {
      metadata: JSON.stringify({ name, phoneNumber }),
    });
    console.log('created dispatch', dispatch);
  
    const dispatches = await agentDispatchClient.listDispatch(roomName);
    console.log(`there are ${dispatches.length} dispatches in ${roomName}`);

    return NextResponse.json(dispatches)
}