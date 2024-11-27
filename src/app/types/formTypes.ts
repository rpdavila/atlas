export enum RentStatus {
  Available = 'Available',
  Rented = 'Rented'
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  emailVerified?: Date | null
  image?: string | null
  accounts: Account[]
  sessions: Session[]
  Authenticator: Authenticator[]
  profile?: Profile | null
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  userId: string
  user: User
  schools: School[]
  students: Student[]
  instruments: Instrument[]
  district?: District | null
  role: string
  districtId?: string | null
}

export interface School {
  id: string
  districtId?: string | null
  name: string
  district?: District | null
  instruments: Instrument[]
  profile?: Profile | null
  profileId?: string | null
  students: Student[]
  instrumentAssignments: InstrumentAssignment[]
}

export interface District {
  id: string
  name: string
  state: string
  schools: School[]
  instruments: Instrument[]
  profile: Profile[]
  profileId?: string | null
}

export interface Student {
  id: string
  schoolId?: string | null
  firstName: string
  lastName: string
  studentIdNumber: string
  instrumentAssignment?: InstrumentAssignment | null
  school?: School | null
  Profile?: Profile | null
  profileId?: string | null
}

export interface Instrument {
  id: string
  districtId: string
  schoolId: string
  classification: string
  brand: string
  serialNumber: string
  rentStatus: RentStatus
  instrumentAssignment?: InstrumentAssignment | null
  school: School
  district: District
  Profile?: Profile | null
  profileId?: string | null
}

export interface InstrumentAssignment {
  id: string
  studentId: string
  instrumentId: string
  schoolId: string
  student: Student
  instrument: Instrument
  school?: School | null
}

interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string | null
  access_token?: string | null
  expires_at?: number | null
  token_type?: string | null
  scope?: string | null
  id_token?: string | null
  session_state?: string | null
  createdAt: Date
  updatedAt: Date
  user: User
}

interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user: User
  createdAt: Date
  updatedAt: Date
}

interface VerificationToken {
  id: string
  identifier: string
  token: string
  expires: Date
}

interface Authenticator {
  credentialID: string
  userId: string
  providerAccountId: string
  credentialPublicKey: string
  counter: number
  credentialDeviceType: string
  credentialBackedUp: boolean
  transports?: string | null
  user: User
}


