export class Employee {
  protected employeeName : string;
  public printName = () => console.log(this.employeeName);
  constructor(employeeName : string) {
    this.employeeName = employeeName;
  }
}

export class Developer extends Employee {
  protected programmingLanguage : string;
  public developmentLanguage = () => console.log(this.programmingLanguage);
  constructor(employeeName : string, programmingLanguage : string) {
    super(employeeName);
    this.programmingLanguage = programmingLanguage;
  }
}