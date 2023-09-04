import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';
import { EraseService } from './erase.service';
import { removeUserDTO } from './dto/remove-user.dto';
@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
    constructor(private readonly eraseService: EraseService) {}
 
@Delete()
remove(@Body() body: removeUserDTO,  @User() user) {
   const userId = user.id
   const { password } = body 
   return this.eraseService.remove(userId, password);
}
    
}

