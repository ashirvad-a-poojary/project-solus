import os
import random
import json
import pandas as pd

import nltk
from nltk.stem import WordNetLemmatizer

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.stem import WordNetLemmatizer

import torch
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

import spacy
from gensim import models

#from flask import Flask, request, jsonify

#import rasa
#from rasa.core.agent import Agent


nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

basdir="."
intents = json.loads(open(f'{basedir}/intents.json').read())