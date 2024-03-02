

import { Cursos } from "../../cursos/cursos.service";
import { Usuarios } from "../../usuarios/modelos/usuarios";

export interface inscripciones {
    id: string | number;
    usuarioId: string | number;
    cursoId: string | number;
    usuario?: Usuarios //hacemos que el usuario no sea nesesario en la peticion;
    curso?: Cursos
}

export interface CrearInscripcionesData {
    userId: string | number | null;
    productId: string | number | null;
}