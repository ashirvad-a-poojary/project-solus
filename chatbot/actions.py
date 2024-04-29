import os
import random
import json
import pandas as pd
import spacy

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer

import torch
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

#import rasa
#from rasa.core.agent import Agent


nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

with open('intents.json', 'r') as file:
    intents = json.load(file)

def clean_up_sentence(sentence):
  sentence_words = nltk.word_tokenize(sentence)
  sentence_words = [
    lemmatizer.lemmatize(word.lower()) for word in sentence_words
  ]
  return sentence_words

def bow(sentence, words, show_details=True):
  sentence_words = clean_up_sentence(sentence)
  bag = [0] * len(words)

  for s in sentence_words:
    for i, w in enumerate(words):
      if w == s:
        bag[i] = 1

  return (np.array(bag))
