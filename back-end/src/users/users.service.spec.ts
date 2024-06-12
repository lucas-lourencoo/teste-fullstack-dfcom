import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './user.interface';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUserModel = {
    findOne: jest.fn(),
    save: jest.fn(),
    constructor: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_MODEL',
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>('USER_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if one is found', async () => {
      const email = 'test@example.com';
      const user = { email, password: 'hashedPassword' };
      mockUserModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(user),
      });

      const result = await service.findOne(email);
      expect(result).toEqual(user);
    });

    it('should return null if no user is found', async () => {
      const email = 'test@example.com';
      mockUserModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await service.findOne(email);
      expect(result).toBeNull();
    });
  });
});
