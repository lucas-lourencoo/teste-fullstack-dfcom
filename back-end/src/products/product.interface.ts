import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly stock: number;
}
