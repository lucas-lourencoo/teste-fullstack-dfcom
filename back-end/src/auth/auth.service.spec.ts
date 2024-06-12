import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token if credentials are valid', async () => {
      const email = 'test@example.com';
      const pass = 'password123';
      const user = { _id: 'userId', email, password: 'hashedPassword' };

      mockUsersService.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('accessToken');

      const result = await service.signIn(email, pass);

      expect(usersService.findOne).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(pass, user.password);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user._id,
        email: user.email,
      });
      expect(result).toEqual({ access_token: 'accessToken' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const email = 'test@example.com';
      const pass = 'password123';

      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.signIn(email, pass)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const email = 'test@example.com';
      const pass = 'password123';
      const user = { _id: 'userId', email, password: 'hashedPassword' };

      mockUsersService.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn(email, pass)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
