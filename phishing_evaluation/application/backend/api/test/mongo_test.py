from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client.phishing_game
emails = list(db.emails.find())
if emails:
    print("Emails found:", len(emails))
else:
    print("No emails found.")
