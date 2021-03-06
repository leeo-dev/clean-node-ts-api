import { makeLoginValidation } from './login-validation-factory'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { EmailValidation, RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

jest.mock('../../../../../validation/validators/validator-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
