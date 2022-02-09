import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'
import { isEmail } from 'validator'

interface BodyParams {
  email?: string
  firstName?: string
  referrer?: string
}

const validateBody = (parsedBody: BodyParams): string | undefined => {
  if (!parsedBody.email) {
    return 'Email is required'
  } else if (!parsedBody.firstName) {
    return 'First Name is required'
  } else if (!isEmail(parsedBody.email)) {
    return 'Email is not valid'
  }

  return undefined
}

const addSubscriber = async ({ email, firstName, referrer }: BodyParams) => {
  const body = JSON.stringify({
    email,
    metadata: {
      firstName,
    },
    referrer_url: referrer,
  })

  return fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': `${body.length}`,
      'User-Agent': 'BenMVP',
    },
    body,
  })
}

interface ResponseBody {
  success: boolean
  message?: string
}

const setResponse = (
  response: VercelResponse,
  statusCode: number,
  body: ResponseBody,
) => {
  response.status(statusCode).json(body)
}

const handler = async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== 'POST') {
      throw new Error(`Invalid method: ${request.method}`)
    }

    const parsedBody = request.body as BodyParams
    const validationError = validateBody(parsedBody)

    if (validationError) {
      return setResponse(response, 422, {
        success: false,
        message: validationError,
      })
    }

    const res = await addSubscriber(parsedBody)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(JSON.stringify(data))
    }

    return setResponse(response, 200, { success: true })
  } catch (err) {
    console.log(err)

    return setResponse(response, 500, {
      success: false,
      message: 'Unknown error. Please try again.',
    })
  }
}

export default handler
