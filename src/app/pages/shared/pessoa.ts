import {Address} from './address';
import {Height} from './height';
import {Weight} from './weight';
import {Phone} from './phone';

export class Pessoa {
  public id: number;
  public uuid: string;
  public fullName: string;
  public documentNumber: string;
  public fathersName: string;
  public mothersName: string;
  public birthDate: string;
  public sexType: string;
  public email: string;
  public address: Address;
  public phone: Phone;
  public height: Height;
  public weight: Weight;
}
