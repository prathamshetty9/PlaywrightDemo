class User {
    constructor() {
      this.id = null;
      this.email = "";
      this.first_name = "";
      this.last_name = "";
      this.avatar = "";
    }
  
    // Getters
    getId() {
      return this.id;
    }
  
    getEmail() {
      return this.email;
    }
  
    getFirstName() {
      return this.first_name;
    }
  
    getLastName() {
      return this.last_name;
    }
  
    getAvatar() {
      return this.avatar;
    }
  
    // Setters
    setId(id) {
      this.id = id;
      return this;
    }
  
    setEmail(email) {
      this.email = email;
      return this;
    }
  
    setFirstName(first_name) {
      this.first_name = first_name;
      return this;
    }
  
    setLastName(last_name) {
      this.last_name = last_name;
      return this;
    }
  
    setAvatar(avatar) {
      this.avatar = avatar;
      return this;
    }
  
    // Convert the object to JSON format for API requests
    toJSON() {
      return {
        id: this.id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        avatar: this.avatar,
      };
    }
  }
  
  // Export the User class
  module.exports = User;
  