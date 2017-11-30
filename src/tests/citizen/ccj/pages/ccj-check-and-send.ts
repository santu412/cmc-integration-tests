import I = CodeceptJS.I
import { PartyType } from 'data/party-type'
import { claimant } from 'data/test-data'

const I: I = actor()

const fields = {
  checkboxFactsTrue: 'input#signedtrue',
  signerName: 'input[id=signerName]',
  signerRole: 'input[id=signerRole]'
}

const buttons = {
  submit: 'input[type=submit]'
}

export class CountyCourtJudgementCheckAndSendPage {

  signStatementOfTruthAndSubmit (signerName: string, signerRole: string): void {
    I.fillField(fields.signerName, signerName)
    I.fillField(fields.signerRole, signerRole)
    this.checkFactsTrueAndSubmit()
  }

  checkFactsTrueAndSubmit (): void {
    I.checkOption(fields.checkboxFactsTrue)
    I.click(buttons.submit)
  }

  checkDefendantName (defendant, defendantType: PartyType): void {
    switch (defendantType) {
      case PartyType.INDIVIDUAL:
        I.see(defendant.name)
        break
      case PartyType.SOLE_TRADER:
        I.see(defendant.soleTraderName)
        break
      case PartyType.COMPANY:
        I.see(defendant.companyName)
        break
      case PartyType.ORGANISATION:
        I.see(defendant.organisationName)
        break
      default:
        throw new Error('non-matching defendant type in check-and-send')
    }
  }

  verifyCheckAndSendAnswers (defendant, defendantType: PartyType, defendantPaidAmount: number, address): void {
    I.see('Check your answers')
    this.checkDefendantName(defendant, defendantType)
    I.see(address.line1)
    I.see(address.line2)
    I.see(address.city)
    I.see(address.postcode)
    I.see('Amount to be paid by defendant')
    const amountOutstanding: number = claimant().claimAmount.getTotal() - defendantPaidAmount
    I.see('£' + amountOutstanding.toFixed(2))
  }
}
