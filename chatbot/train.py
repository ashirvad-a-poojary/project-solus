import os
import json
import random
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Sequential
import numpy as np
import pickle
from nltk.stem import WordNetLemmatizer
import nltk

nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

words = ["h"]
classes = ["tag"]
documents = [(["Hi", "How", "are"], "tag")]
ignore_words = ['?', '!', '*', "/", ",", '5', "("]

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

words = [
  lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words
]
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))

pickle.dump(words, open(absolute_path('words.pkl'), 'wb'))
pickle.dump(classes, open(absolute_path('classes.pkl'), 'wb'))


# initializing training data
training = []
output_empty = [0] * len(classes)
for document in documents:
  bag = []
  pattern_words = document[0]
  pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]

  for word in words:
    if word in pattern_words:
      bag.append(1)
    else:
      bag.append(0)

  output_row = list(output_empty)
  output_row[classes.index(document[1])] = 1

  training.append([bag, output_row])

random.shuffle(training)
training = np.array(training)

train_x = list(training[:, 0])
train_y = list(training[:, 1])


model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]), ), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy',
              optimizer=sgd,
              metrics=['accuracy'])


hist = model.fit(np.array(train_x),
                 np.array(train_y),
                 epochs=10000,
                 batch_size=100,
                 verbose=2)
model.save('bot.h5', hist)

print("created")
