import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score


# Read processed dataset
data = pd.read_csv(
    "day-04/dataset/processed_facility_data.csv"
)


# Features
X = data[
    [
        "cleanliness_score",
        "odor_score",
        "waste_level",
        "complaints",
        "footfall",
        "hours_since_cleaning"
    ]
]


# Target
y = data["hygiene_risk"]


# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print("===== TRAIN TEST SPLIT =====")
print("Training Records:", len(X_train))
print("Testing Records:", len(X_test))


# =========================
# LOGISTIC REGRESSION
# =========================

logistic_model = LogisticRegression(
    max_iter=1000
)

logistic_model.fit(X_train, y_train)

logistic_predictions = logistic_model.predict(X_test)

logistic_accuracy = accuracy_score(
    y_test,
    logistic_predictions
)


print("\n===== LOGISTIC REGRESSION =====")
print("Accuracy:", logistic_accuracy)


# =========================
# DECISION TREE
# =========================

tree_model = DecisionTreeClassifier(
    random_state=42,
    max_depth=4
)

tree_model.fit(X_train, y_train)

tree_predictions = tree_model.predict(X_test)

tree_accuracy = accuracy_score(
    y_test,
    tree_predictions
)


print("\n===== DECISION TREE =====")
print("Accuracy:", tree_accuracy)


# =========================
# MODEL COMPARISON
# =========================

print("\n===== MODEL COMPARISON =====")

if logistic_accuracy > tree_accuracy:
    print("Logistic Regression performed better.")
elif tree_accuracy > logistic_accuracy:
    print("Decision Tree performed better.")
else:
    print("Both models have the same accuracy.")


# Save predictions
predictions = pd.DataFrame({
    "Actual": y_test.values,
    "Logistic_Regression": logistic_predictions,
    "Decision_Tree": tree_predictions
})

predictions.to_csv(
    "day-04/predictions/model_predictions.csv",
    index=False
)


print("\nPredictions saved successfully!")
