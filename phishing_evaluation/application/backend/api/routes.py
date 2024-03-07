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
            "type": "Benign Email",
            "source": "Human"
        }
        mongo.db.emails.insert_one(email)
        return "Email added!"
    
    @app.route('/add_llm_emails')
    @cross_origin()
    def add_llm_emails():
        directory_path = Path(__file__).parent.parent / 'data' / 'emails'/ 'llm' / 'kaggle'

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
    
    @app.route('/add_benign_emails')
    @cross_origin()
    def add_benign_emails():
        directory_path = Path(__file__).parent.parent / 'data' / 'emails'/ 'human' / 'benign'

        email_id_counter = 26

        for file in directory_path.iterdir():
            if file.is_file():
                with open(file, 'r') as f:
                    content = f.read()

                email = {
                    "email_id": f"email_{email_id_counter}",
                    "content": content,
                    "type": "Benign Email",
                    "source": "Human"
                }

                
                mongo.db.emails.insert_one(email)

            
                email_id_counter += 1

        return f"{email_id_counter - 1} emails added!"
    
    @app.route('/add_phishing_emails')
    @cross_origin()
    def add_phishing_emails():
        directory_path = Path(__file__).parent.parent / 'data' / 'emails'/ 'human' / 'phishing'

        email_id_counter = 40

        for file in directory_path.iterdir():
            if file.is_file():
                with open(file, 'r') as f:
                    content = f.read()

                email = {
                    "email_id": f"email_{email_id_counter}",
                    "content": content,
                    "type": "Phishing Email",
                    "source": "Human"
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
        email_labels = {email['email_id']: email for email in mongo.db.emails.find()}
        correct_count = 0
        total_count = 0

        print('Fetching user responses...')
        for response in user_responses:
            total_count += 1
            print(f'Response #{total_count}: {dumps(response)}')

            if 'email_id' in response:
                print(f"Querying for email_id: {response['email_id']}")
                email = email_labels.get(response['email_id'])
                if email and 'response' in response and 'type' in response['response']:
                    response_type = response['response']['type'].strip().lower()  
                    email_type = email.get('type', '').strip().lower()  
                    
                    is_correct_type = response_type == email_type
                    print(f"Correct Type: {is_correct_type}")

                    if is_correct_type:
                        correct_count += 1
                    else:
                        print(f"Type mismatch: Response type '{response_type}' vs Email type '{email_type}'")
                        
                    if 'source' in response['response']:
                        response_source = response['response']['source'].strip().lower()  
                        email_source = email.get('source', '').strip().lower()  
                        is_correct_source = response_source == email_source
                        print(f"Correct Source: {is_correct_source}")
                        if not is_correct_source:
                            print(f"Source mismatch: Response source '{response_source}' vs Email source '{email_source}'")
                else:
                    print(f"No email found for email_id: {response['email_id']}")
            else:
                print(f"No emailId found in response #{total_count}: {dumps(response)}")

        print(f"Total count: {total_count}, Correct count: {correct_count}")  

        # Calculate score
        score = (correct_count / total_count) * 100 if total_count > 0 else 0
        score = round(score)
        return jsonify({"score": score})
