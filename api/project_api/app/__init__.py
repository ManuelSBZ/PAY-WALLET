def create_app(configfile):
    
    from flask import Flask
    app = Flask(__name__)
    app.config.from_pyfile(configfile)
    from flask_cors import CORS
    cors = CORS(app=app)

    from .api import api
    app.register_blueprint(api)
    

    return app

