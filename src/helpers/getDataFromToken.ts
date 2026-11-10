import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value

    if (!encodedToken) {
      return null
    }

    const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!)
    
    return typeof decodedToken === "string" ? null : decodedToken.id

  } catch (error: any) {
    return null
  }
}