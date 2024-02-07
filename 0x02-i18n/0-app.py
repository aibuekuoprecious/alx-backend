#!/usr/bin/env python3

from flask import Flask, render_template

app = Flask(__name__)

"""
This module is responsible for running the Flask application.
"""

@app.route('/', strict_slashes=False)
def index() -> str:
    """
    Renders the index.html template.

    Returns:
        str: The rendered HTML content.
    """
    return render_template('0-index.html')

if __name__ == '__main__':
    app.run()
