export class Payment {
  constructor(
    public fiatAmount: number,
    public address: string,
    public firstName: string,
    public lastName: string,
    public document: string,
    public email: string,
    public phone: string,
    public state: string,
    public urlPayment: string,
    public reference: string,
    public id?: number,
  ) {}

  get getId() {
    return this.id;
  }

  get getFiatAmount() {
    return this.fiatAmount;
  }

  get getAddress() {
    return this.address;
  }

  get getFirstName() {
    return this.firstName;
  }

  get getLastName() {
    return this.lastName;
  }

  get getDocument() {
    return this.document;
  }

  get getEmail() {
    return this.email;
  }

  get getPhone() {
    return this.phone;
  }

  get getState() {
    return this.state;
  }

  get getUrlPayment() {
    return this.urlPayment;
  }

  get getReference() {
    return this.reference;
  }

  set setId(id: number) {
    this.id = id;
  }

  set setFiatAmount(fiatAmount: number) {
    this.fiatAmount = fiatAmount;
  }

  set setAddress(address: string) {
    this.address = address;
  }

  set setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  set setLastName(lastName: string) {
    this.lastName = lastName;
  }

  set setDocument(document: string) {
    this.document = document;
  }

  set setEmail(email: string) {
    this.email = email;
  }

  set setPhone(phone: string) {
    this.phone = phone;
  }

  set setState(state: string) {
    this.state = state;
  }

  set setUrlPayment(urlPayment: string) {
    this.urlPayment = urlPayment;
  }

  set setReference(reference: string) {
    this.reference = reference;
  }
}