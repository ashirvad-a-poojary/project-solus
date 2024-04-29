# project-solus
SolusAI is a friendly AI companion which assists user with mental health support 

### This was built exclusively for HackXpo '24

### Running rasa server
Make sure you are in the directory containing rasa model.
In our case, "rasa-frame" 

**To train the model**
```
rasa train
```

**To start the rasa server**
```
rasa run --enable-api --cors "*"
