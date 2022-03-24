import { SurveyModel } from './../../../domain/models/survey';
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'
const makeFakeSurveys = (): SurveyModel[] => {
  const fakeSurveys: SurveyModel[] = [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'http://www.any_image.com/image.png',
      answer: 'any_answer'
    }],
    created_at: new Date()
  }, {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'http://www.any_image.com/image.png',
      answer: 'any_answer'
    }],
    created_at: new Date()
  }]
  return fakeSurveys
}

describe('DbLoadSurveys', () => {
test('Should call LoadSurveysRepository', async () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[] | null> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
  await sut.load()
  expect(loadAllSpy).toBeCalled()
})
})