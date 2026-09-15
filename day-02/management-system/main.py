import json


FILE_NAME = "employees.json"


def load_employees():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)

    except FileNotFoundError:
        return []

    except json.JSONDecodeError:
        print("Invalid JSON file!")
        return []


def save_employees(employees):
    with open(FILE_NAME, "w") as file:
        json.dump(employees, file, indent=4)


def add_employee(employees):

    try:
        emp_id = int(input("Enter ID: "))
        name = input("Enter name: ")
        department = input("Enter department: ")
        salary = float(input("Enter salary: "))

        employee = {
            "id": emp_id,
            "name": name,
            "department": department,
            "salary": salary
        }

        employees.append(employee)
        save_employees(employees)

        print("Employee added successfully!")

    except ValueError:
        print("Please enter valid data!")


def display_employees(employees):

    if len(employees) == 0:
        print("No employees found!")
        return

    for employee in employees:
        print(employee)


def search_employee(employees):

    try:
        emp_id = int(input("Enter employee ID: "))

        for employee in employees:

            if employee["id"] == emp_id:
                print("Employee found:")
                print(employee)
                return

        print("Employee not found!")

    except ValueError:
        print("Invalid ID!")


def delete_employee(employees):

    try:
        emp_id = int(input("Enter employee ID: "))

        for employee in employees:

            if employee["id"] == emp_id:
                employees.remove(employee)
                save_employees(employees)

                print("Employee deleted!")
                return

        print("Employee not found!")

    except ValueError:
        print("Invalid ID!")


def update_employee(employees):

    try:
        emp_id = int(input("Enter employee ID: "))

        for employee in employees:

            if employee["id"] == emp_id:

                employee["name"] = input("Enter new name: ")
                employee["department"] = input("Enter new department: ")
                employee["salary"] = float(input("Enter new salary: "))

                save_employees(employees)

                print("Employee updated!")
                return

        print("Employee not found!")

    except ValueError:
        print("Invalid data!")


def filter_department(employees):

    department = input("Enter department: ")

    found = False

    for employee in employees:

        if employee["department"].lower() == department.lower():
            print(employee)
            found = True

    if not found:
        print("No employees found!")


def sort_salary(employees):

    if len(employees) == 0:
        print("No employees found!")
        return

    sorted_employees = sorted(
        employees,
        key=lambda employee: employee["salary"]
    )

    for employee in sorted_employees:
        print(employee)


def statistics(employees):

    if len(employees) == 0:
        print("No employees found!")
        return

    salaries = []

    for employee in employees:
        salaries.append(employee["salary"])

    print("Total Employees:", len(employees))
    print("Average Salary:", sum(salaries) / len(salaries))
    print("Minimum Salary:", min(salaries))
    print("Maximum Salary:", max(salaries))


employees = load_employees()


while True:

    print("\n===== Employee Management System =====")
    print("1. Add Employee")
    print("2. Display Employees")
    print("3. Update Employee")
    print("4. Delete Employee")
    print("5. Search Employee")
    print("6. Filter by Department")
    print("7. Sort by Salary")
    print("8. Statistics")
    print("9. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        add_employee(employees)

    elif choice == "2":
        display_employees(employees)

    elif choice == "3":
        update_employee(employees)

    elif choice == "4":
        delete_employee(employees)

    elif choice == "5":
        search_employee(employees)

    elif choice == "6":
        filter_department(employees)

    elif choice == "7":
        sort_salary(employees)

    elif choice == "8":
        statistics(employees)

    elif choice == "9":
        print("Program ended.")
        break

    else:
        print("Invalid choice!")
        