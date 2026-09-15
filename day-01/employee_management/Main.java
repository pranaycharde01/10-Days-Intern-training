package employee_management;

import java.util.*;

public class Main {

    static ArrayList<Employee> employees = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {

        while (true) {

            System.out.println("\n===== Employee Management =====");
            System.out.println("1. Add Employee");
            System.out.println("2. Update Employee");
            System.out.println("3. Delete Employee");
            System.out.println("4. Search Employee");
            System.out.println("5. List Employees");
            System.out.println("6. Highest Salary");
            System.out.println("7. Average Salary");
            System.out.println("8. Department Filter");
            System.out.println("9. Exit");

            System.out.print("Enter choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1: add(); break;
                case 2: update(); break;
                case 3: delete(); break;
                case 4: search(); break;
                case 5: list(); break;
                case 6: highestSalary(); break;
                case 7: averageSalary(); break;
                case 8: departmentFilter(); break;
                case 9:
                    System.out.println("Thank you!");
                    return;
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }

    // 1. Add Employee
    static void add() {

        System.out.print("Enter ID: ");
        int id = sc.nextInt();
        sc.nextLine();

        System.out.print("Enter Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Department: ");
        String department = sc.nextLine();

        System.out.print("Enter Salary: ");
        double salary = sc.nextDouble();

        employees.add(new Employee(id, name, department, salary));

        System.out.println("Employee added!");
    }

    // 2. Update Employee
    static void update() {

        System.out.print("Enter ID: ");
        int id = sc.nextInt();
        sc.nextLine();

        for (Employee e : employees) {

            if (e.id == id) {

                System.out.print("Enter new name: ");
                e.name = sc.nextLine();

                System.out.print("Enter new department: ");
                e.department = sc.nextLine();

                System.out.print("Enter new salary: ");
                e.salary = sc.nextDouble();

                System.out.println("Employee updated!");
                return;
            }
        }

        System.out.println("Employee not found!");
    }

    // 3. Delete Employee
    static void delete() {

        System.out.print("Enter ID: ");
        int id = sc.nextInt();

        for (Employee e : employees) {

            if (e.id == id) {
                employees.remove(e);
                System.out.println("Employee deleted!");
                return;
            }
        }

        System.out.println("Employee not found!");
    }

    // 4. Search Employee
    static void search() {

        System.out.print("Enter ID: ");
        int id = sc.nextInt();

        for (Employee e : employees) {

            if (e.id == id) {
                e.displayEmployee();
                return;
            }
        }

        System.out.println("Employee not found!");
    }

    // 5. List Employees
    static void list() {

        if (employees.isEmpty()) {
            System.out.println("No employees found!");
            return;
        }

        for (Employee e : employees) {
            e.displayEmployee();
        }
    }

    // 6. Highest Salary
    static void highestSalary() {

        if (employees.isEmpty()) {
            System.out.println("No employees found!");
            return;
        }

        Employee highest = employees.get(0);

        for (Employee e : employees) {

            if (e.salary > highest.salary) {
                highest = e;
            }
        }

        System.out.println("Highest Salary Employee:");
        highest.displayEmployee();
    }

    // 7. Average Salary
    static void averageSalary() {

        if (employees.isEmpty()) {
            System.out.println("No employees found!");
            return;
        }

        double total = 0;

        for (Employee e : employees) {
            total += e.salary;
        }

        double average = total / employees.size();

        System.out.println("Average Salary: " + average);
    }

    // 8. Department Filter
    static void departmentFilter() {

        sc.nextLine();

        System.out.print("Enter Department: ");
        String department = sc.nextLine();

        boolean found = false;

        for (Employee e : employees) {

            if (e.department.equalsIgnoreCase(department)) {
                e.displayEmployee();
                found = true;
            }
        }

        if (!found) {
            System.out.println("No employees found in this department!");
        }
    }
}

