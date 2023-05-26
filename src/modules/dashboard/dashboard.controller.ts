import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  @Get()
  @Render('dashboard')
  root() {
    return;
  }


}
