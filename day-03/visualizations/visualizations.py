import pandas as pd
import matplotlib.pyplot as plt

# Read cleaned dataset
data = pd.read_csv("../data-cleaning/cleaned_facility_data.csv")


# 1. Bar Chart - Average Cleanliness by Location
cleanliness = data.groupby("location")["cleanliness_score"].mean()

cleanliness.plot(kind="bar")

plt.title("Average Cleanliness by Location")
plt.xlabel("Location")
plt.ylabel("Average Cleanliness Score")
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("bar_cleanliness_by_location.png")
plt.close()


# 2. Bar Chart - Average Complaints by Location
complaints = data.groupby("location")["complaints"].mean()

complaints.plot(kind="bar")

plt.title("Average Complaints by Location")
plt.xlabel("Location")
plt.ylabel("Average Complaints")
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("bar_complaints_by_location.png")
plt.close()


# 3. Histogram - Cleanliness Scores
data["cleanliness_score"].plot(
    kind="hist",
    bins=8
)

plt.title("Distribution of Cleanliness Scores")
plt.xlabel("Cleanliness Score")
plt.ylabel("Number of Facilities")
plt.tight_layout()
plt.savefig("histogram_cleanliness.png")
plt.close()


# 4. Scatter Plot - Footfall vs Complaints
plt.scatter(
    data["footfall"],
    data["complaints"]
)

plt.title("Footfall vs Complaints")
plt.xlabel("Footfall")
plt.ylabel("Complaints")
plt.tight_layout()
plt.savefig("scatter_footfall_complaints.png")
plt.close()


# 5. Line Chart - Complaints Over Time
data["inspection_date"] = pd.to_datetime(data["inspection_date"])

daily_complaints = data.groupby(
    "inspection_date"
)["complaints"].sum()

daily_complaints.plot(
    kind="line",
    marker="o"
)

plt.title("Complaints Over Time")
plt.xlabel("Inspection Date")
plt.ylabel("Complaints")
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("line_complaints_over_time.png")
plt.close()


print("All 5 visualizations created successfully!")
