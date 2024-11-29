import { useEffect, useRef, useState } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";

export const useXTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);
  const [terminal, setTerminal] = useState<XTerminal | null>(null);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 20,
    });
    if (terminalRef.current) {
      term.open(terminalRef.current);
    }

    setTerminal(term);

    // term.write('\x1B[1;3;31mcloud-ide\x1B[0m $ ')
    term.write('~\x1B[1;3;32mcloud-ide\x1B[0m $ ')


    term.onData(data => {
        if (data === "\r") {
          // When the user presses Enter, add a new prompt
          term.write("\r\n~\x1B[1;3;32mcloud-ide\x1B[0m $ ");
        } else if (data === "\u0003") {
          // Handle Ctrl+C
          term.write("^C\r\n~\x1B[1;3;32mcloud-ide\x1B[0m $ ");
        } else {
          // Echo input
          term.write(data);
        }
    })

  }, []);



  return {
    terminalRef,
    terminal,
  };
};
