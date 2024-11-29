'use client'

import { useEffect, useRef } from "react";
import '@xterm/xterm/css/xterm.css'
import { useXTerminal } from "../hook/use-xterminal";

export const Terminal = () => {

  const { terminalRef } = useXTerminal()
  
  return <div ref={terminalRef}  />;
};

