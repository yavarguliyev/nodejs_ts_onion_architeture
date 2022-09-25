import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { initialize } from './entrypoint';

(async () => {
  await initialize();
})();