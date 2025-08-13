import InstrumentCardList from "@/app/components/card-list/instrumentCardList"
import { mountWithProviders } from "../support/mountWithProviders"
import { RentStatus } from "@prisma/client"
describe("InstrumentCardList", () => {
  
  const mockInstruments = [
      {
        id: "1",
        classification: "Trumpet",
        brand: "King",
        serialNumber: "K-12435",
        rentStatus: RentStatus.Available,
        instrumentAssignment: null,
        school: {
          name: "School A"
        }
      } 
    ]
     const mockStudents = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      school: {
        id: "school1",
        districtId: null,
        profileId: null,
        name: "School A"
      }
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      school: {
        id: "school2",
        districtId: null,
        profileId: null,
        name: "School A"
      }
    }

  ]

  const preloadedState = {
    searchOptions: { 
      type: "",
      search: "",
      school: "School A",
      district: false
    },
    students: { 
      dropDownList: mockStudents 
    }
  }
  it("shows a message when no instruments are provided", () => {
    mountWithProviders(<InstrumentCardList instrumentSearchResults={[]} />, {preloadedState})

    cy.contains("No instruments found for selected school").should("exist")
  })

  it("Shows proper data header for table", () => {
    

    mountWithProviders(<InstrumentCardList instrumentSearchResults={[]}/>, {preloadedState})   
    cy.contains("Instrument Type").should("exist")
    cy.contains("Brand").should("exist")
    cy.contains("Serial Number").should("exist")
    cy.contains("Status").should("exist")
    cy.contains("School").should("exist")
    cy.contains("Assign Student").should("exist")
    cy.contains("Remove Instrument").should("exist")
  })

  it("Shows proper data for cards without an assignment", () => {
    const store = 
    
    mountWithProviders(<InstrumentCardList instrumentSearchResults={mockInstruments}/>, {preloadedState})
    cy.get("[data-cy=table-row]").should("exist")
  })  
})


