import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Model } from 'mongoose';
import { Product } from './product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  const mockProductModel = {
    new: jest.fn().mockResolvedValue({ save: jest.fn().mockResolvedValue({}) }),
    constructor: jest.fn().mockResolvedValue({}),
    find: jest.fn(),
    findById: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'PRODUCT_MODEL',
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>('PRODUCT_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [{ name: 'Test Product', price: 100 }];
      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(products),
      });

      const result = await service.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const id = 'someId';
      const product = { name: 'Test Product', price: 100 };
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(product),
      });

      const result = await service.findOne(id);
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', async () => {
      const id = 'someId';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
      };
      const product = {
        name: 'Test Product',
        price: 100,
        save: jest.fn().mockResolvedValue(true),
      };

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(product),
      });

      mockProductModel.updateOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(true),
      });

      const result = await service.update(id, updateProductDto);
      expect(mockProductModel.findById).toHaveBeenCalledWith(id);
      expect(mockProductModel.updateOne).toHaveBeenCalledWith(
        { _id: id },
        updateProductDto,
      );
      expect(result).toBe(true);
    });

    it('should return null if product is not found', async () => {
      const id = 'nonExistingId';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
      };

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await service.update(id, updateProductDto);
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a product and return the result', async () => {
      const id = 'someId';
      const product = { name: 'Test Product', price: 100 };

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(product),
      });

      mockProductModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(true),
      });

      const result = await service.remove(id);
      expect(mockProductModel.findById).toHaveBeenCalledWith(id);
      expect(mockProductModel.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(result).toBe(true);
    });

    it('should return null if product is not found', async () => {
      const id = 'nonExistingId';

      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await service.remove(id);
      expect(result).toBeNull();
    });
  });
});
