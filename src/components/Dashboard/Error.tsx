interface ErrorProps {
    message: string;
  }
  
  const Error = ({ message }: ErrorProps) => (
    <div className="text-red-500 text-center mt-4">
      <p>{message}</p>
    </div>
  );
  
  export default Error;
  