from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this line for CORS support
import pickle
import librosa
import pandas as pd
from collections import Counter
import os
import wave
import math

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

# Load the trained model
def getModel(pickle_path):
    with open(pickle_path, 'rb') as f:
        return pickle.load(f)

model = getModel("myRandomForest.pkl")

# Function to chop audio and classify
def chop_and_classify_audio(filename, folder):
    handle = wave.open(filename, 'rb')
    frame_rate = handle.getframerate()
    n_frames = handle.getnframes()
    window_size = 2 * frame_rate
    num_secs = int(math.ceil(n_frames/frame_rate))
    #print filename
    last_number_frames = 0

    # Slicing Audio file
    for i in range(num_secs):
        shortfilename = filename.split(".")[0]
        snippetfilename = folder + '/' + shortfilename + 'snippet' + str(i+1) + '.wav'
        #print snippetfilename
        snippet = wave.open(snippetfilename ,'wb')
        snippet.setnchannels(2)
        snippet.setsampwidth(handle.getsampwidth())
        snippet.setframerate(frame_rate)
        #snippet.setsampwidth(2)
        #snippet.setframerate(11025)
        snippet.setnframes(handle.getnframes())
        snippet.writeframes(handle.readframes(window_size))
        handle.setpos(handle.tell() - 1 * frame_rate)
        #print snippetfilename, ":", snippet.getnchannels(), snippet.getframerate(), snippet.getnframes(), snippet.getsampwidth()

        #The last audio slice might be less than a second, if this is the case, we don't want to include it because it will not fit into our matrix
        if last_number_frames < 1:
            last_number_frames = snippet.getnframes()
        elif snippet.getnframes() != last_number_frames:
            #print "this file doesnt have the same frame size!, remaming file"
            os.rename(snippetfilename, snippetfilename+".bak")
        snippet.close()

        # Perform classification
       # Perform classification
        predictions = []
        for i, filename in enumerate(os.listdir('temp_snippets/')):
            last_number_frames = -1
            if filename.endswith(".wav"):
        #print filename
                audiofile, sr = librosa.load("temp_snippets/"+filename)
                fingerprint = librosa.feature.mfcc(y=audiofile, sr=sr, n_mfcc=1)
                x = pd.DataFrame(fingerprint, dtype = 'float32')
                print("Fingerprint shape:", fingerprint.shape)
                print("Fingerprint data type:", fingerprint.dtype)
                prediction = model.predict(fingerprint)
                #print prediction
                predictions.append(prediction[0])

        from collections import Counter
        data = Counter(predictions)
        print(data.most_common())  # Returns all unique items and their counts
        print(data.most_common(1))
                    
       


    # handle.close()

    # Delete the original uploaded file and snippets
    os.remove(filename)
    for snippet_file in os.listdir(folder):
        os.remove(os.path.join(folder, snippet_file))

    return predictions

# Endpoint for uploading, chopping, and classifying audio
@app.route('/classify_chop', methods=['POST'])
def upload_and_classify():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Save the uploaded file
        filename = 'uploaded.wav'
        file.save(filename)

        # Chop and classify audio
        predictions = chop_and_classify_audio(filename, 'temp_snippets')

        # Count predictions
        data = Counter(predictions)
        result = data.most_common(1)[0][0]

        return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
