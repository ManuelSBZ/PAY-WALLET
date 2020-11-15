from flask_cors import CORS
import os
cors = CORS()

soap_uri = f"http://{os.getenv('HOST')}:{os.getenv('PORT')}{os.getenv('URI')}"