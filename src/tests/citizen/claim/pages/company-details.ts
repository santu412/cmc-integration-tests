import I = CodeceptJS.I

const I: I = actor()

const fields = {
  name: 'input[id=name]',
  contactPerson: 'input[id=contactPerson]',
  address: {
    line1: 'input[id="address[line1]"]',
    line2: 'input[id="address[line2]"]',
    city: 'input[id="address[city]"]',
    postcode: 'input[id="address[postcode]"]'
  },
  hasCorrespondenceAddress: 'input[id=hasCorrespondenceAddresstrue]',
  correspondenceAddress: {
    line1: 'input[id="correspondenceAddress[line1]"]',
    line2: 'input[id="correspondenceAddress[line2]"]',
    city: 'input[id="correspondenceAddress[city]"]',
    postcode: 'input[id="correspondenceAddress[postcode]"]'
  }
}

const buttons = {
  submit: 'input[type=submit]'
}

export class CompanyDetailsPage {

  open (type: string): void {
    I.amOnCitizenAppPage(`/claim/${type}-individual-details`)
  }

  enterContactPerson (contactPerson: string): void {
    I.fillField(fields.contactPerson, contactPerson)
  }

  enterCompanyName (name: string): void {
    I.fillField(fields.name, name)
  }

  enterAddress (address): void {
    I.fillField(fields.address.line1, address.line1)
    I.fillField(fields.address.line2, address.line2)
    I.fillField(fields.address.postcode, address.postcode)
    I.fillField(fields.address.city, address.city)
  }

  enterAddresses (address, correspondenceAddress): void {
    I.fillField(fields.address.line1, address.line1)
    I.fillField(fields.address.line2, address.line2)
    I.fillField(fields.address.city, address.city)
    I.fillField(fields.address.postcode, address.postcode)

    I.checkOption(fields.hasCorrespondenceAddress)

    I.fillField(fields.correspondenceAddress.line1, correspondenceAddress.line1)
    I.fillField(fields.correspondenceAddress.line2, correspondenceAddress.line2)
    I.fillField(fields.correspondenceAddress.city, correspondenceAddress.city)
    I.fillField(fields.correspondenceAddress.postcode, correspondenceAddress.postcode)
  }

  submit (): void {
    I.click(buttons.submit)
  }
}
