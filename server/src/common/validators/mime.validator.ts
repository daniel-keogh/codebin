import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { MimeUtils } from '../../utils/mime.util';

@ValidatorConstraint()
export class IsValidMime implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !!MimeUtils.findMime(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a supported MIME type`;
  }
}
