import os
from groq import Groq
from app.prompts.health_prompt import SYSTEM_PROMPT

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_llm(user_message):

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_message
            }
        ],

        temperature=0.7,
        max_tokens=500
    )

    return response.choices[0].message.content