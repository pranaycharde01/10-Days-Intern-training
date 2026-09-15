package exercises;

// Program 11: Queue Implementation
public class program11 {
    static int[] queue = new int[5];
    static int front = 0, rear = 0;

    static void enqueue(int val) {
        if (rear == queue.length) { System.out.println("Queue Full"); return; }
        queue[rear++] = val;
    }

    static int dequeue() {
        if (front == rear) { System.out.println("Queue Empty"); return -1; }
        return queue[front++];
    }

    static int peek() { return front == rear ? -1 : queue[front]; }

    public static void main(String[] args) {
        enqueue(10); enqueue(20); enqueue(30);
        System.out.println("Peek: " + peek());
        System.out.println("Dequeue: " + dequeue());
        System.out.println("Dequeue: " + dequeue());
        System.out.println("Peek: " + peek());
    }
}
