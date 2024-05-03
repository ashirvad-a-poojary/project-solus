import os
import json
import random
import nltk
from nltk.stem import WordNetLemmatizer


lemmatizer = WordNetLemmatizer()

words = ["h"]
classes = ["tag"]
documents = [(["Hi", "How", "are"], "tag")]
ignore_words = ['5', '?', '!', '*', '/', ',', '(','&']

def absolute_path(file_path: str) -> str:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, file_path)

def load_knowledge_base(file_path: str)  -> dict:
    file_path = absolute_path(file_path)

    with open(file_path, 'r') as file:
        data: dict = json.load(file)
        return data

knowledge_base = load_knowledge_base('knowledge_base.json')

for intent in knowledge_base['intents']:
  for pattern in intent['patterns']:
    w = nltk.word_tokenize(pattern)
    words.extend(w)
    documents.append((w, intent['tag']))

    if intent['tag'] not in classes:
      classes.append(intent['tag'])
