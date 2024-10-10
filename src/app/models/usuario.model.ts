// usuario.model.ts
export interface Usuario {
    id? :string;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    cliente_id?: number; // Puedes marcarlo como opcional si no siempre está presente
  }
  