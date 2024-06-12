import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token if credentials are valid', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const accessToken = { access_token: 'someAccessToken' };

      mockAuthService.signIn.mockResolvedValue(accessToken);

      const result = await controller.signIn(signInDto);

      expect(service.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
      expect(result).toEqual(accessToken);
    });
  });
});
