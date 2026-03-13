import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { fail, ok } from "@/lib/api-response"

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { id, stock } = body

    if (!id || stock === undefined) {
      return fail("Missing required fields: id and stock")
    }

    const food = await prisma.food.findUnique({ where: { id: parseInt(id) } })

    if (!food) {
      return fail("Food not found", 404)
    }

    const updated = await prisma.food.update({
      where: { id: parseInt(id) },
      data: { stock: parseInt(stock) },
    })

    return ok({
      success: true,
      data: updated,
      message: stock < food.stock
        ? `Stock decreased from ${food.stock} to ${stock}`
        : stock > food.stock
          ? `Stock increased from ${food.stock} to ${stock}`
          : "Stock unchanged",
    })
  } catch (e) {
    console.error(e)
    return fail("Failed to update stock")
  }
}
