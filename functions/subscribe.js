const fetch = require('node-fetch')
const { isEmail } = require('validator')

const validateBody = (parsedBody) => {
  if (!parsedBody.email) {
    return 'Email is required'
  } else if (!parsedBody.firstName) {
    return 'First Name is required'
  } else if (!isEmail(parsedBody.email)) {
    return 'Email is not valid'
  }

  return null
}

/**
 * @param {object} options
 * @param {string} options.email
 * @param {string} options.firstName
 * @param {string} options.referrer
 * @returns {Promise<Response>}
 */
const addSubscriber = async ({ email, firstName, referrer }) => {
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
      'Content-Length': body.length,
      'User-Agent': 'BenMVP',
    },
    body,
  })
}

/**
 * @param {number} statusCode
 * @param {object} body
 */
const buildResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
})

/**
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 */
const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      throw new Error(`Invalid method: ${event.httpMethod}`)
    }

    const parsedBody = JSON.parse(event.body)
    const validationError = validateBody(parsedBody)

    if (validationError) {
      return buildResponse(422, { success: false, message: validationError })
    }

    const res = await addSubscriber(parsedBody)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(JSON.stringify(data))
    }

    return buildResponse(200, { success: true, ...data })
  } catch (err) {
    console.log(err)

    return buildResponse(500, {
      success: false,
      message: 'Unknown error. Please try again.',
    })
  }
}

module.exports = { handler }
