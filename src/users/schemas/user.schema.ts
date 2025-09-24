import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema({timestamps: true})
export class User {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
    // Solo hashear si la contraseña fue modificada
    if (!this.isModified('password')) return next();
    
    // Hashear la contraseña
    this.password = await bcrypt.hash(this.password, 12);
    next();
});