import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid'

const PatientData = [
  {
    id: uuidv4(),
    name: 'John Doe',
    mobile: '1234567890',
    dateOfBirth: '1990-01-01',
    insurance: 'ABC Insurance',
  },
]

@Injectable()
export class PatientService {

  getPatientByMobile(mobile: string) {
    return PatientData.find((patient) => patient.mobile === mobile)
  }

  getAllPatients() {
    return PatientData
  }

  createPatient(patient: { name: string; mobile: string; dateOfBirth: string; insurance: string; insuranceNumber: string }) {
    const newPatient = {
      id: uuidv4(),
      ...patient,
    }
    PatientData.push(newPatient)
    return newPatient
  }
}
