// User Model
export class Usuario {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;

  constructor(uuid: string, username: string, first_name: string, last_name: string, email: string) {
    this.uuid = uuid;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

