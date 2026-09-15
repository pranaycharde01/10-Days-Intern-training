students = []


def add_student():
    name = input("Enter student name: ")
    age = int(input("Enter age: "))
    department = input("Enter department: ")
    marks = float(input("Enter marks: "))

    student = {
        "name": name,
        "age": age,
        "department": department,
        "marks": marks
    }

    students.append(student)

    print("Student added successfully!")

def display_students():

    print("\nStudent List:")

    if len(students) == 0:
        print("No students found!")
        return

    for student in students:
        print("Name:", student["name"])
        print("Age:", student["age"])
        print("Department:", student["department"])
        print("Marks:", student["marks"])
        print("--------------------")
        
def search_student():
    name = input("Enter student name to search: ")

    for student in students:
        if student["name"].lower() == name.lower():
            print("Student found!")
            print(student)
            return

    print("Student not found!")


while True:

    print("\n===== Student Management System =====")
    print("1. Add Student")
    print("2. Display Students")
    print("3. Search Student")
    print("4. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        add_student()

    elif choice == "2":
        display_students()

    elif choice == "3":
        search_student()

    elif choice == "4":
        print("Program ended.")
        break

    else:
        print("Invalid choice!")