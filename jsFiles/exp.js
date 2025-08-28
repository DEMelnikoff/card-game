

const exp = (function() {


    var p = {};

    const condition = Math.floor(Math.random() * 2);

    const nChoices = 10;

    const play = ["play", "watch"][condition];

    const doingOrWatching = ["doing", "watching"][condition];

    const auto = [false, true][condition];

    jsPsych.data.addProperties({
        condition: play,
    });


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        welcome_play: [
            `<div class='parent'>
                <p><strong>Welcome to Four Card Draw!</strong></p>
                <p>In Four Card Draw, you'll draw from different decks of cards.</p>
                <p>With each draw, you'll earn tokens.</p>
                <p>Your goal is to earn as many tokens as possible!</p>
            </div>`,
        ],

        welcome_watch: [
            `<div class='parent'>
                <p><strong>Welcome to Four Card Draw!</strong></p>
                <p>In Four Card Draw, you'll observe draws from different decks of cards.</p>
                <p>With each draw, you'll earn tokens.</p>
                <p>Your goal is to earn as many tokens as possible!</p>
            </div>`,
        ],

        how_to_earn: [
            `<div class='parent'>
                <p>The more tokens you earn, the better your chances of winning a <strong>$100.00 bonus prize</strong>.</p>
                <p>The tokens you earn will be entered into a lottery, and if one of your tokens is drawn, you'll win $100.00. 
                To maximize your chances of winning a $100.00 bonus, you'll need to earn as many tokens as possible.</p>
            </div>`,

            `<div class='parent'>
                <p>Each deck contains four cards, like this:</p>
                <img src="./img/cards.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>The values of the cards are displayed on top.</p>
                <p>This deck contains a 4, 5, 6, and 7.</p>
                <img src="./img/cards.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>The cards are always arranged in random order.</p>
                <img src="./img/cards.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>When a card is selected, it flips over, revealing its value:</p>
                <img src="./img/flip.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>Next, you see how many tokens you won.</p>
                <img src="./img/flip.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>The number of tokens you win usually equals the number on the selected card.</p>
                <p>For example, if the selected card was a 4, you'd usually win 4 tokens:</p>
                <img src="./img/standard-outcome.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>Occasionally, the number of tokens you win equals a number from an unselected card. This is called a "wildcard outcome." Here's an example of a wildcome outcome:</p>
                <p>The selected card was a 4, but you earned 5 tokens.</p>
                <img src="./img/random-outcome.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>The chance of a wildcard outcome changes from deck to deck.</p>
            </div>`,

            `<div class='parent'>
                <p>The chance of a wildcard outcome is displayed before each deck.</p>
                <p>For example, this message means that the next deck has a 20% chance of a wildcard outcome.</p>
                <img src="./img/p_wild.png" style="width:50%; height:50%">      
            </div>`,
        ],

        how_to_spin_play: [
            `<div class='parent'>
                <p>Four Card Draw includes 9 different decks. You will make 10 draws from each deck.</p>
            </div>`,

            `<div class='parent'>
                <p>After each deck you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and engaged</strong> you felt while playing the last deck,
                as well as how <strong>happy</strong> you currently feel.</p>
            </div>`,      

            `<div class='parent'>
                <p>You're ready to start playing Four Card Draw!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        how_to_spin_watch: [
            `<div class='parent'>
                <p>Four Card Draw includes 9 different decks. The cards are drawn automatically at random. You will observe 10 draws from each deck.</p>
            </div>`,

            `<div class='parent'>
                <p>After each deck you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and engaged</strong> you felt while observing the last deck,
                as well as how <strong>happy</strong> you currently feel.</p>
            </div>`,      

            `<div class='parent'>
                <p>You're ready to start playing Four Card Draw!</p>
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

    const intro = {
        type: jsPsychInstructions,
        pages: [[html.welcome_play, html.welcome_watch][condition], ...html.how_to_earn],
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    let correctAnswers = [`60%`, `80%`, `100%`, `Earn as many tokens as possible.`];

    const errorMessage = {
        type: jsPsychInstructions,
        pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand the game, please continue to re-read the instructions.</p></div>`],
        show_clickable_nav: true,
        allow_keys: false,
    };

    const attnChk = {
        type: jsPsychSurveyMultiChoice,
        preamble: `<div class='parent'>
            <p>Please answer the following questions.</p>
            </div>`,
        questions: [
            {
                prompt: `If a 9 is drawn and there's a 40% chance of a wildcard outcome, what are your chances of earning 9 tokens?`, 
                name: `attnChk1`, 
                options: ['60%', '80%', '100%'],
            },
            {
                prompt: `If a 9 is drawn and there's a 20% chance of a wildcard outcome, what are your chances of earning 9 tokens?`, 
                name: `attnChk2`, 
                options: ['60%', '80%', '100%'],
            },
            {
                prompt: `If a 9 is drawn and there's a 0% chance of a wildcard outcome, what are your chances of earning 9 tokens?`, 
                name: `attnChk3`, 
                options: ['60%', '80%', '100%'],
            },
            {
                prompt: `What is your goal?`, 
                name: `attnChk5`, 
                options: [`Get as many wildcard outcomes as possible.`, `Earn as many tokens as possible.`],
            },
        ],
        scale_width: 500,
        on_finish: (data) => {
              const totalErrors = getTotalErrors(data, correctAnswers);
              data.totalErrors = totalErrors;
        },
    };

    const conditionalNode = {
      timeline: [errorMessage],
      conditional_function: () => {
        const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.instLoop = {
      timeline: [intro, attnChk, conditionalNode],
      loop_function: () => {
        const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.postIntro = {
        type: jsPsychInstructions,
        pages: [html.how_to_spin_play, html.how_to_spin_watch][condition],
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    
   /*
    *
    *   TASK
    *
    */

    // ====== HELPERS ======

    // Format deck for on-screen banner like "Deck: 2, 2, 5, 9"
    function deckBannerText(deck) {
        const colored = deck.map(v => `<span style="color:${colorFor(v)}">${v}</span>`).join(', ');
        return `Values: ${colored}`;
    };

    // Sample uniformly one element from an array
    function sampleOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    // Build the HTML for the 2x2 grid of face-down cards
    function renderCardGrid(deckShuffled, deckOriginal, backCss) {
      const banner = `<div class="deck-banner center"><strong>${deckBannerText(deckOriginal)}</strong></div>`;
      let grid = `<div class="grid">`;
      for (let i = 0; i < 4; i++) {
        const val = deckShuffled[i];
        grid += `
          <button class="card-btn" data-index="${i}">
            <div class="flip">
                <div class="card-face card-back" style="${backCss}"></div>
                <div class="card-face card-front" style="color:${colorFor(val)}">${val}</div>
            </div>
          </button>
        `;
      };
      grid += `</div>`;
      return banner + grid;
    };

    // Build wildcard array
    function makeWildcardArray(n, nTotal) {
      const arr = Array(n).fill(true).concat(Array(nTotal - n).fill(false));
      return jsPsych.randomization.repeat(arr, 1)
    }

    // ====== PARAMETERS ======

    let BACK_COMBOS = [
      { name: 'diag-blue', css: `background: repeating-linear-gradient(45deg,#cfe8ff 0 8px,#93c5fd 8px 16px);` },
      { name: 'vert-teal', css: `background: repeating-linear-gradient(90deg,#ccfbf1 0 8px,#5eead4 8px 16px);` },
      { name: 'horiz-orange', css: `background: repeating-linear-gradient(0deg,#ffedd5 0 8px,#fdba74 8px 16px);` },
      { name: 'crosshatch-slate', css: `background:
          repeating-linear-gradient(0deg,#e5e7eb 0 12px, #cbd5e1 12px 24px),
          repeating-linear-gradient(90deg,#e5e7eb 0 12px, #cbd5e1 12px 24px);` },
      { name: 'dots-purple', css: `background:
          radial-gradient(#c084fc 20%, transparent 21%) 0 0/20px 20px,
          radial-gradient(#c084fc 20%, transparent 21%) 10px 10px/20px 20px, #faf5ff;` },
      { name: 'checker-teal', css: `background:
          conic-gradient(#a7f3d0 0 90deg, #d1fae5 0 180deg, #a7f3d0 0 270deg, #d1fae5 0) 0 0/28px 28px;` },
      { name: 'chevron-pink', css: `background:
          linear-gradient(135deg,#fbcfe8 25%, transparent 25%) -12px 0/24px 24px,
          linear-gradient(225deg,#fbcfe8 25%, transparent 25%) -12px 0/24px 24px,
          linear-gradient(315deg,#fbcfe8 25%, transparent 25%) 0 0/24px 24px,
          linear-gradient(45deg, #fbcfe8 25%, transparent 25%) 0 0/24px 24px, #ffe4e6;` },
      { name: 'plaid-gold-blue', css: `background:
          repeating-linear-gradient(0deg,#fde68a 0 8px, transparent 8px 16px),
          repeating-linear-gradient(90deg,#93c5fd 0 8px, transparent 8px 16px), #ffffff;` },
      { name: 'pinstripe-gray', css: `background:
          repeating-linear-gradient(45deg,#f3f4f6 0 2px, #e5e7eb 2px 4px);` },
    ];

    // Random order for 9 loops (no repeats)
    BACK_COMBOS = jsPsych.randomization.repeat(BACK_COMBOS, 1);

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
      { deck: [2,3,4,5], cardinality: 4, ev: 3.5, n_wild: 4, label: "40%", deck_id: 1 },
      { deck: [4,5,6,7], cardinality: 4, ev: 5.5, n_wild: 4, label: "40%", deck_id: 2 },
      { deck: [6,7,8,9], cardinality: 4, ev: 7.5, n_wild: 4, label: "40%", deck_id: 3 },
      { deck: [2,2,5,5], cardinality: 2, ev: 3.5, n_wild: 4, label: "40%", deck_id: 4 },
      { deck: [4,4,7,7], cardinality: 2, ev: 5.5, n_wild: 4, label: "40%", deck_id: 5 },
      { deck: [6,6,9,9], cardinality: 2, ev: 7.5, n_wild: 4, label: "40%", deck_id: 6 },

      { deck: [2,3,4,5], cardinality: 4, ev: 3.5, n_wild: 2, label: "20%", deck_id: 7 },
      { deck: [4,5,6,7], cardinality: 4, ev: 5.5, n_wild: 2, label: "20%", deck_id: 8 },
      { deck: [6,7,8,9], cardinality: 4, ev: 7.5, n_wild: 2, label: "20%", deck_id: 9 },
      { deck: [2,2,5,5], cardinality: 2, ev: 3.5, n_wild: 2, label: "20%", deck_id: 10 },
      { deck: [4,4,7,7], cardinality: 2, ev: 5.5, n_wild: 2, label: "20%", deck_id: 11 },
      { deck: [6,6,9,9], cardinality: 2, ev: 7.5, n_wild: 2, label: "20%", deck_id: 12 },

      { deck: [2,3,4,5], cardinality: 4, ev: 3.5, n_wild: 0, label: "0%", deck_id: 13 },
      { deck: [4,5,6,7], cardinality: 4, ev: 5.5, n_wild: 0, label: "0%", deck_id: 14 },
      { deck: [6,7,8,9], cardinality: 4, ev: 7.5, n_wild: 0, label: "0%", deck_id: 15 },
      { deck: [2,2,5,5], cardinality: 2, ev: 3.5, n_wild: 0, label: "0%", deck_id: 16 },
      { deck: [4,4,7,7], cardinality: 2, ev: 5.5, n_wild: 0, label: "0%", deck_id: 17 },
      { deck: [6,6,9,9], cardinality: 2, ev: 7.5, n_wild: 0, label: "0%", deck_id: 18 },
    ];

    const _shuffledPalette = jsPsych.randomization.repeat(FIXED_PALETTE, 1);
    const VALUE_COLORS = Object.fromEntries(VALUES.map((v,i)=>[v, _shuffledPalette[i]]));
    const colorFor = v => VALUE_COLORS[v];

    // track rounds
    let round = 1;

    // wildcard array
    let wildcardArray;

    // deck info
    const deckInfo = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            let pct = jsPsych.timelineVariable('label');
            let html = `<div class='pFlip-style'>
                            <p><span style='font-size:100px'><strong>${pct}</strong></span>
                            <br><br><br>chance of wildcard</p>
                        </div>`;
            return html;
        },
        choices: "NO_KEYS",
        trial_duration: 5000,
        response_ends_trial: false,
        data: {phase: 'deck-info', wheel_id: jsPsych.timelineVariable('deck_id'), ev: jsPsych.timelineVariable('ev'), cardinality: jsPsych.timelineVariable('cardinality'), p_wild: jsPsych.timelineVariable('n_wild')},
        on_finish: function(data) {
            data.round = round;
            wildcardArray = makeWildcardArray(jsPsych.timelineVariable('n_wild'), nChoices);
            console.log(wildcardArray)
        }
    };

    // Trial factory: one round of picking a card
    const choose = {
        type: jsPsychHtmlButtonResponse,
        stimulus: "",
        choices: [],
        response_ends_trial: false,
        data: {phase: 'choice', wheel_id: jsPsych.timelineVariable('deck_id'), ev: jsPsych.timelineVariable('ev'), cardinality: jsPsych.timelineVariable('cardinality'), p_wild: jsPsych.timelineVariable('n_wild')},
        on_start: (trial) => {
            const deck = jsPsych.timelineVariable('deck');
            const shuffled = jsPsych.randomization.repeat(deck, 1);
            const backCss = BACK_COMBOS[round-1].css;
            trial._deck = deck;
            trial._shuffled = shuffled;
            trial.stimulus = renderCardGrid(shuffled, deck, backCss);
        },
        on_load: () => {
            const t = jsPsych.getCurrentTrial();
            const deck      = t._deck;
            const shuffled  = t._shuffled;

            const startTime = performance.now();
            const buttons   = Array.from(document.querySelectorAll('.card-btn'));
            const flippers  = Array.from(document.querySelectorAll('.card-btn .flip'));

            function selectIndex(idx) {
                if (buttons.some(b => b.disabled)) return;
                flippers[idx].classList.add('flipped');
                buttons.forEach(b => b.disabled = true);

                const rt = Math.round(performance.now() - startTime);
                const chosen_value = shuffled[idx];

                let outcome_points  = chosen_value;
                let wildcard = wildcardArray.pop();
                if (wildcard) {
                    const remaining   = shuffled.filter((_, i) => i !== idx);
                    outcome_points    = sampleOne(remaining);
                }

                setTimeout(() => {
                    jsPsych.finishTrial({
                      shuffled_deck: JSON.stringify(shuffled),
                      deck_original: JSON.stringify(deck),
                      chosen_index: idx,
                      chosen_value: chosen_value,
                      outcome_points: outcome_points,
                      wildcard: wildcard,
                      rt: rt
                    });
                }, 1750);
            }

            if (auto) {
                // prevent participant clicks
                buttons.forEach(b => b.disabled = true);

                const jitterRange = [500, 2500];
                const [lo, hi] = jitterRange;
                const delay = Math.floor(lo + Math.random() * (hi - lo + 1));

                setTimeout(() => {
                    const idx = Math.floor(Math.random() * buttons.length); // 0..3
                    // re-enable just so selectIndex can lock & compute rt cleanly
                    buttons.forEach(b => b.disabled = false);
                    selectIndex(idx);
                }, delay);

            } else {
                // MANUAL mode (current behavior)
                buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                      if (buttons.some(b => b.disabled)) return;
                      const idx = parseInt(btn.dataset.index, 10);
                      selectIndex(idx);
                    });
                });
            }
        },
    }

    // Feedback trial showing points earned; deck banner remains visible
    const feedback = {
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
        data: {phase: 'feedback', wheel_id: jsPsych.timelineVariable('deck_id'), ev: jsPsych.timelineVariable('ev'), cardinality: jsPsych.timelineVariable('cardinality'), p_wild: jsPsych.timelineVariable('n_wild')},
    };

    // Choice loop
    const choiceLoop = {
        timeline: [choose, feedback],
        repetitions: nChoices,
    };

    // Flow measure
    const flowMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `During the last round of Four Card Draw,<br>how <b>immersed</b> and <b>engaged</b> did you feel in what you were ${doingOrWatching}?`,
            name: `flow`,
            labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
        ],
        randomize_question_order: false,
        scale_width: 600,
        data: {phase: 'flow-measure', wheel_id: jsPsych.timelineVariable('deck_id'), ev: jsPsych.timelineVariable('ev'), cardinality: jsPsych.timelineVariable('cardinality'), p_wild: jsPsych.timelineVariable('n_wild')},
        on_finish: function(data) {
            data.round = round;
            data.flow = data.response
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
        data: {phase: 'happiness-measure', wheel_id: jsPsych.timelineVariable('deck_id'), ev: jsPsych.timelineVariable('ev'), cardinality: jsPsych.timelineVariable('cardinality'), p_wild: jsPsych.timelineVariable('n_wild')},
        on_finish: (data) => {
            data.round = round;
            data.happiness = data.response;
            round++;
        },
    };

    // Task loop
    const taskLoop = {
        timeline: [deckInfo, choiceLoop, flowMeasure, happinessMeasure],
    };

    p.task = {
        timeline: [taskLoop],
        timeline_variables: DECKS,
        randomize_order: true,
        sample: { type: 'without-replacement', size: 9 },
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
        experiment_id: "27gh7Nx3wDJE",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [
    exp.consent, 
    exp.instLoop, 
    exp.postIntro,
    exp.task, 
    exp.demographics, 
    exp.save_data
];

jsPsych.run(timeline);
