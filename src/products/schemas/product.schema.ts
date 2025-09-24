import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

//decorador que identifica a la clase como un schema
@Schema({timestamps: true})
export class Product {
  //decorador que define una propiedad de un documento de mongo
  @Prop({ type: String, required: true })
  //nombre_propiedad: tipo de dato de la propiedad en typeScript
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: [String], required: true })
  categories: string[];

  @Prop({ type: Object, required: true })
  measurements: {
    height: number;
    width: number;
    weight: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);