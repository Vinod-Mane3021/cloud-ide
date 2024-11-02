import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCheck, CircleAlert, Terminal, TriangleAlert } from "lucide-react";

import React from "react";

type MessageType = { 
  message: string, 
  type?: "success" | "warning" | "danger"
}

export const AlertMessage = ({ message, type = "success" }: MessageType) => {

  const variant = (type == "warning" || type == "danger") ? "destructive" : type == "success" ? "success" : "default"

  return (
    <Alert variant={variant} >
      { type == "success" && <CheckCheck className="h-4 w-4" />}
      { type == "warning" && <CircleAlert className="h-4 w-4" />}
      { type == "danger" && <TriangleAlert className="h-4 w-4" />}

      <AlertDescription className="pt-1 ">
        {message}
      </AlertDescription>
    </Alert>
  );
};


