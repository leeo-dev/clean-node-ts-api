import { Decrypter } from './../../protocols/cryptography/decrypter';
import { LoadAccountByToken } from "../../../domain/usecases/load-account-by-token";
import { AccountModel } from "../add-account/db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}
  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return Promise.resolve(null)
  }
}