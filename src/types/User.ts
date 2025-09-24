// Interfaz completa del usuario (para uso interno)
export interface User {
    _id: string;
    name: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Interfaz para respuestas públicas (sin contraseña)
export interface UserResponse {
    _id: string;
    name: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}