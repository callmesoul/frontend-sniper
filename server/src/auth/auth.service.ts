import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if(user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
    
    async register(params: CreateUserDto) {
        let user = await this.usersService.findOne({username: params.username})
        if(user){
            throw new Error('此用户名已被注册');
        }else{
            user = await this.usersService.findOne({ email: params.email});
            if(user){
                throw new Error('此邮箱已经被注册');
            }else{
                user = await this.usersService.create(params);
                const payload = { username: user.username, sub: user.id };
                let token = await this.jwtService.sign(payload)
                console.log(token);
                return {
                    token: token
                }
            }
        }
        
    }
}
