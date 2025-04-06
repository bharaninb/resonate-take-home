import OpenAI from "openai"

const convTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
    {
      type: 'function',
      function: {
        name: 'get_patient_info',
        description: 'Get patient information using mobile number',
        parameters: {
          type: 'object',
          properties: {
            mobile: {
              type: 'string',
              description: 'mobile number',
            },
          },
          required: ['mobile'],
          additionalProperties: false,
        },
        strict: true,
      },
    },
    {
      type: 'function',
      function: {
        name: 'create_patient',
        description: 'Create a new patient with the provided information. Ask the user for the required information before calling this function. Ask the user one detail at a time.',
        parameters: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Full name of the patient',
            },
            dateOfBirth: {
              type: 'string',
              description: 'Date of birth in YYYY-MM-DD format.  Please dont ask user to enter in this format. Just ask them to enter the date in a human friendly way. Please dont ask user to enter in this format. Just ask them to enter the mobile in a human friendly way.',
            },
            insurance: {
              type: 'string',
              description: 'Insurance provider name',
            },
            mobile: {
              type: 'string',
              description: 'mobile number in the format of just number . Please make sure to validate the mobile number before calling this function.',
            },
          },
          required: ['mobile', 'name', 'dateOfBirth', 'insurance'],
          additionalProperties: false,
        },
        strict: true,
      },
    },
    {
      type: 'function',
      function: {
        name: 'get_available_time_slots',
        description: 'Get available slots for booking an appointment in a specific date',
        parameters: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              example: '2025-07-23',
              description:
                'Date, when the user wants to book an appointment. The date must be in the format of YYYY-MM-DD. Please dont ask user to enter in this format. Just ask them to enter the date in a human friendly way.',
            },
          },
          required: ['date'],
          additionalProperties: false,
        },
        strict: true,
      },
    },
    {
      type: 'function',
      function: {
        name: 'book_appointment',
        description: 'Book an appointment for the patient',
        parameters: {
          type: 'object',
          properties: {
            appointmentId: {
              type: 'string',
              description:
                'Appointment ID of the available slot that the user wants to book. This should be the same as the appointmentId returned by the get_available_time_slots function.',
            },
          patientId: {
              type: 'string',
              description:
                'id of the patient who wants to book an appointment. This should be the same as the patientId returned by the create_patient function.',
            },
            appointmentType: {
              type: 'string',
              enum: ['General checkup', 'Cleaning', 'Emergency'],
              description:
                'Type of appointment the user wants to book. The appointment type can be one of the following: General checkup, Cleaning, Emergency. Make sure to get the appointment type from the user before calling this function.',
            },
            emergencyReason: {
              type: 'string',
              description:
                'Reason for the emergency appointment. This field is required only if the appointment type is Emergency.',
            },
          },
          required: ['appointmentId', 'patientId', 'appointmentType', 'emergencyReason'],
          additionalProperties: false,
        },
        strict: true,
      },
    },
    {
      type: 'function',
      function: {
        name: 'reschedule_appointment',
        description: 'Reschedule an appointment for the patient',
        parameters: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Code of the appointment to be cancelled',
            },
            date: {
              type: 'string',
              example: '2025-07-23',
              description:
                'Date, when the user wants to book an appointment. The date must be in the format of YYYY-MM-DD.',
            },
            time: {
              type: 'string',
              example: '20:12',
              description:
                'time, on which user wants to book an appointment on a specified date. Time must be in %H:%M format.',
            },
            appointmentType: {
              type: 'string',
              enum: ['General checkup', 'Cleaning', 'Emergency'],
              description:
                'Type of appointment the user wants to book. The appointment type can be one of the following: General checkup, Cleaning, Emergency.',
            },
            emergencyReason: {
              type: 'string',
              description:
                'Reason for the emergency appointment. This field is required only if the appointment type is Emergency.',
            },
          },
          required: ['date', 'time', 'code', 'appointmentType', 'emergencyReason'],
          additionalProperties: false,
        },
        strict: true,
      },
    },
    {
      type: 'function',
      function: {
        name: 'cancel_appointment',
        description: 'Cancel an appointment for the patient',
        parameters: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Code of the appointment to be cancelled',
            },
            cancelReason: {
              type: 'string',
              description: 'Reason for cancelling the appointment. Make sure to get the reason from the user before calling this function.',
            },
          },
          required: ['code', 'cancelReason'],
          additionalProperties: false,
        },
        strict: true,
      },
    },
    
    // Function for getting available time slots for the tentative dates so that user can choose the date and time for the appointment. This function will be called only if the user is not sure about the date and time for the appointment.

    // Function to notify the staff if the user failed to book an appointment for any reason. This function will also be called if the AI is not able to understand the user query and is not able to book an appointment.

    // Function to search on the knowledge base for the user query. This function will be called if the user is asking for something that is not related to booking an appointment. For example, if the user is asking for the clinic address or opening hours.


  ]

  export {convTools}