package exercises;

import java.util.LinkedHashMap;
import java.util.Map;

// Program 6: Character Frequency
public class program6 {
    public static void main(String[] args) {
        String str = "programming";
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : str.toCharArray())
            if (freq.containsKey(c)) freq.put(c, freq.get(c) + 1);
            else freq.put(c, 1);
        System.out.println("Character frequencies: " + freq);
    }
}
