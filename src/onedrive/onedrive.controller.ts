import { Controller, Get, Query, Req } from '@nestjs/common';
import { OneDriveService } from './onedrive.service';

@Controller('onedrive')
export class OneDriveController {
  constructor(private readonly oneDriveService: OneDriveService) {}

  @Get('list-files')
  async listFiles(@Req() req) {
    return this.oneDriveService.listFiles(req);
  }

  @Get('download-file')
  async downloadFile(@Req() req, @Query('fileId') fileId: string) {
    return this.oneDriveService.downloadFile(req, fileId);
  }

  @Get('list-users')
  async listUsers(@Req() req, @Query('fileId') fileId: string) {
    return this.oneDriveService.listUsers(req, fileId);
  }

  @Get('delta')
  async getDelta(@Req() req) {
    return this.oneDriveService.listDelta(req);
  }
}
