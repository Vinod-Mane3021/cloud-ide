// import * as os from "node:os";
// import * as pty from "node-pty";
import { withApiHandler, withAuthorizedHandler } from "@/lib/api-handler";
import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { ApiResponse } from "@/lib/api-response";
import { getToken } from "next-auth/jwt"
import jwt, { JwtPayload } from "jsonwebtoken"


let ptyProcess;

// const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

export const GET = withApiHandler(async (req: Request) => {

    const secret = process.env.AUTH_SECRET

    const token = await getToken({ req, secret })

    // const is_verify = jwt.verify(token, secret!)

    // const jsonData = req.json();

    // ptyProcess = pty.spawn(shell, [], {
    //     name: "xterm-color",
    //     cols: 80,
    //     rows: 30,
    //     cwd: process.env.HOME,
    //     env: process.env,
    //   });

    return new ApiResponse({
        success: true,
        message: `User  processed successfully`,
        status: HttpStatus.SUCCESS,
        statusCode: HttpStatusCode.OK,
        data: token
    });
})