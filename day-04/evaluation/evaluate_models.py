import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    mean_absolute_error,
    mean_squared_error
)

# Load predictions
data = pd.read_csv(
    "day-04/predictions/model_predictions.csv"
)

actual = data["Actual"]

models = {
    "Logistic Regression": data["Logistic_Regression"],
    "Decision Tree": data["Decision_Tree"]
}

for model_name, predictions in models.items():

    print("\n================================")
    print(model_name)
    print("================================")

    accuracy = accuracy_score(actual, predictions)
    precision = precision_score(actual, predictions)
    recall = recall_score(actual, predictions)
    f1 = f1_score(actual, predictions)

    confusion = confusion_matrix(actual, predictions)

    mae = mean_absolute_error(actual, predictions)

    mse = mean_squared_error(actual, predictions)

    rmse = mse ** 0.5

    print("Accuracy :", accuracy)
    print("Precision:", precision)
    print("Recall   :", recall)
    print("F1 Score :", f1)

    print("\nConfusion Matrix:")
    print(confusion)

    print("\nMAE :", mae)
    print("MSE :", mse)
    print("RMSE:", rmse)

print("\nEvaluation completed successfully!")
