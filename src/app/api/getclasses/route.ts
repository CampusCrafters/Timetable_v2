import { NextResponse,NextRequest } from "next/server";

import { connectToDatabase,modelChanges,modelDb } from "@/utils/helpers/database";
import { createClient } from "@/utils/supabase/server";
import { getCurrentDay } from "@/utils/helpers/today";
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
    const Changes = modelChanges();

    const day = getCurrentDay();
    const date = new Date().toISOString().split('T')[0]; 

    const data = await Timetable.findOne({ day });

    const year = userDetails.slice(0, 4);
    const batch = userDetails.slice(4, 8);

    const changes = await Changes.find({ date,year,batch });

    if (!data) {
      return NextResponse.json({ error: 'No timetable found for today' }, { status: 404 });
    }

    if (changes) {
      changes.forEach((change:any) => {
        data.timetables.forEach((timetable: any) => {
          if (change.timings === timetable.timings) {
            timetable.course_id = change.exchange.to;
            timetable.course_lecturer_name = change.exchange.lecturer_name;
          }
        });
      });
    }

    return NextResponse.json({ timetables: data.timetables, userDetails });

}