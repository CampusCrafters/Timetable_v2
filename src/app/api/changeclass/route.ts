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
        if (!requestData) {
            return NextResponse.json({ message: 'No data provided.' }, { status: 400 });
        }

        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.log(error);
            return NextResponse.json({ message: 'Authentication error.' }, { status: 500 });
        }

        const email = data.user?.email;
        if (email?.match(/(\d{2})([a-z]{3})(\d+)@iiitkottayam\.ac\.in/)) {
            return NextResponse.json({ message: 'This action is forbidden for students!' }, { status: 400 });
        }
        
        const body = {
            date: requestData.get('date'),
            year: requestData.get('year'),
            batch: requestData.get('batch'),
            timings: requestData.get('timings'),
            exchange: {
                to: requestData.get('to'),
                lecturer_name: requestData.get('lecturer_name')
            },
            email: email
        };

        await Changes.create(body);
        return NextResponse.json({ message: 'Change request submitted successfully!' }, { status: 200 });
    } 
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}
