export async function GET() {
  try {
    return Response.json(
      {
        success: true,
        message: "Working fine.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: `Something went wrong! : ${error.message}`,
      },
      { status: 500 }
    );
  }
}



