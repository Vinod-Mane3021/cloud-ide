import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordFeature?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "password", showPasswordFeature = true, ...props },
    ref
  ) => {
    const [inputType, setInputType] = React.useState(type);
    const [onFocus, setOnFocus] = React.useState(false);

    return (
      <div
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          onFocus && "outline outline-[1.3px]"
        )}
      >
        <input
          type={inputType}
          className={cn("flex-1 text-sm outline-none pr-2", className)}
          ref={ref}
          {...props}
          onFocus={(e) => {
            e.preventDefault();
            setOnFocus(true);
          }}
          onBlur={(e) => {
            e.preventDefault();
            setOnFocus(false);
          }}
        />
        {showPasswordFeature && (
          <div className="cursor-pointer flex items-center">
            {inputType == "password" && (
              <Eye
                onClick={() => setInputType("text")}
                className="size-4 text-muted-foreground hover:text-black duration-300"
              />
            )}
            {inputType != "password" && (
              <EyeOff
                onClick={() => setInputType("password")}
                className="size-4 text-muted-foreground hover:text-black duration-300"
              />
            )}
          </div>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
