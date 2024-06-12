import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const productCreated = new this.productModel(dto);
    return productCreated.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productModel.findById(id).exec();
    if (!product) return null;

    return this.productModel.updateOne({ _id: id }, dto).exec();
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) return null;
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
