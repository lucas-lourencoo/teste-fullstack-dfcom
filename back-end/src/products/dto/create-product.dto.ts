import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({
    message: 'name is required.',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'description is required.',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'price is required.',
  })
  price: number;

  @IsString()
  @IsNotEmpty({
    message: 'category is required.',
  })
  category: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'stock is required.',
  })
  stock: number;
}
