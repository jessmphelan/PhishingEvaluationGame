"""
This allows us to load our environment variables from a .env file located in the same directory as the config.py file. 
By calling load_dotenv() twice, it first attempts to load environment variables from any .env file found in the default location, 
then specifically loads from the .env file at the path constructed with ENV_PATH. This ensures that the environment variables 
OPENAI_API_KEY and ORGANIZATION are accessible in your Python script
"""



from dotenv import load_dotenv
import os

load_dotenv()


ENV_PATH = os.path.join(os.path.dirname(__file__), '.env')


load_dotenv(dotenv_path=ENV_PATH)


#OpenAI
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
ORGANIZATION = os.environ.get('ORGANIZATION_KEY')


