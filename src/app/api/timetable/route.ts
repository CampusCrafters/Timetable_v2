import { NextResponse,NextRequest } from "next/server";

import { connectToDatabase,modelChanges,modelDb } from "@/utils/helpers/database";
import { createClient } from "@/utils/supabase/server";
import { decodeEmail } from "@/utils/helpers/email";
import { cookies } from "next/headers";




export async function POST(request: NextRequest){

    const cookiestore = await cookies();
    const supabase = await createClient(cookiestore);

    await connectToDatabase();

    const userDetails = await decodeEmail(supabase);

    if(!userDetails) {
        return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    const Timetable = modelDb(userDetails);

    const data = await Timetable.find();

    return NextResponse.json({ timetables: data });

}