import { NextResponse,NextRequest } from "next/server";

import { connectToDatabase,modelChanges,modelDb } from "@/utils/helpers/database";


export async function POST(request: NextRequest){

    await connectToDatabase();

    const {userDetails} = await request.json();

    if(!userDetails) {
        return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    const Timetable = modelDb(userDetails);

    const data = await Timetable.find();

    return NextResponse.json({ timetables: data });

}