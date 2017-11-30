import { PartyType } from 'data/party-type'
import * as testData from 'data/test-data'
import { CitizenCompletingClaimInfoPage } from 'tests/citizen/claim/pages/citizen-completing-claim-info'
import { CitizenDobPage } from 'tests/citizen/claim/pages/citizen-dob'
import { CitizenEmailPage } from 'tests/citizen/claim/pages/citizen-email'
import { CitizenMobilePage } from 'tests/citizen/claim/pages/citizen-mobile'
import { CitizenResolveDisputePage } from 'tests/citizen/claim/pages/citizen-resolve-dispute'
import { ClaimantCheckAndSendPage } from 'tests/citizen/claim/pages/claimant-check-and-send'
import { ClaimantClaimAmountPage } from 'tests/citizen/claim/pages/claimant-claim-amount'
import { ClaimantClaimConfirmedPage } from 'tests/citizen/claim/pages/claimant-claim-confirmed'
import { ClaimantFeesToPayPage } from 'tests/citizen/claim/pages/claimant-fees-to-pay'
import { ClaimantReasonPage } from 'tests/citizen/claim/pages/claimant-reason'
import { CompanyDetailsPage } from 'tests/citizen/claim/pages/company-details'
import { IndividualDetailsPage } from 'tests/citizen/claim/pages/individual-details'
import { OrganisationDetailsPage } from 'tests/citizen/claim/pages/organisation-details'
import { PartyTypePage } from 'tests/citizen/claim/pages/party-type'
import { EligibilitySteps } from 'tests/citizen/claim/steps/eligibility'
import { InterestSteps } from 'tests/citizen/claim/steps/interest'
import { PaymentSteps } from 'tests/citizen/claim/steps/payment'
import { UserSteps } from 'tests/citizen/home/steps/user'
import I = CodeceptJS.I

const claimant = testData.claimant('civilmoneyclaims+notused@gmail.com')
const defendant = testData.defendant('civilmoneyclaims+adefendant@gmail.com')

const I: I = actor()
const citizenResolveDisputePage: CitizenResolveDisputePage = new CitizenResolveDisputePage()
const citizenCompletingClaimInfoPage: CitizenCompletingClaimInfoPage = new CitizenCompletingClaimInfoPage()
const partyTypePage: PartyTypePage = new PartyTypePage()
const companyDetailsPage: CompanyDetailsPage = new CompanyDetailsPage()
const individualDetailsPage: IndividualDetailsPage = new IndividualDetailsPage()
const organisationDetailsPage: OrganisationDetailsPage = new OrganisationDetailsPage()
const citizenDOBPage: CitizenDobPage = new CitizenDobPage()
const citizenMobilePage: CitizenMobilePage = new CitizenMobilePage()
const citizenEmailPage: CitizenEmailPage = new CitizenEmailPage()
const claimantClaimAmountPage: ClaimantClaimAmountPage = new ClaimantClaimAmountPage()
const claimantFeesToPayPage: ClaimantFeesToPayPage = new ClaimantFeesToPayPage()
const claimantReasonPage: ClaimantReasonPage = new ClaimantReasonPage()
const claimantCheckAndSendPage: ClaimantCheckAndSendPage = new ClaimantCheckAndSendPage()
const claimantClaimConfirmedPage: ClaimantClaimConfirmedPage = new ClaimantClaimConfirmedPage()
const userSteps: UserSteps = new UserSteps()
const interestSteps: InterestSteps = new InterestSteps()
const paymentSteps: PaymentSteps = new PaymentSteps()
const eligibilitySteps: EligibilitySteps = new EligibilitySteps()

export class ClaimSteps {

  reloadPage (): void {
    I.executeScript(() => {
      document.location.reload(true)
    })
  }

  enterTestDataClaimAmount (): void {
    claimantClaimAmountPage.enterAmount(claimant.claimAmount.amount1, claimant.claimAmount.amount2, claimant.claimAmount.amount3)
    claimantClaimAmountPage.calculateTotal()
  }

  resolveDispute (): void {
    citizenResolveDisputePage.confirmRead()
  }

  readCompletingYourClaim (): void {
    citizenCompletingClaimInfoPage.confirmRead()
  }

  enterMyDetails (claimantType: PartyType): void {
    switch (claimantType) {
      case PartyType.INDIVIDUAL:
        partyTypePage.selectIndividual()
        individualDetailsPage.enterName(claimant.name)
        individualDetailsPage.enterAddresses(claimant.address, claimant.correspondenceAddress)
        individualDetailsPage.submit()
        citizenDOBPage.enterDOB(claimant.dateOfBirth)
        break
      case PartyType.SOLE_TRADER:
        partyTypePage.selectSoleTrader()
        individualDetailsPage.enterName(claimant.soleTraderName)
        individualDetailsPage.enterAddresses(claimant.address, claimant.correspondenceAddress)
        individualDetailsPage.submit()
        break
      case PartyType.COMPANY:
        partyTypePage.selectCompany()
        companyDetailsPage.enterCompanyName(claimant.companyName)
        companyDetailsPage.enterContactPerson(claimant.name)
        companyDetailsPage.enterAddresses(claimant.address, claimant.correspondenceAddress)
        companyDetailsPage.submit()
        break
      case PartyType.ORGANISATION:
        partyTypePage.selectOrganisationl()
        organisationDetailsPage.enterOrganisationName(claimant.organisationName)
        organisationDetailsPage.enterContactPerson(claimant.name)
        organisationDetailsPage.enterAddresses(claimant.address, claimant.correspondenceAddress)
        organisationDetailsPage.submit()
        break
      default:
        throw new Error('non-matching claimant type for claim')
    }
    citizenMobilePage.enterMobile(claimant.mobileNumber)
  }

