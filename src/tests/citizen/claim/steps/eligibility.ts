let I

function completeEligibilityPage (optionSelector: string) {
  I.checkOption(optionSelector)
  I.click('input[type=submit]')
}

module.exports = {

  _init () {
    I = actor()
  },

  complete () {
    I.see('Check eligibility')
    I.click('Continue to questions')

    completeEligibilityPage('input[id=claimValueUNDER_10000]')
    completeEligibilityPage('input[id=eighteenOrOveryes]')
    completeEligibilityPage('input[id=helpWithFeesno]')
    completeEligibilityPage('input[id=claimantAddressyes]')
    completeEligibilityPage('input[id=defendantAddressyes]')
    completeEligibilityPage('input[id=governmentDepartmentno]')

    I.see('You can use this service')
    I.click('Continue')

  }
}