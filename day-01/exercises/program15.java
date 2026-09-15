package exercises;

// Program 15: Check if Two Strings are Anagrams
public class program15 {
    public static void main(String[] args) {
        String s1 = "listen", s2 = "silent";
        if (s1.length() != s2.length()) {
            System.out.println("Not anagrams");
            return;
        }
        int[] count = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            count[s1.charAt(i) - 'a']++;
            count[s2.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) {
                System.out.println(s1 + " and " + s2 + " are not anagrams");
                return;
            }
        }
        System.out.println(s1 + " and " + s2 + " are anagrams");
    }
}
