from flask import Flask, request, jsonify
from textToSpeech import main

app = Flask(__name__)

@app.route('/generate-scolding', methods=['POST'])
def generate_scolding():
    data = request.json
    character = data.get('character')
    item = data.get('item')
    sentiment = data.get('sentiment')
    
    main(character, item, sentiment)
    return jsonify({"message": "Scolding generated successfully"})

if __name__ == '__main__':
    app.run(debug=True)