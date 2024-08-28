import React from "react";
import { Toast } from "@/components/ui/toast";
import { ToastProps } from "@/components/ui/toast";

interface CustomToastProps {
  command: string;
  output: string;
}

export const CustomToast: React.FC<
  CustomToastProps & Omit<ToastProps, "title" | "description">
> = ({ command, output, ...props }) => {
  return (
    <Toast {...props}>
      <div className="font-mono text-sm">
        <div className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <span>{command}</span>
          <span className="ml-1 w-2 h-4 bg-white inline-block animate-blink"></span>
        </div>
        <pre className="mt-2 p-2 bg-gray-800 rounded">
          <code>{output}</code>
        </pre>
      </div>
    </Toast>
  );
};
