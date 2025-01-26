import { NextRequest, NextResponse } from "next/server";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase, modelDb } from "@/utils/helpers/database";
import { error } from "console";

export async function POST(request: NextRequest){
    try {

        await connectToDatabase();
        const formData = await request.formData();

        if(!formData.get('details')){
            return NextResponse.json({error: 'Error parsing batch details.'})
        }

        if(!formData.get('image')){
            return NextResponse.json({error: 'Provide the timetable image for reference.'})
        }

        const details = formData.get('details')?.toString();

        const image = formData.get('image');
        if (!image || !(image instanceof File)) {
            throw new Error('Invalid image. Please provide a valid image file.');
        }
          
        const imageResp = await new Response(image).arrayBuffer();


        const Timetable = await modelDb(details!);
        const GenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


        const model = await GenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp', generationConfig: {responseMimeType: "application/json",}});
        const result = await model.generateContent([
            `You are a production-level png extractor tool. You will be given a png with a set of timetables. You have to extract the timetables into a file. 
                Be careful with all the details please double check the details timings of classes is very important dont change it. Convert the timings to 24 hour format . For Sundays just enter Break for entire day . If there is a gap in the timetables, specify it as lunch breaks or just breaks. Labs are for 2 consecutive hours take that into account. Also, make the file easy to interpret and clean.

                OUTPUT Schema:
                {
                    day: <day>,
                timetables: [
                {
                    timings: <>,
                    course_id: <>,
                    course_lecturer_name: <>,
                },
                ]
            }
            Check for timings inside the Boxes too.Use coursename(eg:Data Structures and Algorithms) instead of course_id(eg:ICS 215) which is given in the table and Make it as "-" when no course found), course_lecturer_name (if there isn't a course lecturer, specify "null" as a string. Use full names for days.
            Make it as a JSON array of this format. Strictly don't add and \\ "json" at the start and end of the file. Just the data this is important.,
            If you have time intervals in between classes, fill them as breaks`,
            {
                inlineData: {
                    data: Buffer.from(imageResp).toString("base64"),
                    mimeType: 'image/png'
                }
            }
        ]);

        const parsedOutput = JSON.parse(result.response.text())
        console.log(parsedOutput)

        await Timetable.deleteMany({}); 
        await Timetable.insertMany(parsedOutput);

        return NextResponse.json(parsedOutput);

    } catch(e){
        console.log(e);
        return NextResponse.json({error: e})
    }

}

 