  enterTheirDetails (defendantType: PartyType, enterDefendantEmail: boolean = true): void {
    switch (defendantType) {
      case PartyType.INDIVIDUAL:
        partyTypePage.selectIndividual()
        individualDetailsPage.enterName(defendant.name)
        individualDetailsPage.enterAddress(defendant.address)
        individualDetailsPage.submit()
        break
      case PartyType.SOLE_TRADER:
        partyTypePage.selectSoleTrader()
        individualDetailsPage.enterName(defendant.soleTraderName)
        individualDetailsPage.enterAddress(defendant.address)
        individualDetailsPage.submit()
        break
      case PartyType.COMPANY:
        partyTypePage.selectCompany()
        companyDetailsPage.enterCompanyName(defendant.companyName)
        companyDetailsPage.enterAddress(defendant.address)
        companyDetailsPage.submit()
        break
      case PartyType.ORGANISATION:
        partyTypePage.selectOrganisationl()
        organisationDetailsPage.enterOrganisationName(defendant.organisationName)
        organisationDetailsPage.enterAddress(defendant.address)
        organisationDetailsPage.submit()
        break
      default:
        throw new Error('non-matching defendant Type type for claim')
    }
    if (enterDefendantEmail) {
      citizenEmailPage.enterEmail(defendant.email)
    } else {
      citizenEmailPage.submitForm()
    }
  }

  enterClaimAmount (amount1: number, amount2: number, amount3): void {
    claimantClaimAmountPage.enterAmount(amount1, amount2, amount3)
    claimantClaimAmountPage.calculateTotal()
  }

  claimantTotalAmountPageRead (): void {
    claimantClaimAmountPage.continue()
  }

  readFeesPage (): void {
    claimantFeesToPayPage.continue()
  }

  enterClaimReason (): void {
    claimantReasonPage.enterReason(claimant.claimReason)
  }

  checkClaimFactsAreTrueAndSubmit (claimantType: PartyType, defendantType: PartyType, enterDefendantEmail: boolean = true): void {
    claimantCheckAndSendPage.verifyCheckAndSendAnswers(claimant, claimantType, defendant, defendantType, enterDefendantEmail)

    if (claimantType === PartyType.COMPANY || claimantType === PartyType.ORGANISATION) {
      claimantCheckAndSendPage.signStatementOfTruthAndSubmit('Jonny', 'Director')
    } else {
      claimantCheckAndSendPage.checkFactsTrueAndSubmit()
    }
  }

  makeAClaimAndSubmitStatementOfTruth (email: string, claimantType: PartyType, defendantType: PartyType, enterDefendantEmail: boolean = true) {
    userSteps.login(email)
    userSteps.startClaim()
    this.completeEligibility()
    userSteps.selectResolvingThisDispute()
    this.resolveDispute()
    userSteps.selectCompletingYourClaim()
    this.readCompletingYourClaim()
    userSteps.selectYourDetails()
    this.enterMyDetails(claimantType)
    userSteps.selectTheirDetails()
    this.enterTheirDetails(defendantType, enterDefendantEmail)
    userSteps.selectClaimAmount()
    this.enterTestDataClaimAmount()
    this.claimantTotalAmountPageRead()
    interestSteps.enterDefaultInterest()
    this.readFeesPage()
    I.see('Total amount you’re claiming')
    I.see(claimant.claimAmount.getClaimTotal().toFixed(2), 'table.table-form > tbody > tr:nth-of-type(1) >td.numeric.last > span')
    I.see(claimant.claimAmount.getTotal().toFixed(2), 'table.table-form > tfoot > tr > td.numeric.last > span')
    interestSteps.skipClaimantInterestTotalPage()
    userSteps.selectClaimDetails()
    this.enterClaimReason()
    userSteps.selectCheckAndSubmitYourClaim()
    this.checkClaimFactsAreTrueAndSubmit(claimantType, defendantType, enterDefendantEmail)
  }

  makeAClaimAndSubmit (email: string, claimantType: PartyType, defendantType: PartyType, enterDefendantEmail: boolean = true): string {
    this.makeAClaimAndSubmitStatementOfTruth(email, claimantType, defendantType, enterDefendantEmail)
    paymentSteps.payWithWorkingCard()
    this.reloadPage() // reload gets over the ESOCKETTIMEDOUT Error
    this.reloadPage() // reload gets over the 409 Duplicate Key value violates unique constraint Error
    I.waitForText('Claim submitted')
    return claimantClaimConfirmedPage.getClaimReference()
  }

  completeEligibility (): void {
    eligibilitySteps.complete()
  }

}
