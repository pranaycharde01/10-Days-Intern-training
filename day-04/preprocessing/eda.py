import pandas as pd

# Read processed dataset
data = pd.read_csv("day-04/dataset/processed_facility_data.csv")

print("===== EDA: FACILITY HYGIENE DATA =====")

# Basic information
print("\n===== DATA SHAPE =====")
print("Rows:", data.shape[0])
print("Columns:", data.shape[1])


# Average values by hygiene risk
print("\n===== AVERAGE VALUES BY HYGIENE RISK =====")

risk_analysis = data.groupby("hygiene_risk")[
    [
        "cleanliness_score",
        "odor_score",
        "waste_level",
        "complaints",
        "footfall",
        "hours_since_cleaning"
    ]
].mean()

print(risk_analysis)


# Low risk facilities
print("\n===== LOW RISK FACILITIES =====")
print(data[data["hygiene_risk"] == 0].head())


# High risk facilities
print("\n===== HIGH RISK FACILITIES =====")
print(data[data["hygiene_risk"] == 1].head())


# Correlation
print("\n===== CORRELATION WITH HYGIENE RISK =====")

correlation = data.corr()

print(correlation["hygiene_risk"].sort_values(ascending=False))


# Important observations
print("\n===== KEY OBSERVATIONS =====")

print("1. Higher cleanliness scores generally indicate lower hygiene risk.")
print("2. Higher odor scores are associated with higher hygiene risk.")
print("3. Higher waste levels are associated with higher hygiene risk.")
print("4. More complaints generally indicate higher hygiene risk.")
print("5. More hours since cleaning can increase hygiene risk.")


print("\nEDA completed successfully!")
