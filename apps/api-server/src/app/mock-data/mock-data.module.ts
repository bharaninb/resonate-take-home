import { Module } from '@nestjs/common'
import { PatientService } from './patient.service';
import { AppointmentService } from './appointment.service';
import { ConversationService } from './conversation.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PatientService, AppointmentService, ConversationService],
  exports: [PatientService, AppointmentService, ConversationService],
})
export class MockDataModule {}
