import os
import json
from difflib import get_close_matches


def absolute_path(file_path: str) -> str:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, file_path)

def load_knowledge_base(file_path: str)  -> dict:
    file_path = absolute_path(file_path)

    with open(file_path, 'r') as file:
        data: dict = json.load(file)
        return data

def save_knowledge_base(file_path: str, data: dict):
    file_path = absolute_path(file_path)

    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

def find_best_match(user_intent: str, intents: list[str]) -> str | None:
    matches: list = get_close_matches(user_intent, intents, n=1, cutoff=0.6)
    return matches[0] if matches else None

def get_answer_for_intent(intent: str, knowledge_base: dict) -> str | None:
    for q in knowledge_base["intents"]:
        if q["intent"] == intent:
            return q["response"]   

def chat_bot():
    knowledge_base: dict = load_knowledge_base('knowledge_base.json')

    while True:
        user_input: str = input('You: ')

        if user_input.lower() == '/quit' or user_input.lower() == '/exit':
            break

        best_match: str | None = find_best_match(user_input, [q["intent"] for q in knowledge_base["intents"]])

        if best_match:
            response: str = get_answer_for_intent(best_match, knowledge_base)
            print(f'Bot: {response}')
        else:
            print('Bot: I don\'t know the answer. Can you teach me?')
            new_response: str = input('Type the answer or "/skip" to skip: ')

            if new_response.lower() != "/skip":
                knowledge_base["intents"].append({"intent": user_input, "response": new_response})
                save_knowledge_base('knowledge_base.json', knowledge_base)
                print('Bot: Thank you! I learned a new response!')


if __name__ == '__main__':
    chat_bot()
