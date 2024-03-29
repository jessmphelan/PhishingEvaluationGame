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
    

    @app.route('/api/save_demographic', methods=['POST'])
    def save_demographic():
        data = request.get_json()

        # Extract data
        player_id = data.get('playerID')
        age = data.get('age')
        year = data.get('year')
        major = data.get('major')
        language = data.get('language')
        confidence = data.get('confidence')

        # Validation or additional processing can go here

        # Prepare document to insert into MongoDB
        demographic_document = {
            'playerID': player_id,
            'demographic_info': {
                'age': age,
                'year': year,
                'major': major,
                'language': language,
                'confidence': confidence,
            }
        }

        # Insert the document into the MongoDB collection
        try:
            mongo.db.demographics.insert_one(demographic_document)
            return jsonify({"message": "Demographic information saved successfully"}), 200
        except Exception as e:
            print(f"Error saving demographic information: {e}")
            return jsonify({"error": "Unable to save demographic information"}), 500
        
    # @app.route('/api/save_psychological_profile', methods=['POST'])
    # def save_psychological_profile():
    #     data = request.get_json()
    #     player_id = data.get('playerID')
    #     responses = data.get('responses')

    #     if not player_id or not responses:
    #         return jsonify({'error': 'Missing data'}), 400

    #     try:
    #         # Assuming you have a 'psychological_profiles' collection
    #         mongo.db.psychological_profiles.insert_one({
    #             'playerID': player_id,
    #             'NCS6_responses': responses
    #         })
    #         return jsonify({'message': 'Responses saved successfully'}), 200
    #     except Exception as e:
    #         print(f"Error saving psychological profile: {e}")
    #         return jsonify({'error': 'Unable to save responses'}), 500

    @app.route('/api/save_psychological_profile', methods=['POST'])
    def save_psychological_profile():
        data = request.get_json()
        player_id = data.get('playerID')
        responses = data.get('responses')
        test_type = data.get('testType')  # Differentiate between test types

        if not player_id or not responses or not test_type:
            return jsonify({'error': 'Missing data'}), 400

        try:
            # Insert into the 'psychological_profiles' collection with testType distinction
            mongo.db.psychological_profiles.insert_one({
                'playerID': player_id,
                test_type: responses  # Dynamically set the key based on testType
            })
            return jsonify({'message': f'{test_type} responses saved successfully'}), 200
        except Exception as e:
            print(f"Error saving {test_type} responses: {e}")
            return jsonify({'error': f'Unable to save {test_type} responses'}), 500

    
    @app.route('/api/save_response', methods=['POST'])
    @cross_origin()
    def save_response():
        print("Route hit!")
        data = request.json
        print("Received data: ", data)  

        email_id = data.get('emailId')
        user_response = data.get('response')
        player_id = data.get('playerID')
        #highlighted_text = user_response.get('highlightedText')

        response_document = {
            'playerID': player_id,
            'email_id': email_id,
            'response': user_response
        }

        if not email_id or not user_response or not player_id:
            return jsonify({"error": "Missing emailId, response, or playerID"}), 400

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
        player_id = request.args.get('playerID')
        if not player_id:
            return jsonify({'error': 'Missing playerID'}), 400
        
        user_responses = mongo.db.player_data.find({'playerID': player_id})
        email_labels = {email['email_id']: email for email in mongo.db.emails.find()}
        correct_count = 0
        total_count = 0

        print(f'Fetching user responses for playerID: {player_id}...')
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

    @app.route('/api/register_session', methods=['POST'])
    def register_session():
        data = request.get_json()
        player_id = data.get('playerID')
        study_mode = data.get('studyMode')
        user_agent = data.get('userAgent')

        # Check if the playerID already exists
        if mongo.db.sessions.find_one({"playerID": player_id}):
            return jsonify({"error": "Duplicate playerID, please generate a new one"}), 409

        # No duplicate, insert the new session
        mongo.db.sessions.insert_one({"playerID": player_id, "studyMode": study_mode, "userAgent": user_agent})
        print("Inserting new session id into db")
        return jsonify({"message": "Session registered successfully"}), 200
    

    @app.route('/api/save_participant_info', methods=['POST'])
    def save_participant_info():
        data = request.json
        player_id = data.get('playerID')
        email = data.get('email')
        attending = data.get('attending')
        enroll_raffle = data.get('enrollInRaffle')
        wish_to_receive_info = data.get('wishToReceiveInfo')

        participant_info = {
            'email' : email,
            'enrollInRaffle': enroll_raffle,
            'wishToReceiveInfo': wish_to_receive_info
        }

        if mongo.db.sessions.find_one({"playerID": player_id}):
            return jsonify({"error": "Duplicate playerID, please generate a new one"}), 409

        # No duplicate, insert the new session
        mongo.db.follow_ups.insert_one({"playerID": player_id, "participantInfo": participant_info})
        print("Inserting participant follow up info into db")


        response = {
            "status": "success",
            "message": "Participant information saved successfully."
        }
        return jsonify(response), 200