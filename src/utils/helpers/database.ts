import mongoose from 'mongoose';


export async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect(process.env.MONGO_URI || '');
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Database connection error');
      }
    }
}


export function modelDb(userDetails: string) {
  if (!userDetails) {
    throw new Error('Invalid model name');
  }
  return mongoose.models[userDetails] || mongoose.model<TimetableDocument>(userDetails, TimetableSchema);
}

export function modelChanges() {
  return mongoose.models["Changes"] || mongoose.model<ChangesDocument>("Changes", ChangeSchema);
}

export function modelAdmin() {
  return mongoose.models["Admin"] || mongoose.model<AdminDocument>("Admin", AdminSchema);
}



export const TimetableSchema = new mongoose.Schema<TimetableDocument>({
    day: { type: String, required: true },
    timetables: [
      {
        timings: { type: String, required: true },
        course_id: { type: String, required: true },
        course_lecturer_name: { type: String, required: true },
      },
    ],
});
  
interface TimetableDocument extends mongoose.Document {
    day: string;
    timetables: {
      timings: string;
      course_id: string;
      course_lecturer_name: string;
    }[];
}
  
interface ChangesDocument extends mongoose.Document {
    date: string;
    timings: string;
    exchange: {
      to: string;
    };
}
  
export const ChangeSchema = new mongoose.Schema<ChangesDocument>({
    date: { type: String, required: true },
    timings: { type: String, required: true },
    exchange: {
      to: { type: String, required: true },
    },
});


export const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

interface AdminDocument extends mongoose.Document {
  email: string;
  password: string;
}