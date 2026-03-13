import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { fail, ok } from "@/lib/api-response"

export const GET = async (req: NextRequest) => {
  try {
    const res = await prisma.food.findMany()
    return ok(res)
  } catch (e) {
    console.error(e)
    return fail("Failed to fetch menu")
  }
}
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    if (!Array.isArray(body) || body.length === 0) {
      return fail("Request body must be a non-empty JSON array")
    }

    const data = body.map((item: any, i: number) => {
      if (!item.name) {
        throw new Error(`Missing name at index ${i}`)
      }

      const originalPrice = Number(item.originalPrice)
      const rescuePrice = Number(item.rescuePrice)
      const stock = Number(item.stock)

      if (isNaN(originalPrice) || isNaN(rescuePrice) || isNaN(stock)) {
        throw new Error(`Invalid number at index ${i}`)
      }

      const expiredAt = new Date(item.expiredAt)
      const availableFrom = new Date(item.availableFrom)
      const availableUntil = new Date(item.availableUntil)

      if (
        isNaN(expiredAt.getTime()) ||
        isNaN(availableFrom.getTime()) ||
        isNaN(availableUntil.getTime())
      ) {
        throw new Error(`Invalid date at index ${i}`)
      }

      return {
        name: item.name,
        description: item.description ?? "",
        originalPrice,
        rescuePrice,
        stock,
        expiredAt,
        availableFrom,
        availableUntil,
      }
    })

    const result = await prisma.food.createMany({
      data,
      skipDuplicates: true
    })

    return ok({ count: result.count }, 201)

  } catch (e: any) {
    console.error(e)
    return fail(e.message || "Failed to create menu items")
  }
}