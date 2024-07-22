document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded..')

        const quiz = {
            quesitons: [
                {
                    id: 1,
                    question: 'Which country won Euro 2024?',
                    options: [
                        {
                            id: 1,
                            option: 'France',
                        },
                        {
                            id: 2,
                            option: 'Spain',
                        },
                        {
                            id: 3,
                            option: 'England',
                        },
                    ],
                    selectedAnswer: null,         
                    getCorrectAnswer: function() {
                        return this.options[1];
                    },
                },
                {
                    id: 2,
                    question: 'Which country won Copamerica 2024?',
                    options: [
                        {
                            id: 1,
                            option: 'Uruguay',
                        },
                        {
                            id: 2,
                            option: 'Colombia',
                        },
                        {
                            id: 3,
                            option: 'Argentina',
                        },
                    ],
                    selectedAnswer: null,            
                    getCorrectAnswer: function() {
                        return this.options[2];
                    },
                },
                {
                    id: 3,
                    question: 'Which Europian club won the 2024 Champions League final?',
                    options: [
                        {
                            id: 1,
                            option: 'Real Madrid',
                        },
                        {
                            id: 2,
                            option: 'Borussia Dortmund',
                        },
                        {
                            id: 3,
                            option: 'Manchester City',
                        },
                    ],
                    selectedAnswer: null,               
                    getCorrectAnswer: function() {
                        return this.options[0];
                    },
                }
            ],
            score: 0,
        };


        const appContainer = document.getElementById('app-container');
        const form = document.createElement('form');
     
        
        const clearBtn = document.createElement('button');        
        const submitBtn = document.createElement('button');

        clearBtn.type = 'type';
        clearBtn.innerText = 'Clear';

        clearBtn.addEventListener('click', function(event) {
            event.preventDefault();
            form.reset();

            quiz.quesitons.forEach(q => {
                q.selectedAnswer = null;
            });

            console.log(quiz);
        });

        submitBtn.type = 'submit';
        submitBtn.innerText = 'Submit'

        form.addEventListener('submit', function(event) {            
            event.preventDefault();            
            const quizResultContainer = document.querySelector('.quiz-result');
            
            quizResultContainer.innerHTML = '';
            quiz.score = 0;

            quiz.quesitons.forEach((q) => {
                if (q.getCorrectAnswer().option === q.selectedAnswer.option) {
                    quiz.score++;                    
                } else {
                    //do nothing
                }
            });
                    
            quizResultContainer.appendChild(document.createTextNode(`Result: ${quiz.score}/${quiz.quesitons.length}`));
        });

        const formActionsContainer = document.createElement('div');
    
        appContainer.appendChild(form);

        quiz.quesitons.forEach((q) => {            
            if (q) {
                const questionContainer = document.createElement('div');
                questionContainer.innerText = q.question;     
                questionContainer.classList.add('question-container');


                q.options.forEach(option => {
                    const label = document.createElement('label');                    

                    const radio = document.createElement('input');
                    radio.type = 'radio';

                    radio.name = 'option-' + q.id;
                    radio.value = option.option;

                    radio.addEventListener('change', function(event) {
                        event.preventDefault();
                        console.log(event.target.value)

                        const value = event.target.value;

                        if  (value) {                            
                            q.selectedAnswer = JSON.parse(JSON.stringify({
                                id: option.id,
                                option: value,
                            }));
                        }
                    });

                    label.appendChild(radio);
                    label.appendChild(document.createTextNode(option.option));

                    questionContainer.appendChild(label);
                });

                form.appendChild(questionContainer);
                
            }
        });

        formActionsContainer.classList.add('quiz-form-actions');
        formActionsContainer.appendChild(clearBtn);
        formActionsContainer.appendChild(submitBtn);
        form.appendChild(formActionsContainer);

    
});

