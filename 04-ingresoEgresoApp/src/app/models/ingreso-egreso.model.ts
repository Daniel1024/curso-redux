export class IngresoEgresoModel {
  constructor(
    public descripcion: string,
    public monto: string,
    public tipo: string,
    public uid?: string,
  ) { }
}
