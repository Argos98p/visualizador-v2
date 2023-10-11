//Aqui van las interfaces mas importantes 

interface ExtraInterface{
    idextra: number;
    nombre: string;
    descripcion: string;
    imagen?: {
      path: string;
      hotspots: Record<string, unknown>; // Puedes ajustar este tipo si conoces la estructura exacta
      idframe: number;
    };
    enlace?:string;
    path?: string;
  }

  export { type ExtraInterface}