import { Prisma } from "@prisma/client";
import { fail, ok } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

type CreateUserBody = {
  name?: unknown;
  email?: unknown;
};

function normalizeCreateUserBody(body: CreateUserBody) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  return { name, email };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return ok({
    success: true,
    data: users,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateUserBody;
    const { name, email } = normalizeCreateUserBody(body);

    if (!name) {
      return fail("Name is required.", 400);
    }

    if (!email) {
      return fail("Email is required.", 400);
    }

    if (!isValidEmail(email)) {
      return fail("Email format is invalid.", 400);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return ok(
      {
        success: true,
        message: "User created successfully.",
        data: user,
      },
      201,
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return fail("Email already exists.", 409);
    }

    if (error instanceof SyntaxError) {
      return fail("Request body must be valid JSON.", 400);
    }

    console.error("POST /api/users failed", error);
    return fail("Internal server error.", 500);
  }
}
