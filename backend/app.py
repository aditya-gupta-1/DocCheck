from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Import CORS
from validate_document import validate_document
  
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define upload folder and allowed file extensions
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png'}

# Ensure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Function to check if file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Home route for displaying the form
@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        # Retrieve the uploaded files
        document_file = request.files.get("document")
        template_file = request.files.get("template")

        # Validate the uploaded files
        if not document_file or not allowed_file(document_file.filename):
            return jsonify({"error": "Document file is required and must be a valid image (jpg, jpeg, png)."}), 400
        if not template_file or not allowed_file(template_file.filename):
            return jsonify({"error": "Template file is required and must be a valid image (jpg, jpeg, png)."}), 400

        # Secure filenames and save the files
        document_filename = secure_filename(document_file.filename)
        template_filename = secure_filename(template_file.filename)

        document_path = os.path.join(app.config['UPLOAD_FOLDER'], document_filename)
        template_path = os.path.join(app.config['UPLOAD_FOLDER'], template_filename)
        
        try:
            # Save the files to the server
            document_file.save(document_path)
            template_file.save(template_path)
        except Exception as e:
            return jsonify({"error": f"File saving error: {str(e)}"}), 500

        # Call the validation function
        try:
    # Step 1: Extract reference text from template image using EasyOCR
            import easyocr
            reader = easyocr.Reader(['en'])
            template_result = reader.readtext(template_path)
            reference_text = ' '.join([text[1] for text in template_result])

    # Step 2: Validate reference text isn't empty
            if not reference_text.strip():
                return jsonify({"error": "Failed to extract reference text from the template image."}), 400

    # Step 3: Pass extracted text into validator
            results = validate_document(document_path, template_path, reference_text)
    
            if results:
                return jsonify(results), 200
            else:
                return jsonify({"error": "An error occurred during document verification."}), 400

        except Exception as e:
            return jsonify({"error": f"Error during document validation: {str(e)}"}), 500

    # For GET requests, render the form
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
