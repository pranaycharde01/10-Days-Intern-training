import pandas as pd
import numpy as np

# Read cleaned dataset
data = pd.read_csv("../data-cleaning/cleaned_facility_data.csv")

print("===== BASIC INFORMATION =====")

print("Total Facilities:", len(data))
print("Locations:", data["location"].nunique())

print("\n===== NUMPY ANALYSIS =====")

cleanliness = data["cleanliness_score"].to_numpy()

print("Average Cleanliness:", np.mean(cleanliness))
print("Minimum Cleanliness:", np.min(cleanliness))
print("Maximum Cleanliness:", np.max(cleanliness))

print("\n===== PANDAS ANALYSIS =====")

print("\nAverage Scores by Location:")
print(
    data.groupby("location")["cleanliness_score"]
    .mean()
    .sort_values(ascending=False)
)

print("\nAverage Complaints by Location:")
print(
    data.groupby("location")["complaints"]
    .mean()
    .sort_values(ascending=False)
)

print("\nAverage Footfall by Location:")
print(
    data.groupby("location")["footfall"]
    .mean()
    .sort_values(ascending=False)
)

print("\n===== WASTE LEVEL ANALYSIS =====")

print(
    data.groupby("waste_level")[
        ["cleanliness_score", "complaints"]
    ].mean()
)

print("\n===== WATER AVAILABILITY ANALYSIS =====")

print(
    data.groupby("water_availability")[
        ["cleanliness_score", "complaints"]
    ].mean()
)

print("\n===== CORRELATION =====")

correlation = data["footfall"].corr(data["complaints"])

print("Footfall vs Complaints:", correlation)

print("\n===== TOP 5 FACILITIES BY COMPLAINTS =====")

print(
    data.nlargest(5, "complaints")[
        ["facility_id", "location", "complaints", "footfall"]
    ]
)

print("\n===== ANALYSIS COMPLETED =====")
