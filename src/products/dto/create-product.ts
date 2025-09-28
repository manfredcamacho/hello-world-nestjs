import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto
{
    @ApiProperty({ description: 'The name of the product' })
    readonly name: string;
    @ApiProperty({ description: 'The price of the product' })
    readonly price: number;
    @ApiProperty({ description: 'The currency of the product' })
    readonly currency: string;
    @ApiProperty({ description: 'The categories of the product' })
    readonly categories: string[];
    @ApiProperty({ description: 'The measurements of the product' })
    readonly measurements: {
        height: number;
        width: number;
        weight: number;
    };
}
