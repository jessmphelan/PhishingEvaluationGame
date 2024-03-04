import os
import json

email_path = "emails/llm/linkedin/"

files = os.listdir(email_path)
output = open("emails.json", 'w')
emails = []
for file in files:
	email = {}
	input_file = open(email_path + file, 'r', encoding="utf8" )
	
	output_string = ""
	# print(input_file.readlines())
	for line in input_file.readlines():
		output_string += line + "\n"

	email["email"] = output_string
	print(email)
	emails.append(email)

output.write(json.dumps(emails))
