import { AbstractModel } from '../../../_custom/types/types';
import { ServiceModel } from '../Service';


//TODO: remove
export enum ServiceTypeEnum {
  OperatingRoom = 'OPERATING_ROOM',
  CheckUp = 'CHECK_UP',
  Geriatrics = 'GERIATRICS',
  DayHospital = 'DAY_HOSPITAL',
  Laboratory = 'LABORATORY',
  AestheticMedicine = 'AESTHETIC_MEDICINE',
  NuclearMedicine = 'NUCLEAR_MEDICINE',
  Oncology = 'ONCOLOGY',
  Ophthalmology = 'OPHTHALMOLOGY',
  Pharmacy = 'PHARMACY',
  Psychiatry = 'PSYCHIATRY',
  Radiology = 'RADIOLOGY',
  Radiotherapy = 'RADIOTHERAPY',
  USI = 'USI',
  Emergency = 'EMERGENCY',
  ConsultationRoom = 'CONSULTATION_ROOM',
  OperatingTheater = 'OPERATING_THEATER',
  Sterilization = 'STERILIZATION',
  Maternity = 'MATERNITY',
  Hospitalization = 'HOSPITALIZATION',
  GeneralIntensiveCareUnit = 'GENERAL_INTENSIVE_CARE_UNIT',
  NeonatalIntensiveCareUnit = 'NEONATAL_INTENSIVE_CARE_UNIT',
  Stock = 'STOCK',
}

type Model = {
  name: string
  services: Array<ServiceModel>
} & AbstractModel

export default Model;