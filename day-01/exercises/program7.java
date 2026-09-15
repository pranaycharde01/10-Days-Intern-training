package exercises;

import java.util.LinkedHashMap;
import java.util.Map;

// Program 7: First Non-Repeating Character
public class program7 {
    public static void main(String[] args) {
        String str = "swiss";
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : str.toCharArray())
            if (freq.containsKey(c)) freq.put(c, freq.get(c) + 1);
            else freq.put(c, 1);
        char result = ' ';
        for (Map.Entry<Character, Integer> e : freq.entrySet()) {
            if (e.getValue() == 1) { result = e.getKey(); break; }
        }
        System.out.println("First non-repeating: " + (result == ' ' ? "None" : result));
    }
}
