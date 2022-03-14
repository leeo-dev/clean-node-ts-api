import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldsValidation } from '../../../presentation/helpers/validators/required-fields-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validator-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
