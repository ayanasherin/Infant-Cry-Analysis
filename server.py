from flask import Flask, request, jsonify
from flask_cors import CORS  
import pickle
import librosa
import pandas as pd
from collections import Counter
import os
import wave
import math

app = Flask(__name__)
CORS(app)  

def getModel(pickle_path):
    with open(pickle_path, 'rb') as f:
        return pickle.load(f)

model = getModel("myRandomForest.pkl")

def chop_and_classify_audio(filename, folder):
    handle = wave.open(filename, 'rb')
    frame_rate = handle.getframerate()
    n_frames = handle.getnframes()
    window_size = 2 * frame_rate
    num_secs = int(math.ceil(n_frames/frame_rate))
    last_number_frames = 0

    for i in range(num_secs):
        shortfilename = filename.split(".")[0]
        snippetfilename = folder + '/' + shortfilename + 'snippet' + str(i+1) + '.wav'
        snippet = wave.open(snippetfilename ,'wb')
        snippet.setnchannels(2)
        snippet.setsampwidth(handle.getsampwidth())
        snippet.setframerate(frame_rate)
       
        snippet.setnframes(handle.getnframes())
        snippet.writeframes(handle.readframes(window_size))
        handle.setpos(handle.tell() - 1 * frame_rate)

        if last_number_frames < 1:
            last_number_frames = snippet.getnframes()
        elif snippet.getnframes() != last_number_frames:
            os.rename(snippetfilename, snippetfilename+".bak")
        snippet.close()

        
        predictions = []
        for i, filename in enumerate(os.listdir('temp_snippets/')):
            last_number_frames = -1
            if filename.endswith(".wav"):
                audiofile, sr = librosa.load("temp_snippets/"+filename)
                fingerprint = librosa.feature.mfcc(y=audiofile, sr=sr, n_mfcc=1)
                x = pd.DataFrame(fingerprint, dtype = 'float32')
                print("Fingerprint shape:", fingerprint.shape)
                print("Fingerprint data type:", fingerprint.dtype)
                prediction = model.predict(fingerprint)
                predictions.append(prediction[0])

        from collections import Counter
        data = Counter(predictions)
        print(data.most_common())  
        print(data.most_common(1))
                    
       



    os.remove(filename)
    for snippet_file in os.listdir(folder):
        os.remove(os.path.join(folder, snippet_file))

    return predictions

@app.route('/classify_chop', methods=['POST'])
def upload_and_classify():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = 'uploaded.wav'
        file.save(filename)

        predictions = chop_and_classify_audio(filename, 'temp_snippets')

        
        data = Counter(predictions)
        result = data.most_common(1)[0][0]

        return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
