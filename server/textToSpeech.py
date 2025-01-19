from pathlib import Path
from openai import OpenAI
from IPython.display import Audio, display

import openai
from gtts import gTTS
import IPython

# Load environment variables from .env

api_key=("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")
client = openai.OpenAI(api_key = api_key)


# Function to generate scolding messages
def generate_scolding(character, item, sentiment):
    character_prompts = {
        "Angry Mother": f"You are an angry mother. Scold someone for buying {item} that is not on their shopping list. Keep it short, dramatic and intense.",
        "Toxic Friend": f"You are a toxic friend. Mock someone sarcastically for buying {item}.Limit your response to 20 seconds of speech.",
        "Gym Coach": f"You are a strict gym coach. Criticize someone for buying {item}, focusing on fitness and discipline. Make it sharp and concise."
    }

    tone = {
        "negative": "Be empathetic but firm.",
        "positive": "Be playful and encouraging.",
        "neutral": "Stick to the character's usual tone."
    }.get(sentiment, "Stick to the character's usual tone.")

    prompt = f"{character_prompts[character]} {tone}"

    try:
        # Correct API call
        response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an AI simulating human characters."},
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}"




# Set your OpenAI API key
# Set your OpenAI API key
api_key = "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"
# Initialize the OpenAI client
client = openai.OpenAI(api_key = api_key)

def generate_audio(character, text):
    try:
        # Define character-specific voice mapping
        voice_mapping = {
            "Angry Mother": "sage",
            "Toxic Friend": "fable",
            "Gym Coach": "onyx"
        }

        # Get the appropriate voice for the character
        voice = voice_mapping.get(character, "alloy")  # Default to "alloy" if character not found

        # Path to save the speech file
        speech_file_path = Path(f"{character.replace(' ', '_')}_response.mp3")

        # Use OpenAI's TTS API to generate speech
        response = client.audio.speech.create(
            model="tts-1",
            voice=voice,
            input=text,
        )

        # Save the audio file
        with open(speech_file_path, "wb") as file:
            file.write(response.content)

        print(f"Audio saved as {speech_file_path}")

        # Play the audio file in Jupyter Notebook
        display(Audio(str(speech_file_path), autoplay=True))

        # Optionally, delete the file after playback
        speech_file_path.unlink()  # Removes the file
    except Exception as e:
        print(f"Error generating audio: {e}")
     
    # Main program
def main(character,item,sentiment):
    scolding_message = generate_scolding(character, item, sentiment)
    print(f"{character} says: {scolding_message}")

    generate_audio(character, scolding_message)

# if __name__ == "__main__":
#     main("Toxic Friend","donut","neutral")   