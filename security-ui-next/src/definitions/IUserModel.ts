import { IJobLocationModel } from './IJobLocationModel';

export interface IUserModel {
  NidUser: string,
  username: string,
  firstName: string,
  lastName: string,
  lastLoginDate: string,
  IDNumber: string,
  tel: string,
  mobile: string,
  email: string,
  isSysAdmin: boolean,
  isSysApp: boolean,
  isSys3rdParty: boolean,
  mustChangePassword: boolean,
  mustLoginByCamera: boolean,
  startActiveDate: string,
  endActiveDate: string,
  address: string,
  enabled: boolean,
  domain: Array<string>,
  fatherName: string,
  birthDate: string,
  birthPlace: string,
  description: string,
  userJobLoction?: IJobLocationModel,
  CI_Nationality: null | number,
  signatureImage?: string,
  fingerprintImage?: string,
  sessionTimeout: number,
}
