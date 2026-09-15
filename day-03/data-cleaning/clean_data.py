import pandas as pd
import numpy as np

# Read dataset
data = pd.read_csv("../dataset/facility_data.csv")

print("Original Records:", len(data))

# Check missing values
print("\nMissing Values:")
print(data.isnull().sum())

# Check duplicates
print("\nDuplicate Records:", data.duplicated().sum())

# Convert date
data["inspection_date"] = pd.to_datetime(data["inspection_date"])

# Convert numeric columns
data["cleanliness_score"] = pd.to_numeric(
    data["cleanliness_score"], errors="coerce"
)

data["odor_score"] = pd.to_numeric(
    data["odor_score"], errors="coerce"
)

# Invalid cleanliness scores
invalid_cleanliness = (
    (data["cleanliness_score"] < 0) |
    (data["cleanliness_score"] > 10)
)

print("\nInvalid Cleanliness Scores:", invalid_cleanliness.sum())

# Replace invalid values with NaN
data.loc[invalid_cleanliness, "cleanliness_score"] = np.nan

# Fill missing cleanliness scores with median
median_score = data["cleanliness_score"].median()

data["cleanliness_score"] = data["cleanliness_score"].fillna(
    median_score
)

# Remove duplicate records
data = data.drop_duplicates()

# Outlier detection using IQR
Q1 = data["footfall"].quantile(0.25)
Q3 = data["footfall"].quantile(0.75)

IQR = Q3 - Q1

lower_limit = Q1 - 1.5 * IQR
upper_limit = Q3 + 1.5 * IQR

outliers = data[
    (data["footfall"] < lower_limit) |
    (data["footfall"] > upper_limit)
]

print("\nFootfall Outliers:", len(outliers))

# Save cleaned dataset
data.to_csv(
    "cleaned_facility_data.csv",
    index=False
)

print("\nCleaned Records:", len(data))
print("Cleaned dataset saved successfully!")
