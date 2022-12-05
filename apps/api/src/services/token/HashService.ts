import bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class HashService {
  async hashString(stringToHash: string): Promise<string> {
    return await bcrypt.hash(stringToHash, 10);
  }

  async compareString(stringToHash: string, expected: string) {
    return await bcrypt.compare(stringToHash, expected);
  }
}
