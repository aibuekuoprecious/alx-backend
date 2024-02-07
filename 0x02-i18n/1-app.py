#!/usr/bin/env python3
"""
A Basic flask application
"""
from flask import Flask, render_template
from flask_babel import Babel


class Config(object):
    """
    Application configuration class
    """

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


def create_app() -> Flask:
    """
    Creates and configures the Flask application

    Returns:
        Flask: The configured Flask application
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    Babel(app)

    @app.route("/", strict_slashes=False)
    def index() -> str:
        """
        Renders a basic html template

        Returns:
            str: The rendered HTML template
        """
        return render_template("1-index.html")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
