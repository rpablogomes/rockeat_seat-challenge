class User {
    String user;
    String password;
  
    void authentic(
        if((database.user[this.user]) && database.user[this.user].password == this.password){
            print("Welcome ${this.user}")
            // Goes here code to redirect user to its user page.
        }else{
            print("Wrong User or Password")
            // Goes here code to alert user the username or password is wrong.
            
        }
    )
}    
    
void main() {
  
  User user = new user();
  user.user = "Pablo"; // Get from a supposed user
  user.password = "123456789Abc"; // Get from a supposed user
  
}
