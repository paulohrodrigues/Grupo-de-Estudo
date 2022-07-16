import { Injectable } from '@nestjs/common';

@Injectable()
export class HealfService {
  getHealf(): { success: string; time: number } {
    return { success: 'ok', time: new Date().getTime() };
  }
}
