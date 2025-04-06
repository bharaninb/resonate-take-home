import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

interface Appointment {
  id: string
  date: string
  time: string
  available: boolean
  patientId: string | null
  cancelReason?: string | null
  appointmentType?: string | null
  emergencyReason?: string | null
}

const appointmentData: Appointment[] = [
  {
    id: uuidv4(),
    date: DateTime.now().plus({ days: 1 }).toISODate(),
    time: '10:00',
    available: true,
    patientId: null,
  },
  {
    id: uuidv4(),
    date: DateTime.now().plus({ days: 1 }).toISODate(),
    time: '11:00',
    available: true,
    patientId: null,
  },
  {
    id: uuidv4(),
    date: DateTime.now().plus({ days: 1 }).toISODate(),
    time: '12:00',
    available: false,
    patientId: uuidv4(),
  },
  {
    id: uuidv4(),
    date: DateTime.now().plus({ days: 1 }).toISODate(),
    time: '13:00',
    available: true,
    patientId: null,
  },
  {
    id: uuidv4(),
    date: DateTime.now().plus({ days: 1 }).toISODate(),
    time: '14:00',
    available: false,
    patientId: uuidv4(),
  },
  {
    id: uuidv4(),
    date: DateTime.now().plus({ days: 1 }).toISODate(),
    time: '15:00',
    available: true,
    patientId: null,
  },
]

@Injectable()
export class AppointmentService {
  getAvailableSlots(date: string) {
    const slots = appointmentData.filter(
      (appointment) => appointment.date === date && appointment.available
    )
    return slots.map((slot) => ({
      id: slot.id,
      time: slot.time,
    }))
  }

  bookAppointment(appointmentId: string, patientId: string, appointmentType: string, emergencyReason: string) {
    const appointment = appointmentData.find((appointment) => appointment.id === appointmentId)
    if (appointment && appointment.available) {
      appointment.available = false
      appointment.patientId = patientId
      appointment.appointmentType = appointmentType
      appointment.emergencyReason = emergencyReason
      
      return appointment
    }
    return null
  }

  cancelAppointment(appointmentId: string, cancelReason: string) {
    const appointment = appointmentData.find((appointment) => appointment.id === appointmentId)
    if (appointment && !appointment.available) {
      appointment.available = true
      appointment.patientId = null
      appointment.cancelReason = cancelReason
      return appointment
    }
    return null
  }

  rescheduleAppointment(appointmentId: string, newDate: string, newTime: string, appointmentType: string, emergencyReason: string) {
    const appointment = appointmentData.find((appointment) => appointment.id === appointmentId)
    if (appointment && !appointment.available) {
      appointment.date = newDate
      appointment.time = newTime
      appointment.appointmentType = appointmentType
      appointment.emergencyReason = emergencyReason
      return appointment
    }
    return null
  }

  getAppointmentById(appointmentId: string) {
    return appointmentData.find((appointment) => appointment.id === appointmentId)
  }

  getAppointmentsByPatientId(patientId: string) {
    return appointmentData.filter((appointment) => appointment.patientId === patientId)
  }
}
