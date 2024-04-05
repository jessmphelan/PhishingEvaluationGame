
from dotenv import load_dotenv
import os

load_dotenv()


ENV_PATH = os.path.join(os.path.dirname(__file__), '.env')


load_dotenv(dotenv_path=ENV_PATH)


#OpenAI
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
ORGANIZATION = os.environ.get('ORGANIZATION_KEY')


