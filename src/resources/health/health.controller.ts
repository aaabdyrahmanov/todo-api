import {Get, Route, Tags, Example} from 'tsoa';

import {IHealthResponse} from './health.interface';

@Route('health')
@Tags('Health')
export default class HealthController {
  @Get('/')
  @Example<IHealthResponse>({
   uptime: 341,
   message: 'OK',
   timestamp: new Date('2021-01-13T13:21:09'),
  })
 public async getStatus(): Promise<IHealthResponse> {
  return {
   uptime: process.uptime(),
   message: 'OK',
   timestamp: new Date(),
  };
 }
}
