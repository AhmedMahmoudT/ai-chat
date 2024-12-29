from flask import Flask, request, jsonify
import json
import ollama
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        # Load data from request.json file for testing purposes
        with open('request.json', 'r') as f:
            data = json.load(f)

        # Validate input
        if not data or 'input' not in data:
            return jsonify({"error": "Missing 'input' field in the request."}), 400

        user_input = data['input']['value']
        model_name = data['input']['model']
        messages = {
            'prompt':'answer',
            'role': 'user',
            'content': user_input,
            'images':['image.jpg']
        }

        # Generate response from the Ollama model
        model_response = ollama.chat(
            model=model_name,
            messages=[messages]
        )

        # Convert response to text if necessary
        if isinstance(model_response, str):
            # Response is already text, wrap it in a dictionary
            return jsonify({"response": model_response})
        elif isinstance(model_response, dict):
            # Response is a dictionary, return it directly
            return jsonify(model_response)
        else:
            # Assume response can be converted to a string
            return jsonify({"response": str(model_response)})

    except Exception as e:
        # Log error details
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
