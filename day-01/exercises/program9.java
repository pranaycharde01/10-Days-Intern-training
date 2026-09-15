package exercises;

import java.util.HashSet;

// Program 9: Common Elements in Two Arrays
public class program9 {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = {3, 4, 5, 6, 7};
        HashSet<Integer> setA = new HashSet<>();
        HashSet<Integer> common = new HashSet<>();
        for (int x : a) setA.add(x);
        for (int x : b) if (setA.contains(x)) common.add(x);
        System.out.println("Common elements: " + common);
    }
}
