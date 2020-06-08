import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService, LogConfig } from '../services/log/log.service';

@NgModule({
  imports: [CommonModule],
  providers: [LogService],
})
export class LogModule {
  static forRoot(
    config: LogConfig | null | undefined
  ): ModuleWithProviders<LogModule> {
    return {
      ngModule: LogModule,
      providers: [{ provide: LogConfig, useValue: config || {} }, LogService],
    };
  }
  static forChild(): ModuleWithProviders<LogModule> {
    return {
      ngModule: LogModule,
      providers: [LogService],
    };
  }
}
