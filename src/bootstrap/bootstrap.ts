/* tslint:disable:no-console */

import * as fs from 'fs'
import { request } from 'helpers/clients/base/request'
import { RequestResponse } from 'request'
import { IdamClient } from 'helpers/clients/idamClient'

const citizenAppURL = process.env.CITIZEN_APP_URL
const legalAppURL = process.env.LEGAL_APP_URL

class Client {
  static checkHealth (appURL: string): Promise<RequestResponse> {
    return request.get({
      uri: `${appURL}/health`,
      resolveWithFullResponse: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync('localhost.crt')
    }).catch((error) => {
      return error
    })
  }
}
// TS:no-
function logStartupProblem (response) {
  if (response.body) {
    console.log(response.body)
  } else if (response.message) {
    console.log(response.message)
  }
}

function handleError (error) {
  const errorBody = () => {
    return error && error.response ? error.response.body : error
  }
  console.log('Error during bootstrap, exiting', errorBody())
  process.exit(1)
}

function sleepFor (sleepDurationInSeconds: number) {
  console.log(`Sleeping for ${sleepDurationInSeconds} seconds`)
  return new Promise((resolve) => {
    setTimeout(resolve, sleepDurationInSeconds * 1000)
  })
}

async function waitTillHealthy (appURL: string) {
  const maxTries = 36
  const sleepInterval = 10

  console.log(`Verifying health for ${appURL}`)

  let response: RequestResponse
  for (let i = 0; i < maxTries; i++) {
    response = await Client.checkHealth(appURL)
    console.log(`Attempt ${i + 1} - received status code ${response.statusCode} from ${appURL}/health`)

    if (response.statusCode === 200) {
      console.log(`Service ${appURL} became ready after ${sleepInterval * i} seconds`)
      return Promise.resolve()
    } else {
      logStartupProblem(response)
      await sleepFor(sleepInterval)
    }
  }

  const error = new Error(`Failed to successfully contact ${appURL} after ${maxTries} attempts`)
  error.message = '' + response
  return Promise.reject(error)
}

async function createSmokeTestsUserIfDoesntExist (): Promise<any> {
  try {
    return await IdamClient.authorizeUser(process.env.SMOKE_TEST_USERNAME, process.env.SMOKE_TEST_PASSWORD)
  } catch {
    return IdamClient.createUser(
      process.env.SMOKE_TEST_USERNAME,
      'cmc-private-beta',
      process.env.SMOKE_TEST_PASSWORD
    )
  }
}

module.exports = async function (done: () => void) {
  try {
    const healthChecks = []
    if (process.env.HEALTHCHECK_CITIZEN === 'true') {
      healthChecks.push(waitTillHealthy(citizenAppURL))
    }
    if (process.env.HEALTHCHECK_LEGAL === 'true') {
      healthChecks.push(waitTillHealthy(legalAppURL))
    }

    await Promise.all(healthChecks)
    await createSmokeTestsUserIfDoesntExist()
  } catch (error) {
    handleError(error)
  }
  done()
}
