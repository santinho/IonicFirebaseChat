export class User{
  constructor(
    public name:string,
    public username:string,
    public email:string,
    public photo:string,
  ){}

  public getKey():string{
    console.log('key',this.username.replace('.',''))
    return this.username.replace('.','');
  }
}
