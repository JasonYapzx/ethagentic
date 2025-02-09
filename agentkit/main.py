import asyncio
import random
from dotenv import load_dotenv
from paho.mqtt import client as mqtt_client

# ------------- Your AI + Browser Agent Code -------------
from langchain_openai import ChatOpenAI
from browser_use import Agent, Browser, BrowserConfig
from browser_use.browser.context import BrowserContextConfig, BrowserContext

load_dotenv()

# Configure your Browser
browser = Browser(
    config=BrowserConfig(
        headless=False,
        disable_security=True,
        chrome_instance_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    )
)

# Configure your Browser context
context = BrowserContext(
    browser=browser,
    config=BrowserContextConfig(
        locale='en-US',
        user_agent=('Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                    'AppleWebKit/537.36 (KHTML, like Gecko) '
                    'Chrome/85.0.4183.102 Safari/537.36'),
        highlight_elements=False,
    )
)

# Create a function that runs the AI agent
async def run_agent():
    agent = Agent(
        task=(
            "Go to https://shopee.sg/, search for milk."
            "Multiple products will be displayed, click on the first product that has a price and has milk in its name."
            "Click on buy now, then click on checkout, select Credit Card/Debit Card, "
            "select the available credit card, and finally, click on the place order button."
        ),
        llm=ChatOpenAI(model="gpt-4o"),
        browser_context=context
    )
    # Run the agent's task
    result = await agent.run()
    print("Agent Result:", result)

# ------------- MQTT Subscriber Configuration -------------
broker = 'broker.hivemq.com'
port = 1883
topic = "storagent/command"
client_id = f'subscribe-{random.randint(0, 100)}'
username = 'b02'
password = 'b02capstone123!'

# Connect to MQTT Broker
def connect_mqtt() -> mqtt_client.Client:
    def on_connect(client, userdata, flags, rc, props=None):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print(f"Failed to connect. Return code={rc}")

    client = mqtt_client.Client(
        client_id=client_id,
        callback_api_version=mqtt_client.CallbackAPIVersion.VERSION2
    )
    # client.username_pw_set(username, password)
    # # Replace with your CA cert if needed or remove if not using TLS
    # client.tls_set(ca_certs='./emqxsl-ca.crt')
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

# Define the subscriber behavior
def subscribe(client: mqtt_client.Client):
    def on_message(client, userdata, msg):
        message = msg.payload.decode().strip()
        print(f"Received `{message}` from `{msg.topic}` topic.")

        # If the message is "start", run the AI agent
        if message == "start":
            print("Starting AI agent...")
            # Run the agent (blocking while it finishes)
            asyncio.run(run_agent())

    client.subscribe(topic, qos=0)
    client.on_message = on_message

# Main entry point to run the MQTT client loop
def run():
    client = connect_mqtt()
    subscribe(client)
    print(f"Subscribed to topic: {topic}")
    client.loop_forever()

if __name__ == '__main__':
    run()
