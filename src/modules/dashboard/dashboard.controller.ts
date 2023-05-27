/* eslint-disable prettier/prettier */
import { Controller, Get, Render, Request, Response, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  @Render('dashboard')
  root() {
    return;
  }


}
