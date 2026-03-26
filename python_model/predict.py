import sys
import json

try:
    data = json.loads(sys.argv[1])

    glucose = float(data[0])
    bmi = float(data[1])
    age = float(data[2])

    # ✅ Simple prediction logic
    if glucose > 140 or bmi > 30 or age > 45:
        print("Diabetic")
    else:
        print("Not Diabetic")

except:
    print("Error")