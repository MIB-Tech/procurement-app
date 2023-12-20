import {UserModel} from '../User';
import {AbstractModel} from '../../../_custom/types/types';
import {OperationModel} from '../Operation';


export enum RoleKeyEnum {
  SuperAdmin = 'ROLE_SUPER_ADMIN',
  Responsible = 'ROLE_RESPONSIBLE',
  Supervisor = 'ROLE_SUPERVISOR',
  ParamedicalServiceDS = 'ROLE_PARAMEDICAL_SERVICE_DS',
  ServiceMajor = 'ROLE_SERVICE_MAJOR',
  BiomedicalTechnician = 'ROLE_BIOMEDICAL_TECHNICIAN',
}

type Model = {
  roleKey: RoleKeyEnum
  name: string
  operations: Array<OperationModel>
  users: Array<UserModel>
} & AbstractModel

export default Model;