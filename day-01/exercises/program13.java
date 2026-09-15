package exercises;

import java.util.Arrays;

// Program 13: Sorting Without Built-in Sort (Selection Sort)
public class program13 {
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++)
                if (arr[j] < arr[minIdx]) minIdx = j;
            int temp = arr[minIdx]; arr[minIdx] = arr[i]; arr[i] = temp;
        }
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
