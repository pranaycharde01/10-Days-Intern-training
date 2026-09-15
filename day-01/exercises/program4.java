package exercises;

import java.util.LinkedHashSet;

// Program 4: Remove Duplicates
public class program4 {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 2, 4, 3, 5};
        LinkedHashSet<Integer> set = new LinkedHashSet<>();
        for (int n : arr) set.add(n);
        System.out.println("Without duplicates: " + set);
    }
}
