from flask import request, jsonify, render_template
from flask_pymongo import PyMongo
import os
from pathlib import Path
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
import random


def init_routes(app, mongo):
    @app.route('/')
    @cross_origin()
    def index():
        collections = mongo.db.list_collection_names()
        return render_template('index.html', collections=collections)


    @app.route('/add_email')
    @cross_origin()
    def add_email():
        email = {
            "subject": "Test Email",
            "content": "This is a test email.",
            "type": "Legitimate",
            "source": "Human"
        }
        mongo.db.emails.insert_one(email)
        return "Email added!"
    
    @app.route('/add_all_emails')
    @cross_origin()
    def add_all_emails():
        directory_path = Path(__file__).parent.parent / 'data' / 'emails'/ 'llm' / 'linkedin'

        email_id_counter = 1

        for file in directory_path.iterdir():
            if file.is_file():
                with open(file, 'r') as f:
                    content = f.read()

                email = {
                    "email_id": f"email_{email_id_counter}",
                    "content": content,
                    "type": "Phishing Email",
                    "source": "LLM"
                }

                
                mongo.db.emails.insert_one(email)

            
                email_id_counter += 1

        return f"{email_id_counter - 1} emails added!"
    
   
    @app.route('/api/next_email')
    @cross_origin()
    def get_next_email():
        try:
            emails = list(mongo.db.emails.find())
            if emails:
                email = random.choice(emails)
                email['emailId'] = email.get('email_id', 'defaultEmailId')
                #email['emailId'] = str(email['_id'])  # Convert ObjectId to string and include it in the response
                del email['_id']  # Remove the original '_id' field
                return jsonify(email)
            else:
                return jsonify({"error": "No emails available"}), 404
        except Exception as e:
            print(f"Error fetching email: {e}")
            return jsonify({"error": "Internal server error"}), 500


    @app.route('/get_emails')
    @cross_origin()
    def get_emails():
        emails = mongo.db.emails.find()
        return str(list(emails))

    
    @app.route('/api/save_response', methods=['POST'])
    @cross_origin()
    def save_response():
        print("Route hit!")
        data = request.json
        print("Received data: ", data)  
        email_id = data.get('emailId')
        user_response = data.get('response')

        response_document = {
             'email_id': email_id,
             'response': user_response
        }

        if not email_id or not user_response:
            return jsonify({"error": "Missing emailId or response"}), 400

        try:
            print("Attempting to insert:", response_document)
            mongo.db.player_data.insert_one(response_document)
            print("Insert successful")
            return jsonify({"message": "Response saved successfully"})
        except Exception as e:
            print(f"Error saving response: {e}")
            return jsonify({"error": "Internal server error"}), 500
        

    @app.route('/api/user_responses', methods=['GET'])
    def get_user_responses():
        user_responses = mongo.db.player_data.find()
        correct_count = 0
        total_count = 0

        for response in user_responses:
            total_count += 1
            if 'email_id' in response:
                # 'email_id' is our custom identifier field that we're using to retrieve the email name, not the MongoDB '_id' field
                email = mongo.db.emails.find_one({"email_id": response['email_id']})
                if email and 'emailType' in response and 'evaluatorType' in response:
                    is_correct_type = response['emailType'] == email.get('type')
                    is_correct_source = response['evaluatorType'] == email.get('source')
                    
                    if is_correct_type and is_correct_source:
                        correct_count += 1
            else:
                print("No emailId found in response:", response)

        # Calculate score
        if total_count > 0:
            score = (correct_count / total_count) * 100
        else:
            score = 0

        return jsonify({"score": score})
