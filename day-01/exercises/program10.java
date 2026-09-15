package exercises;

// Program 10: Stack Implementation
public class program10 {
    static int[] stack = new int[5];
    static int top = -1;

    static void push(int val) {
        if (top == stack.length - 1) { System.out.println("Stack Overflow"); return; }
        stack[++top] = val;
    }

    static int pop() {
        if (top == -1) { System.out.println("Stack Underflow"); return -1; }
        return stack[top--];
    }

    static int peek() { return top == -1 ? -1 : stack[top]; }

    public static void main(String[] args) {
        push(10); push(20); push(30);
        System.out.println("Peek: " + peek());
        System.out.println("Pop: " + pop());
        System.out.println("Pop: " + pop());
        System.out.println("Peek: " + peek());
    }
}
