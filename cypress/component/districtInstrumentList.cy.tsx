// cypress/component/DistrictInstrumentCardList.cy.tsx
import React from 'react'
import DistrictInstrumentCardList from '@/app/components/card-list/districtInstrumentCardList'
import { RentStatus } from '@prisma/client'
import { mountWithProviders } from '../support/mountWithProviders'

describe('DistrictInstrumentCardList', () => {

  it('shows empty state when no instruments are found', () => {
    cy.mount(<DistrictInstrumentCardList districtInstrumentSearchResults={[]} />)

    cy.contains('No instruments found').should('exist')
    cy.contains('Try adjusting your search criteria').should('exist')
  })

  it('renders DistrictTable and DistrictCard when results are provided', () => {
    const instruments = [
      {
        id: '1',
        classification: 'Woodwind',
        brand: 'Yamaha',
        serialNumber: '12345',
        rentStatus: RentStatus.Available,
        school: {
          name: 'Lincoln High School'
        }
      }
    ]
		mountWithProviders(<DistrictInstrumentCardList districtInstrumentSearchResults={instruments} />)
		cy.contains("Yamaha").should("exist")
		cy.contains("Lincoln High School").should("exist")
  })
})
