import { serverError } from './../../../helpers/http/http-helper'
import { badRequest } from '../../../helpers/http/http-helper'
import { Validation } from './../../../protocols/validation'
import { HttpRequest, HttpResponse, Controller, AddSurvey } from './add-survey-controller-protocols'
export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(new Error())
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({ question, answers })
      return {
        statusCode: 200,
        body: {}
      }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
