package exercises;

// Program 14: Two Sum (find pair with given target)
public class program14 {
    public static void main(String[] args) {
        int[] arr = {2, 7, 11, 15};
        int target = 9;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] == target) {
                    System.out.println("Pair found: " + arr[i] + " + " + arr[j] + " = " + target);
                    return;
                }
            }
        }
        System.out.println("No pair found");
    }
}
