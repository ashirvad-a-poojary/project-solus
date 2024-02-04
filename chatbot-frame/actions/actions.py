 
# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from twilio.rest import Client

class ActionHandleDistress(Action):
    def name(self) -> Text:
        return "action_handle_distress"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:
        # Get the value of the 'distress' slot
        distress_value = tracker.get_slot("distress")

        # Your logic to determine if there's distress and send a Twilio message
        if distress_value:
            account_sid = "AC8ce8af969279c1066f1fe530b7e6c2db"
            auth_token = "8c6b1266794c8fbc1309d64c20eabcd8"
            twilio_number = "+16592243662"

            client = Client(account_sid, auth_token)

            message = client.messages.create(
                body=f"Distress message: {distress_value}",
                from_="+16592243662",
                to="+918971005536"
            )

            dispatcher.utter_message(f"Distress message sent.")

        return []

