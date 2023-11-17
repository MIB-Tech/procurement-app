import { UserModel } from '../User';
import { RouteModel } from '../Route';
import { AbstractModel } from '../../../_custom/types/types';


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
  routes: Array<RouteModel>
  users: Array<UserModel>
} & AbstractModel

export default Model;