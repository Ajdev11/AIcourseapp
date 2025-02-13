import dedent from "dedent";

const Prompt = {
  IDEA: dedent`
    As you are a coaching teacher,
    - User wants to learn about the topic.
    - Generate 5-7 course titles for study (short).
    - Ensure that the titles are related to the topic description.
    - Output should be an array of strings in JSON format only.
    - Do not include any plain text in the output.
  `,

  COURSE: dedent`
    As you are a coaching teacher,
    - User wants to learn about all the topics.
    - Create 2 courses with the following structure:
      - Each course should have a course name, description, and 3 chapters.
      - Include chapter details with all the learning material for each course.
      - Add a course banner image from ('/banner1.png', '/banner2.png', '/banner3.png').
      - Explain each chapter content as a detailed tutorial.
      - Generate 5 quizzes, 10 flashcards, and 5 questions with answers.
      - The quizzes should have the question, options, and the correct answer.
      - The flashcards should have the front and back content.
      - The QA section should have a question and answer.
      - Output should be an object in JSON format only, with the following structure:

      {
        "courses": [
          {
            "courseTitle": "<Intro to Python>",
            "description": "<Description of the course>",
            "banner_image": "/banner1.png",
            "chapters": [
              {
                "chapterName": "<Chapter 1 Title>",
                "content": [
                  {
                    "topic": "<Topic Name in 2 to 4 words, e.g., Creating variable>",
                    "explain": "<Detailed Explanation Tutorial>",
                    "code": "<Code example, if applicable, otherwise null>",
                    "example": "<Example, if applicable, otherwise null>"
                  }
                ]
              },
              {
                "chapterName": "<Chapter 2 Title>",
                "content": [
                  {
                    "topic": "<Topic Name>",
                    "explain": "<Detailed Explanation Tutorial>",
                    "code": "<Code example, if applicable, otherwise null>",
                    "example": "<Example, if applicable, otherwise null>"
                  }
                ]
              },
              {
                "chapterName": "<Chapter 3 Title>",
                "content": [
                  {
                    "topic": "Topic Name",
                    "explain": "<Detailed Explanation Tutorial",
                    "code": "Code example, if applicable, otherwise null",
                    "example": "<Example, if applicable, otherwise null"
                  }
                ]
              }
            ],
            "quiz": [
              {
                "question": "Quiz Question",
                "options": ["a", "b", "c", "d"],
                "correctAns": "Correct Answer"
              }
            ],
            "flashcards": [
              {
                "front": "Flashcard Front",
                "back": "Flashcard Back"
              }
            ],
            "qa": [
              {
                "question": "QA Question",
                "answer": "QA Answer"
              }
            ]
          }
        ]
      }

      - Ensure the output is formatted as an array of course objects as shown above.
  `,
};

export default Prompt;
