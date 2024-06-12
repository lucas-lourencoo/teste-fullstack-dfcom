import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if the token is valid', async () => {
      const request = {
        headers: {
          authorization: 'Bearer validToken',
        },
      } as Request;

      const payload = { sub: 'userId', email: 'test@example.com' };

      mockExecutionContext.getRequest.mockReturnValue(request);
      mockJwtService.verifyAsync.mockResolvedValue(payload);

      const result = await authGuard.canActivate(
        mockExecutionContext as unknown as ExecutionContext,
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith('validToken', {
        secret: process.env.JWT_SECRET,
      });
      expect(request['user']).toEqual(payload);
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException if no token is provided', async () => {
      const request = {
        headers: {},
      } as Request;

      mockExecutionContext.getRequest.mockReturnValue(request);

      await expect(
        authGuard.canActivate(
          mockExecutionContext as unknown as ExecutionContext,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if the token is invalid', async () => {
      const request = {
        headers: {
          authorization: 'Bearer invalidToken',
        },
      } as Request;

      mockExecutionContext.getRequest.mockReturnValue(request);
      mockJwtService.verifyAsync.mockRejectedValue(new Error());

      await expect(
        authGuard.canActivate(
          mockExecutionContext as unknown as ExecutionContext,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
