
export async function decodeEmail(supabase: any) {
    try{
        const {data,error} = await supabase.auth.getUser();
        if(error) console.log(error);

        const email = data.user?.email;
        const emailDetails = extractDetails(email!);

        if (!emailDetails){
            console.error('Invalid email format:', email);
            return null;
        }

        const batch = emailDetails.rollNo % 3 === 0 ? 3 : emailDetails.rollNo % 3;
        return `${emailDetails.year}${emailDetails.course}${batch}`;

    }
    catch(e){
        console.log(e);
    }
}



function extractDetails(email: string) {
    const regex = /(\d{2})([a-z]{3})(\d+)@iiitkottayam\.ac\.in/;
    const match = email.match(regex);
  
    if (match) {
      const year = `20${match[1]}`;
      const course = match[2];
      const rollNo = parseInt(match[3], 10);
      return { year, course, rollNo };
    }
    else {
      console.error('Invalid email format:', email);
      return null;
    }
}