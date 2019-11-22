import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginInput } from '../inputs/login.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if(user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    
    async findUserById(id: string): Promise<any> {
        const user = await this.usersService.findById(id);
        if(user) {
            return user;
        }
        return null;
    }

    async login(login: LoginInput) {
        let user = await this.usersService.findOne({username: login.username})
        if(user){
            if(user.password === login.password){
                const payload = { username: user.username, sub: user.id };
                let token = await this.jwtService.sign(payload)
                return {
                    token: token
                }
            } else {
                throw new Error('密码错误');
            }
        } else {
            throw new Error('用户不存在');
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
                console.log(user)
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
