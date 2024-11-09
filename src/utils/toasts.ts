import toast from "react-hot-toast";

export function success(msg: string) {
  toast.success(msg, {
  style: {
    background: '#2E7D32', // Darker green background
    color: '#E0E0E0',      // Light text color
    borderRadius: '8px',   // Rounded corners
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Darker shadow
    padding: '16px',       // Padding for a clean look
  },
  iconTheme: {
    primary: '#E0E0E0',    // Light icon color
    secondary: '#2E7D32',  // Darker background of the icon
  },
  });
}

export function fail(msg: string) {
  toast.error(msg, {
  style: {
    background: '#D32F2F', // Darker red background
    color: '#E0E0E0',      // Light text color
    borderRadius: '8px',   // Rounded corners
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Darker shadow
    padding: '16px',       // Padding for a clean look
  },
  iconTheme: {
    primary: '#E0E0E0',    // Light icon color
    secondary: '#D32F2F',  // Darker background of the icon
  },
  });
}