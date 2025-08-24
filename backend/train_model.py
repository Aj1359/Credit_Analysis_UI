import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.metrics import accuracy_score, roc_auc_score, f1_score
import joblib
import os

# ==== 1. Load Data ====
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "features_merged.csv")
df = pd.read_csv(DATA_PATH)

# Assume df has columns: ['ticker','date','feature1','feature2',...,'label']
# 'label' = 0/1 credit risk outcome
X = df.drop(columns=["ticker","date","label"])
y = df["label"]

# ==== 2. Train/Test Split ====
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Normalize features (optional, good for LR, NN)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ==== 3. Candidate Models ====
models = {
    "LogisticRegression": LogisticRegression(max_iter=1000, class_weight="balanced"),
    "RandomForest": RandomForestClassifier(n_estimators=200, max_depth=8, random_state=42, class_weight="balanced"),
    "XGBoost": XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6, subsample=0.8, colsample_bytree=0.8, random_state=42, eval_metric="logloss"),
    "LightGBM": LGBMClassifier(n_estimators=300, learning_rate=0.05, max_depth=-1, random_state=42, class_weight="balanced")
}

results = {}
best_score = -1
best_model = None
best_name = None

# ==== 4. Train & Evaluate ====
for name, model in models.items():
    if name == "LogisticRegression":
        model.fit(X_train_scaled, y_train)
        preds = model.predict(X_test_scaled)
        probs = model.predict_proba(X_test_scaled)[:,1]
    else:
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        probs = model.predict_proba(X_test)[:,1]

    acc = accuracy_score(y_test, preds)
    auc = roc_auc_score(y_test, probs)
    f1 = f1_score(y_test, preds)

    results[name] = {"accuracy": acc, "roc_auc": auc, "f1": f1}

    if auc > best_score:
        best_score = auc
        best_model = model
        best_name = name

# ==== 5. Save Best Model + Scaler ====
print("Results:", results)
print(f"✅ Best Model: {best_name} (ROC-AUC={best_score:.4f})")

joblib.dump(best_model, os.path.join(os.path.dirname(__file__), "best_model.pkl"))
joblib.dump(scaler, os.path.join(os.path.dirname(__file__), "scaler.pkl"))
