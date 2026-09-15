package exercises;

public class program5 {

    public static void main(String[] args) {

        int[] arr = {1, 2, 3, 3, 5};

        int n = arr.length;

        int[] freq = new int[n + 1];

        // Count each number
        for (int i = 0; i < n; i++) {
            freq[arr[i]]++;
        }

        int missing = 0;
        int duplicate = 0;

        // Find missing and duplicate
        for (int i = 1; i <= n; i++) {

            if (freq[i] == 0) {
                missing = i;
            }

            if (freq[i] == 2) {
                duplicate = i;
            }
        }

        System.out.println("Missing: " + missing);
        System.out.println("Duplicate: " + duplicate);
    }
}