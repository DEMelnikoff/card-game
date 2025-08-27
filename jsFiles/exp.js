

const exp = (function() {


    var p = {};

    const condition = 1;

    const play = ["play", "watch"][condition];

    const playBool = [true, false][condition];

    jsPsych.data.addProperties({
        condition: play,
    });


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        intro_play: [
            `<div class='parent'>
                <p><strong>Welcome to Wheel of Fortune!</strong></p>
                <p>In Wheel of Fortune, you'll spin a series of prize wheels.</p>
                <p>Each time you spin a prize wheel, you'll earn tokens.</p>
                <p>The number of tokens you earn depends on where the wheel lands.</p>
            </div>`,

            `<div class='parent'>
                <p>The more tokens you earn, the better your chances of winning a <strong>$100.00 bonus prize</strong>.</p>
                <p>The tokens you earn will be entered into a lottery, and if one of your tokens is drawn, you'll win $100.00. 
                To maximize your chances of winning a $100.00 bonus, you'll need to earn as many tokens as possible.</p>
            </div>`,

            `<div class='parent'>
                <p>To spin a prize wheel, just grab it with your cursor and give it a spin!
                <br>Watch the animation below to see how it's done.</p>
                <img src="./img/spin-${play}-gif.gif" style="width:60%; height:60%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Wheel of Fortune, you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and engaged</strong> you feel while spinning each wheel,
                as well as how <strong>happy</strong> you currently feel.</p>
            </div>`,      

            `<div class='parent'>
                <p>You're ready to start playing Wheel of Fortune!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        intro_watch: [
            `<div class='parent'>
                <p><strong>Welcome to Wheel of Fortune!</strong></p>
                <p>In Wheel of Fortune, you'll observe a series of spinning prize wheels.</p>
                <p>Each time a prize wheel spins, you'll earn tokens.</p>
                <p>The number of tokens you earn depends on where the wheel lands.</p>
            </div>`,

            `<div class='parent'>
                <p>The more tokens you earn, the better your chances of winning a <b>$100.00 bonus prize</b>.</p>
                <p>The tokens you earn will be entered into a lottery, and if one of your tokens is drawn, you'll win $100.00. To maximize your chances of winning a $100.00 bonus, you'll need to earn as many tokens as possible.</p>
            </div>`,

            `<div class='parent'>
                <p>Each prize wheel spins automatically. When it stops spinning, your earnings are revealed.</p>
                <p>Watch the animation below to see an example.</p>
                <img src="./img/spin-${play}-gif.gif" style="width:60%; height:60%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Wheel of Fortune, you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and engaged</strong> you feel during each round of Wheel of Fortune,
                as well as how <strong>happy</strong> you currently feel.</p>
            </div>`,      

            `<div class='parent'>
                <p>You're ready to start playing Wheel of Fortune!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        postTask: [
            `<div class='parent'>
                <p>Wheel of Fortune is now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],
    };

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./html/consent.html",
        cont_btn: "advance",
    };

    p.intro = {
        type: jsPsychInstructions,
        pages: [html.intro_play, html.intro_watch][condition],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    
   /*
    *
    *   TASK
    *
    */

    // diagnosticity: 60, 80, 100
    // cardinality: 2, 4
    // ev: 3.5, 5.5, 7.5


    // ====== HELPERS ======
    function shuffle(array) {
        const a = array.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    // Format deck for on-screen banner like "Deck: 2, 2, 5, 9"
    function deckBannerText(deck) {
        const colored = deck.map(v => `<span style="color:${colorFor(v)}">${v}</span>`).join(', ');
        return `Deck: ${colored}`;
    };

    // Sample uniformly one element from an array
    function sampleOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    // Build the HTML for the 2x2 grid of face-down cards
    function renderCardGrid(deckShuffled, deckOriginal) {
      const banner = `<div class="deck-banner center"><strong>${deckBannerText(deckOriginal)}</strong></div>`;
      let grid = `<div class="grid">`;
      for (let i = 0; i < 4; i++) {
        const val = deckShuffled[i];
        grid += `
          <button class="card-btn" data-index="${i}">
            <div class="flip">
              <div class="card-face card-back"></div>
              <div class="card-face card-front" style="color:${colorFor(val)}">${val}</div>
            </div>
          </button>
        `;
      }
      grid += `</div>`;
      return banner + grid + `<div class="center small">Pick one card.</div>`;
    };

    // ====== PARAMETERS YOU CAN EDIT ======
    const P_RANDOM = 0.20;       // prob. outcome is sampled from remaining three cards

    const FIXED_PALETTE = [
      '#E69F00', // orange
      '#56B4E9', // sky blue
      '#009E73', // bluish green
      '#F0E442', // yellow
      '#0072B2', // blue
      '#D55E00', // vermillion
      '#CC79A7', // reddish purple
      '#999999'  // gray (replaces black)
    ];

    // Values you'll use
    const VALUES = [2,3,4,5,6,7,8,9];

    const DECKS = [
      { deck: [2,3,4,5], deck_id: 1 },
      { deck: [4,5,6,7], deck_id: 1 },
      { deck: [6,7,8,9], deck_id: 1 },
      { deck: [2,2,5,5], deck_id: 1 },
      { deck: [4,4,7,7], deck_id: 1 },
      { deck: [6,6,9,9], deck_id: 1 },
    ];
    const _shuffledPalette = shuffle(FIXED_PALETTE);
    const VALUE_COLORS = Object.fromEntries(VALUES.map((v,i)=>[v, _shuffledPalette[i]]));
    const colorFor = v => VALUE_COLORS[v];

    // Trial factory: one round of picking a card
    const choiceTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: "",
        choices: [],
        response_ends_trial: false,
        data: () => ({
            phase: 'choice',
            deck_id: jsPsych.timelineVariable('deck_id')
        }),
        on_start: (trial) => {
            const deck = jsPsych.timelineVariable('deck');
            const shuffled = shuffle(deck);
            trial._deck = deck;
            trial._shuffled = shuffled;
            trial.stimulus = renderCardGrid(shuffled, deck);
        },
        on_load: () => {
            const t = jsPsych.getCurrentTrial();
            const deck      = t._deck;
            const shuffled  = t._shuffled;

            const startTime = performance.now();
            const buttons   = Array.from(document.querySelectorAll('.card-btn'));
            const flippers  = Array.from(document.querySelectorAll('.card-btn .flip'));

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (buttons.some(b => b.disabled)) return;

                    const idx = parseInt(btn.dataset.index, 10);
                    flippers[idx].classList.add('flipped');
                    buttons.forEach(b => b.disabled = true);

                    const rt = Math.round(performance.now() - startTime);
                    const chosen_value = shuffled[idx];

                    let random_override = false;
                    let outcome_points  = chosen_value;
                    if (Math.random() < P_RANDOM) {
                      const remaining   = shuffled.filter((_, i) => i !== idx);
                      outcome_points    = sampleOne(remaining);
                      random_override   = true;
                    };

                    setTimeout(() => {
                      jsPsych.finishTrial({
                        shuffled_deck: JSON.stringify(shuffled),
                        deck_original: JSON.stringify(deck),
                        chosen_index: idx,
                        chosen_value: chosen_value,
                        outcome_points: outcome_points,
                        random_override: random_override,
                        rt: rt
                            });
                    }, 1750);
                });
            });
        },
    }

    // Feedback trial showing points earned; deck banner remains visible
    const feedbackTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: () => {
            const last = jsPsych.data.get().last(1).values()[0]; // the choice trial
            return `
              <div class="center">
                <div style="font-size:80px; font-weight:800; line-height:80px; color:${colorFor(last.outcome_points)}">+${last.outcome_points}<br>Tokens</div>
              </div>
            `;
        },
        choices: "NO_KEYS",
        trial_duration: 1750,
        data: () => ({
            phase: 'feedback',
            deck_id: jsPsych.timelineVariable('deck_id')
        })
    };

    const taskLoop = {
        timeline: [choiceTrial, feedbackTrial],
        repetitions: 10
    };

    p.task = {
        timeline: [taskLoop],
        timeline_variables: DECKS,
        randomize_order: true,
    };

   /*
    *
    *   DEPENDENT MEASURES
    *
    */

    // trial: flow DV
    const flowMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `During the last round of Four Card Draw,<br>how <b>immersed</b> and <b>engaged</b> did you feel in what you were watching?`,
            name: `flow`,
            labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
        ],
        randomize_question_order: false,
        scale_width: 600,
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            data.round = round;
            let scoreArray = jsPsych.data.get().select('score').values;
            let outcomesArray = jsPsych.data.get().select('outcomes').values;
            data.score = scoreArray[scoreArray.length - 1];
            data.outcomes = outcomesArray[outcomesArray.length - 1];
            saveSurveyData(data);
        }
    };

    const happinessMeasure = {
        type: jsPsychSurveyMultiChoice,
        questions: [
            {
                prompt: `How <b>happy</b> are you right now?`, 
                name: `happiness`, 
                options: ['10 (Very Happy)', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0 (Very Unhappy)'],
            },
        ],
        scale_width: 500,
        on_finish: (data) => {
            data.round = round;
            let scoreArray = jsPsych.data.get().select('score').values;
            let outcomesArray = jsPsych.data.get().select('outcomes').values;
            data.score = scoreArray[scoreArray.length - 2];
            data.outcomes = outcomesArray[outcomesArray.length - 2];
            saveSurveyData(data);
            round++;
        },
    };

   /*
    *
    *   Demographics
    *
    */

    p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const genFlowScale = ['-2<br>Totally<br>Disagree', '-1<br>Disagree', '0<br>Neither agree<br>nor disagree', '1<br>Agree', '2<br>Totally<br>Agree'];

        const flowGenQuestions = {
            type: jsPsychSurveyLikert,
            preamble:
                `<div style='padding-top: 50px; width: 900px; font-size:16px'>
                    <p>Please express the extent to which you disagree or agree with each statement.</p>
                </div>`,
            questions: [
                {
                    prompt: `I enjoy challenging tasks/activities that require a lot of focus.`,
                    name: `genFlow_1`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `When I am focused on a task/activity, I quickly tend to forget my surroundings (other people, time, and place).`,
                    name: `genFlow_2`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I usually experience a good flow when I do something (things that are neither too easy nor too difficult for me).`,
                    name: `genFlow_3`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I have several different areas of interest.`,
                    name: `genFlow_4`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `It is difficult for me to walk away from or quit a project I am currently working on.`,
                    name: `genFlow_5`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I become stressed in the face of difficult/challenging tasks.`,
                    name: `genFlow_6r`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `It is difficult for me to maintain concentration over time.`,
                    name: `genFlow_7r`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I quickly become tired of the things I do.`,
                    name: `genFlow_8r`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I am usually satisfied with the results of my efforts across various tasks (I experience feelings of mastery).`,
                    name: `genFlow_9`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `When I focus on something, I often forget to take a break.`,
                    name: `genFlow_10`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I get bored easily.`,
                    name: `genFlow_11r`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `My daily tasks are exhausting rather than stimulating.`,
                    name: `genFlow_12r`,
                    labels: genFlowScale,
                    required: true,
                },
                {
                    prompt: `I develop an interest for most of the things I do in life.`,
                    name: `genFlow_13`,
                    labels: genFlowScale,
                    required: true,
                },
            ],
            randomize_question_order: false,
            scale_width: 500,
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord]
        };

        return demos;

    }());


   /*
    *
    *   SAVE DATA
    *
    */

    p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "lrmVyu0nL5X4",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [
    exp.consent, 
    //exp.intro, 
    exp.task, 
    //exp.demographics, 
    //exp.save_data
];

jsPsych.run(timeline);
