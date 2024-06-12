import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockUsersService.create.mockResolvedValue(createUserDto);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(createUserDto);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { email, password: 'password123' };
      mockUsersService.findOne.mockResolvedValue(user);

      const result = await controller.findOne(email);
      expect(result).toEqual(user);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(email);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const email = 'nonExistingUser@example.com';
      mockUsersService.findOne.mockResolvedValue(null);

      try {
        await controller.findOne(email);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
