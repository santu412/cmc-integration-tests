import { PartyType } from 'data/party-type'

export const DEFAULT_PASSWORD = 'Password12'

export const SMOKE_TEST_USER_NAME = process.env.SMOKE_TEST_USERNAME
export const SMOKE_TEST_PASSWORD = process.env.SMOKE_TEST_PASSWORD

export const claimFee = 25.00

export const claimAmount: Amount = {
  type: 'breakdown',
  rows: [
    { reason: 'Reason', amount: 10.00 },
    { reason: 'Reason', amount: 20.50 },
    { reason: 'Reason', amount: 50.00 }
  ],
  getClaimTotal (): number {
    return this.rows[0].amount + this.rows[1].amount + this.rows[2].amount
  },
  getTotal (): number {
    return this.getClaimTotal() + claimFee
  }
}

export const postCodeLookup = {
  postCode: 'M13 9PL',
  selectedOption: 'University of Manchester, Oxford Road, Manchester, M13 9PL'
}

export const claimReason = 'My reasons for the claim are that I am owed this money for a variety of reason, these being...'

export function createClaimData (claimantType: PartyType, defendantType: PartyType, hasEmailAddress: boolean = true): ClaimData {
  return {
    claimants: [createClaimant(claimantType)],
    defendants: [createDefendant(defendantType, hasEmailAddress)],
    payment: {
      id: '1',
      state: {
        status: 'success',
        finished: true
      },
      amount: claimFee * 100,
      reference: 'CMC1$$$4d308250-d89e-485b-aafb-33a641fd00b3$$$AA00$$$X0024',
      description: 'Money Claim issue fee',
      date_created: '1511175701404'
    },
    feeAmountInPennies: claimFee * 100,
    amount: claimAmount,
    interest: {
      type: 'standard',
      rate: 8
    },
    interestDate: {
      type: 'submission'
    },
    reason: claimReason
  }
}

export function createClaimant (type: PartyType): Party {
  const claimant: Party = {
    type: partyTypeAsString(type),
    name: undefined,
    address: {
      line1: '23 Acacia Road',
      line2: 'some area',
      city: 'London',
      postcode: 'SW1A 1AA'
    },
    correspondenceAddress: {
      line1: '234 Acacia Road',
      line2: 'a really cool place',
      city: 'Edinburgh',
      postcode: 'EDE 1AC'
    },
    mobilePhone: '07700000001'
  }

  switch (type) {
    case PartyType.INDIVIDUAL:
      claimant.name = 'John Smith'
      claimant.dateOfBirth = '1982-07-26'
      break
    case PartyType.SOLE_TRADER:
      claimant.name = 'Mr. Sole trader'
      break
    case PartyType.COMPANY:
      claimant.name = 'Claimant company Inc'
      claimant.contactPerson = 'John Smith'
      break
    case PartyType.ORGANISATION:
      claimant.name = 'United Nations'
      claimant.contactPerson = 'John Smith'
      break
  }

  return claimant
}

export function createDefendant (type: PartyType, hasEmailAddress: boolean = false): Party {
  const defendant: Party = {
    type: partyTypeAsString(type),
    name: undefined,
    address: {
      line1: 'University of Manchester',
      line2: 'Oxford Road',
      city: 'Manchester',
      postcode: 'M13 9PL'
    },
    mobilePhone: '07700000002',
    email: hasEmailAddress ? 'civilmoneyclaims+adefendant@gmail.com' : undefined
  }

  switch (type) {
    case PartyType.INDIVIDUAL:
      defendant.name = 'Rose Smith'
      defendant.dateOfBirth = '1982-07-26'
      break
    case PartyType.SOLE_TRADER:
      defendant.name = 'Sole fish trader'
      break
    case PartyType.COMPANY:
      defendant.name = 'Defendant company Inc'
      defendant.contactPerson = 'Rose Smith'
      break
    case PartyType.ORGANISATION:
      defendant.name = 'OrgBritish Red Cross'
      defendant.contactPerson = 'Rose Smith'
      break
  }

  return defendant
}

function partyTypeAsString (type: PartyType): string {
  switch (type) {
    case PartyType.INDIVIDUAL:
      return 'individual'
    case PartyType.SOLE_TRADER:
      return 'soleTrader'
    case PartyType.ORGANISATION:
      return 'organisation'
    case PartyType.COMPANY:
      return 'company'
  }
}

export function createResponseData (defendantType: PartyType): ResponseData {
  return {
    responseType: 'FULL_DEFENCE',
    defenceType: 'DISPUTE',
    defendant: createDefendant(defendantType, false),
    moreTimeNeeded: 'no',
    freeMediation: 'no',
    defence: 'I fully dispute this claim'
  }
}

export const defence: PartialDefence = {
  paidWhatIBelieveIOwe: {
    howMuchAlreadyPaid: 30.00,
    paidDate: '2016-01-01',
    explanation: 'I dont claimant full amount because'
  },
  claimAmountIsTooMuch: {
    howMuchIBelieveIOwe: 30.00,
    explanation: 'I owe this amount and not full amount because I...'
  },
  timeline: {
    events: [
      {
        date: 'Early Spring',
        description: 'Claimant accuses me of owing...'
      },
      {
        date: 'Mid Spring',
        description: 'I asked the claimant for a reason and evidence why they are doing this.'
      }
    ]
  },
  impactOfDispute: 'This dispute has affected me badly'
}

export const offer: Offer = {
  offerText: 'My Offer is that I can only afford, x, y, z and so will only pay £X amount',
  completionDate: '2020-01-01'
}
