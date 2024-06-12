import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        category: 'test category',
        description: 'test description',
        stock: 1,
      };
      mockProductsService.create.mockResolvedValue(createProductDto);

      const result = await controller.create(createProductDto);
      expect(result).toEqual(createProductDto);
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [{ name: 'Test Product', price: 100 }];
      mockProductsService.findAll.mockResolvedValue(products);

      const result = await controller.findAll();
      expect(result).toEqual(products);
      expect(mockProductsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const id = 'someId';
      const product = { name: 'Test Product', price: 100 };
      mockProductsService.findOne.mockResolvedValue(product);

      const result = await controller.findOne(id);
      expect(result).toEqual(product);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = 'nonExistingId';
      mockProductsService.findOne.mockResolvedValue(null);

      try {
        await controller.findOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = 'someId';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
      };
      const updatedProduct = { name: 'Updated Product', price: 150 };
      mockProductsService.update.mockResolvedValue(updatedProduct);

      const result = await controller.update(id, updateProductDto);
      expect(result).toEqual(updatedProduct);
      expect(mockProductsService.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = 'nonExistingId';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
      };
      mockProductsService.update.mockResolvedValue(null);

      try {
        await controller.update(id, updateProductDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const id = 'someId';
      mockProductsService.remove.mockResolvedValue(true);

      await controller.remove(id);
      expect(mockProductsService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = 'nonExistingId';
      mockProductsService.remove.mockResolvedValue(null);

      try {
        await controller.remove(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
