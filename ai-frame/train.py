import json
import pickle
import random
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Sequential

nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

with open('intents.json', 'r') as file:
    intents = json.load(file)

for intent in intents['nlu']:
    for pattern in intent['patterns']:
        w = nltk.word_tokenize(pattern)
        words.extend(w)
        documents.append((w, intent['tag']))

        if intent['tag'] not in classes:
            classes.append(intent['tag'])

words = [
  lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words
]
words = sorted(list(set(words)))

classes = sorted(list(set(classes)))