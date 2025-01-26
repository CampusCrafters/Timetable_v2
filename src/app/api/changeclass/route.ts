import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase, modelChanges } from "@/utils/helpers/database";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookiestore = await cookies();
    const supabase = await createClient(cookiestore);

    await connectToDatabase();

    const Changes = modelChanges();

    const requestData = await request.formData();

    const date = requestData.get('date');
    const year = requestData.get('year');
    const batch = requestData.get('batch');
    const timings = requestData.get('timings');
    const to = requestData.get('to');
    const lecturer_name = requestData.get('lecturer_name');

    if (!date || !year || !batch || !timings || !to || !lecturer_name) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
      return NextResponse.json({ message: 'Authentication error.' }, { status: 500 });
    }

    const email = data.user?.email;
    if (email?.match(/(\d{2})([a-z]{3})(\d+)@iiitkottayam\.ac\.in/) && email !== 'vijay23bcs7@iiitkottayam.ac.in') {
      return NextResponse.json({ message: 'This action is forbidden for students!' }, { status: 400 });
    }

    const body = {
      date,
      year,
      batch,
      timings,
      exchange: {
        to,
        lecturer_name
      },
      email
    };
    await Changes.create(body);

    return NextResponse.json({ message: 'Change request submitted successfully!' }, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
