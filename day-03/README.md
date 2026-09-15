# Day 3 — Data Analysis & Python for AI/ML

## Objective

The objective of this task was to inspect, clean, analyze and visualize a facility dataset using Python, NumPy, Pandas and Matplotlib.

## Dataset

The dataset contains facility information with the following fields:

* facility_id
* location
* cleanliness_score
* odor_score
* waste_level
* water_availability
* footfall
* complaints
* inspection_date

The original dataset contained **52 records**.

## Data Cleaning

The dataset was checked for:

* Missing values
* Duplicate records
* Invalid values
* Outliers

### Cleaning Results

* Original records: **52**
* Missing cleanliness values: **1**
* Duplicate records: **1**
* Invalid cleanliness score: **1**
* Footfall outliers detected: **3**
* Final cleaned records: **51**

The missing and invalid cleanliness values were handled using the median cleanliness score. The duplicate record was removed.

The footfall outliers were identified using the **IQR (Interquartile Range)** method.

## Analysis

NumPy and Pandas were used to calculate statistics and analyze the dataset.

### Basic Statistics

* Average cleanliness score: **6.73**
* Minimum cleanliness score: **2**
* Maximum cleanliness score: **10**
* Number of locations: **7**

## Key Insights

### 1. Pune has the highest cleanliness score

Pune has an average cleanliness score of approximately **9.14**, while Mumbai has the lowest average score of approximately **3.71**.

### 2. Mumbai has the highest number of complaints

Mumbai has an average of **89 complaints**, which is the highest among all locations. It also has the highest average footfall of approximately **1471**.

### 3. Low waste levels are associated with better cleanliness

Facilities with low waste levels have an average cleanliness score of approximately **8.59** and only about **8.18 complaints**.

Facilities with high waste levels have an average cleanliness score of **4.00** and approximately **72.64 complaints**.

### 4. Water availability is associated with better facility conditions

Facilities with water availability have an average cleanliness score of approximately **7.76**, compared with **4.00** for facilities without water availability.

### 5. Footfall and complaints have a strong relationship

The correlation between footfall and complaints is approximately **0.89**, showing a strong positive relationship in this dataset.

## Visualizations

The following visualizations were created:

1. Average Cleanliness by Location — Bar Chart
2. Average Complaints by Location — Bar Chart
3. Distribution of Cleanliness Scores — Histogram
4. Footfall vs Complaints — Scatter Plot
5. Complaints Over Time — Line Chart

## Tools and Technologies

* Python
* NumPy
* Pandas
* Matplotlib
* CSV

## Project Structure

```text
day-03/
├── dataset/
│   └── facility_data.csv
│
├── data-cleaning/
│   ├── clean_data.py
│   └── cleaned_facility_data.csv
│
├── analysis/
│   └── analyze_data.py
│
├── visualizations/
│   ├── visualizations.py
│   ├── bar_cleanliness_by_location.png
│   ├── bar_complaints_by_location.png
│   ├── histogram_cleanliness.png
│   ├── scatter_footfall_complaints.png
│   └── line_complaints_over_time.png
│
└── README.md
```

## Conclusion

The analysis demonstrates how Python can be used to clean real-world data, identify data quality problems, calculate useful statistics and create visualizations.

The results show that cleanliness, waste level, water availability, footfall and complaints are important factors when evaluating facility conditions.

