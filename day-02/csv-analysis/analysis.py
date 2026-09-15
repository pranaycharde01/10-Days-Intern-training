import csv

with open("data.csv", "r") as file:

    data = list(csv.DictReader(file))

print("Total Records:", len(data))


# Missing values
missing = 0

for row in data:
    for value in row.values():
        if value == "":
            missing += 1

print("Missing Values:", missing)


# Duplicates
duplicates = 0

for i in range(len(data)):
    for j in range(i + 1, len(data)):
        if data[i] == data[j]:
            duplicates += 1

print("Duplicate Records:", duplicates)


# Marks statistics
marks = []

for row in data:
    if row["marks"] != "":
        marks.append(float(row["marks"]))

print("Average Marks:", sum(marks) / len(marks))
print("Minimum Marks:", min(marks))
print("Maximum Marks:", max(marks))


# Department-wise statistics
departments = {}

for row in data:

    department = row["department"]
    mark = float(row["marks"])

    if department not in departments:
        departments[department] = []

    departments[department].append(mark)


print("\nDepartment-wise Statistics:")

for department in departments:

    values = departments[department]

    average = sum(values) / len(values)

    print(
        department,
        "Count:", len(values),
        "Average:", average,
        "Minimum:", min(values),
        "Maximum:", max(values)
    )
    