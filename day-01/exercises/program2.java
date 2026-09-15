package exercises;

// Program 2: Palindrome Check
public class program2 {
    public static void main(String[] args) {
        String str = "madam";
        String rev = new StringBuilder(str).reverse().toString();
        System.out.println(str + " is " + (str.equals(rev) ? "" : "not ") + "a palindrome");
    }
}
