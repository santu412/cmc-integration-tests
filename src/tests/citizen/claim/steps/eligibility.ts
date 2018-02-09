import I = CodeceptJS.I

const I: I = actor()

function completeEligibilityPage (optionSelector: string) {
  I.checkOption(optionSelector)
  I.click('input[type=submit]')
}

export class EligibilitySteps {

  complete (): void {
    I.see('Check eligibility')
    I.click('Continue to questions')

    completeEligibilityPage('input[id=claimValueUNDER_10000]')
    completeEligibilityPage('input[id=helpWithFeesno]')
    completeEligibilityPage('input[id=claimantAddressyes]')
    completeEligibilityPage('input[id=defendantAddressyes]')
    completeEligibilityPage('input[id=eighteenOrOveryes]')
    completeEligibilityPage('input[id=validDefendantPERSONAL_CLAIM]')
    completeEligibilityPage('input[id=singleDefendantyes]')
    completeEligibilityPage('input[id=governmentDepartmentno]')
    completeEligibilityPage('input[id=claimIsForTenancyDepositno]')

    I.see('You can use this service')
    I.click('Continue')

  }
}
