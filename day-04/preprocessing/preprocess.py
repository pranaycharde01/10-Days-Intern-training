import pandas as pd

# Read dataset
data = pd.read_csv("day-04/dataset/facility_hygiene_data.csv")

print("===== DATASET INFORMATION =====")

# Total records
print("Total Records:", len(data))

# Column names
print("\nColumns:")
print(data.columns.tolist())


# Check missing values
print("\n===== MISSING VALUES =====")
print(data.isnull().sum())


# Check duplicate records
print("\n===== DUPLICATES =====")
print("Duplicate Records:", data.duplicated().sum())


# Basic statistics
print("\n===== BASIC STATISTICS =====")
print(data.describe())


# Check hygiene risk distribution
print("\n===== HYGIENE RISK DISTRIBUTION =====")
print(data["hygiene_risk"].value_counts())


# Feature Engineering
# Convert waste level into numbers
data["waste_level"] = data["waste_level"].map({
    "Low": 0,
    "Medium": 1,
    "High": 2
})


print("\n===== AFTER FEATURE ENGINEERING =====")
print(data.head())


# Save processed dataset
data.to_csv(
    "day-04/dataset/processed_facility_data.csv",
    index=False
)


print("\nProcessed dataset saved successfully!")
