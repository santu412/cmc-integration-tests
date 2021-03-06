import { IdamClient } from 'helpers/clients/idamClient'

class IdamHelper extends codecept_helper {

  createCitizenUser (): Promise<string> {
    return this.createRandomUser('cmc-private-beta')
  }

  createSolicitorUser (): Promise<string> {
    return this.createRandomUser('cmc-solicitor')
  }

  private async createRandomUser (userGroupCode: string): Promise<string> {
    const email: string = this.generateRandomEmailAddress()
    await IdamClient.createUser(email, userGroupCode)
    return email
  }

  private generateRandomEmailAddress (): string {
    return `civilmoneyclaims+${require('randomstring').generate(7)}@gmail.com`
  }
}

// Node.js style export is required by CodeceptJS framework
module.exports = IdamHelper
