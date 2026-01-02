import pandas as pd
from sklearn.linear_model import LogisticRegression
import pickle

# Sample training data (you can replace with dataset later)
data = {
    "age": [25,45,60,35,50,65,40,30],
    "bp": [120,150,160,130,145,170,140,125],
    "sugar": [110,180,200,140,190,220,170,120],
    "heartRate": [70,95,105,85,100,110,90,75],
    "risk": [0,1,1,0,1,1,1,0]  # 0=Normal, 1=High
}

df = pd.DataFrame(data)

X = df[["age","bp","sugar","heartRate"]]
y = df["risk"]

model = LogisticRegression()
model.fit(X, y)

pickle.dump(model, open("model.pkl","wb"))
print("Model trained & saved")
