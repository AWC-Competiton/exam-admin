// =====================================================
// STUDENT EXAM SYSTEM
// 3 GRADE LEVELS
// NO SUBJECT SELECTION
// 50 QUESTIONS / 60 MINUTES
// =====================================================


// =====================================================
// SETTINGS
// =====================================================

const TOTAL_QUESTIONS = 50;
const EXAM_TIME = 60 * 60;


// =====================================================
// GRADE LEVELS
// =====================================================

const LEVEL_NAMES = {
    "7-8": "ថ្នាក់ទី 7 និង 8",
    "9-10": "ថ្នាក់ទី 9 និង 10",
    "11-12": "ថ្នាក់ទី 11 និង 12"
};


// =====================================================
// QUESTIONS
// =====================================================

const QUESTIONS = [
    {
        q: "តើរាជធានីនៃប្រទេសកម្ពុជាគឺជាអ្វី?",
        a: ["ភ្នំពេញ", "សៀមរាប", "បាត់ដំបង", "កំពត"],
        c: 0
    },

    {
        q: "តើប្រទេសកម្ពុជាមានពណ៌នៅលើទង់ជាតិចំនួនប៉ុន្មាន?",
        a: ["2", "3", "4", "5"],
        c: 1
    },

    {
        q: "តើប្រាសាទអង្គរវត្តស្ថិតនៅខេត្តណា?",
        a: ["សៀមរាប", "កំពង់ចាម", "កណ្ដាល", "ព្រះវិហារ"],
        c: 0
    },

    {
        q: "2 + 3 × 4 = ?",
        a: ["20", "14", "24", "18"],
        c: 1
    },

    {
        q: "តើ √81 ស្មើប៉ុន្មាន?",
        a: ["7", "8", "9", "10"],
        c: 2
    },

    {
        q: "តើ 15% នៃ 200 ស្មើប៉ុន្មាន?",
        a: ["20", "25", "30", "35"],
        c: 2
    },

    {
        q: "បើ x + 7 = 15 តើ x ស្មើប៉ុន្មាន?",
        a: ["6", "7", "8", "9"],
        c: 2
    },

    {
        q: "តើផ្ទៃក្រឡាចតុកោណដែលមានបណ្ដោយ 8cm និងទទឹង 5cm ស្មើ?",
        a: ["13cm²", "26cm²", "40cm²", "80cm²"],
        c: 2
    },

    {
        q: "តើ 3² + 4² ស្មើ?",
        a: ["12", "25", "49", "14"],
        c: 1
    },

    {
        q: "តើមធ្យមភាគនៃ 10, 20 និង 30 គឺ?",
        a: ["15", "20", "25", "30"],
        c: 1
    },

    {
        q: "តើ H₂O គឺជាអ្វី?",
        a: ["អុកស៊ីសែន", "អ៊ីដ្រូសែន", "ទឹក", "អំបិល"],
        c: 2
    },

    {
        q: "តើឧស្ម័នណាដែលមនុស្សត្រូវការសម្រាប់ដកដង្ហើម?",
        a: ["អុកស៊ីសែន", "កាបូនឌីអុកស៊ីត", "អាសូត", "អ៊ីដ្រូសែន"],
        c: 0
    },

    {
        q: "តើភពណាដែលនៅជិតព្រះអាទិត្យជាងគេ?",
        a: ["ផែនដី", "ភពពុធ", "ភពសុក្រ", "ភពអង្គារ"],
        c: 1
    },

    {
        q: "តើកម្លាំងទំនាញរបស់ផែនដីធ្វើអ្វី?",
        a: [
            "រុញវត្ថុចេញ",
            "ទាញវត្ថុទៅផែនដី",
            "ធ្វើឱ្យវត្ថុបាត់",
            "បង្កើតពន្លឺ"
        ],
        c: 1
    },

    {
        q: "តើរុក្ខជាតិប្រើដំណើរការអ្វីដើម្បីផលិតអាហារ?",
        a: [
            "Respiration",
            "Photosynthesis",
            "Digestion",
            "Evaporation"
        ],
        c: 1
    },

    {
        q: "តើសរីរាង្គណាបូមឈាមទៅទូទាំងរាងកាយ?",
        a: ["សួត", "ថ្លើម", "បេះដូង", "ក្រពះ"],
        c: 2
    },

    {
        q: "តើទឹកកករលាយនៅសីតុណ្ហភាពប្រហែលប៉ុន្មាន °C?",
        a: ["0", "10", "50", "100"],
        c: 0
    },

    {
        q: "តើព្រះអាទិត្យជាអ្វី?",
        a: ["ភព", "ផ្កាយ", "ផ្កាយរណប", "អាចម៍ផ្កាយ"],
        c: 1
    },

    {
        q: "តើ DNA មានតួនាទីសំខាន់អ្វី?",
        a: [
            "រក្សាទុកព័ត៌មានហ្សែន",
            "បូមឈាម",
            "រំលាយអាហារ",
            "ផលិតពន្លឺ"
        ],
        c: 0
    },

    {
        q: "តើឈាមមានកោសិកាអ្វីជួយប្រឆាំងមេរោគ?",
        a: [
            "កោសិកាឈាមស",
            "កោសិកាឈាមក្រហម",
            "ប្លាកែត",
            "កោសិកាខ្លាញ់"
        ],
        c: 0
    },

    {
        q: "HTML ប្រើសម្រាប់អ្វី?",
        a: [
            "រចនាសម្ព័ន្ធគេហទំព័រ",
            "គ្រប់គ្រង Database តែប៉ុណ្ណោះ",
            "ការពារមេរោគ",
            "បង្កើត CPU"
        ],
        c: 0
    },

    {
        q: "CSS ប្រើសម្រាប់អ្វី?",
        a: [
            "រចនារូបរាងគេហទំព័រ",
            "ផ្ញើអ៊ីមែល",
            "រក្សាទុកឯកសារ",
            "បង្កើត Hardware"
        ],
        c: 0
    },

    {
        q: "JavaScript ជាអ្វី?",
        a: [
            "Programming language",
            "Web browser",
            "Operating system",
            "Database server"
        ],
        c: 0
    },

    {
        q: "តើ CPU មានន័យថា?",
        a: [
            "Central Processing Unit",
            "Computer Personal User",
            "Central Program Utility",
            "Control Processing User"
        ],
        c: 0
    },

    {
        q: "តើ RAM មានលក្ខណៈសំខាន់អ្វី?",
        a: [
            "ជាអង្គចងចាំបណ្តោះអាសន្ន",
            "ជាអង្គផ្ទុកអចិន្ត្រៃយ៍តែប៉ុណ្ណោះ",
            "ជាអេក្រង់",
            "ជាក្តារចុច"
        ],
        c: 0
    },

    {
        q: "តើ URL ប្រើសម្រាប់អ្វី?",
        a: [
            "កំណត់អាសយដ្ឋានធនធានលើ Internet",
            "វាស់ល្បឿន CPU",
            "បង្កើតរូបភាព",
            "បិទកុំព្យូទ័រ"
        ],
        c: 0
    },

    {
        q: "តើ Database មានតួនាទីអ្វី?",
        a: [
            "រក្សាទុក និងគ្រប់គ្រងទិន្នន័យ",
            "បង្កើតអគ្គិសនី",
            "បង្ហាញតែវីដេអូ",
            "បោះពុម្ពក្រដាស"
        ],
        c: 0
    },

    {
        q: "តើ GitHub ត្រូវបានប្រើជាចម្បងសម្រាប់អ្វី?",
        a: [
            "Host និងគ្រប់គ្រងកូដ/Repository",
            "លេងហ្គេម",
            "កែរូបភាព",
            "ស្កេនមេរោគ"
        ],
        c: 0
    },

    {
        q: "តើ HTTPS ផ្តល់អ្វីបន្ថែមពី HTTP?",
        a: [
            "ការអ៊ិនគ្រីបទំនាក់ទំនង",
            "ល្បឿន CPU",
            "ទំហំ RAM",
            "ទំហំអេក្រង់"
        ],
        c: 0
    },

    {
        q: "តើ Cloud computing មានន័យជាទូទៅថា?",
        a: [
            "ប្រើធនធានកុំព្យូទ័រតាមបណ្តាញ Internet",
            "រក្សាទុកទិន្នន័យតែក្នុង USB",
            "បិទ Internet",
            "បង្កើត Keyboard"
        ],
        c: 0
    },

    {
        q: "តើទន្លេមេគង្គហូរកាត់ប្រទេសកម្ពុជាឬទេ?",
        a: ["បាទ/ចាស", "ទេ", "មានតែរដូវប្រាំង", "មិនមានទន្លេ"],
        c: 0
    },

    {
        q: "តើអាស៊ីជាអ្វី?",
        a: ["ទ្វីប", "ប្រទេស", "មហាសមុទ្រ", "ទីក្រុង"],
        c: 0
    },

    {
        q: "តើមហាសមុទ្រធំបំផុតគឺ?",
        a: ["Atlantic", "Indian", "Pacific", "Arctic"],
        c: 2
    },

    {
        q: "តើអេក្វាទ័រជាអ្វី?",
        a: [
            "បន្ទាត់ស្រមើស្រមៃជុំវិញកណ្ដាលផែនដី",
            "ភ្នំ",
            "ទន្លេ",
            "ប្រទេស"
        ],
        c: 0
    },

    {
        q: "តើភាសាផ្លូវការរបស់កម្ពុជាគឺ?",
        a: ["ខ្មែរ", "អង់គ្លេស", "បារាំង", "ថៃ"],
        c: 0
    },

    {
        q: "តើអង្គការសហប្រជាជាតិហៅកាត់ថា?",
        a: ["WHO", "UN", "ASEAN", "EU"],
        c: 1
    },

    {
        q: "ASEAN មានន័យថា?",
        a: [
            "Association of Southeast Asian Nations",
            "Asian Science Education Network",
            "American Southeast Asia Network",
            "Association of European Asian Nations"
        ],
        c: 0
    },

    {
        q: "តើរូបិយប័ណ្ណផ្លូវការរបស់កម្ពុជាគឺ?",
        a: ["រៀល", "យ័ន", "យ៉េន", "អឺរ៉ូ"],
        c: 0
    },

    {
        q: "តើថ្ងៃបុណ្យឯករាជ្យជាតិរបស់កម្ពុជាគឺថ្ងៃទី?",
        a: ["9 វិច្ឆិកា", "1 មករា", "7 មករា", "18 មិថុនា"],
        c: 0
    },

    {
        q: "តើការអានសៀវភៅមានអត្ថប្រយោជន៍អ្វី?",
        a: [
            "បង្កើនចំណេះដឹង",
            "ធ្វើឱ្យភ្លេចទាំងអស់",
            "បន្ថយការរៀន",
            "មិនមានអត្ថប្រយោជន៍"
        ],
        c: 0
    },

    {
        q: "តើការរក្សាពាក្យសម្ងាត់គួរធ្វើដូចម្តេច?",
        a: [
            "ចែករំលែកជាមួយគ្រប់គ្នា",
            "រក្សាឱ្យសុវត្ថិភាព",
            "ដាក់លើ Public Post",
            "ផ្ញើទៅមនុស្សមិនស្គាល់"
        ],
        c: 1
    },

    {
        q: "តើ Phishing ជាអ្វី?",
        a: [
            "ការបោកបញ្ឆោតដើម្បីលួចព័ត៌មាន",
            "ការបង្កើត Website",
            "ការសរសេរកូដ",
            "ការបោះពុម្ព"
        ],
        c: 0
    },

    {
        q: "តើ Backup មានប្រយោជន៍អ្វី?",
        a: [
            "ជួយស្ដារទិន្នន័យពេលបាត់បង់",
            "ធ្វើឱ្យអេក្រង់ធំ",
            "បង្កើនសីតុណ្ហភាព",
            "បិទ Internet"
        ],
        c: 0
    },

    {
        q: "តើ Algorithm គឺជាអ្វី?",
        a: [
            "ជំហានដោះស្រាយបញ្ហាដែលមានលំដាប់",
            "ប្រភេទ Keyboard",
            "ឈ្មោះ Browser",
            "ប្រភេទ Monitor"
        ],
        c: 0
    },

    {
        q: "តើ 1 byte មានប៉ុន្មាន bits?",
        a: ["4", "8", "16", "32"],
        c: 1
    },

    {
        q: "តើ binary ប្រើលេខអ្វីខ្លះ?",
        a: ["0 និង 1", "1 និង 2", "2 និង 3", "0 ដល់ 9"],
        c: 0
    },

    {
        q: "តើ browser មួយណាជា Web Browser?",
        a: ["Chrome", "Python", "Linux", "SQL"],
        c: 0
    },

    {
        q: "តើ email ត្រូវការអ្វីដើម្បីផ្ញើទៅអ្នកទទួល?",
        a: [
            "អាសយដ្ឋាន Email",
            "លេខសម្ងាត់របស់អ្នកទទួល",
            "លេខកាតធនាគារ",
            "CPU"
        ],
        c: 0
    },

    {
        q: "តើការប្រើ Internet ដោយមានសុវត្ថិភាពគួរធ្វើអ្វី?",
        a: [
            "ប្រើ Password ខ្លាំង និងបើក 2FA ប្រសិនបើអាច",
            "ចែក Password",
            "ចុច Link មិនស្គាល់",
            "បិទការអាប់ដេត"
        ],
        c: 0
    },

    {
        q: "តើការងារជាក្រុមល្អត្រូវការអ្វី?",
        a: [
            "ការទំនាក់ទំនង និងការសហការ",
            "មិនស្តាប់គ្នា",
            "ធ្វើតែម្នាក់ឯងជានិច្ច",
            "លាក់ព័ត៌មាន"
        ],
        c: 0
    }
];


// =====================================================
// CURRENT EXAM DATA
// =====================================================

let currentQuestions = [];
let selectedLevel = "";
let timeLeft = EXAM_TIME;
let timerId = null;
let submitted = false;


// =====================================================
// START EXAM
// =====================================================

async function startExam() {

    const seat = val("seat");
    const name = val("name");
    const gender = val("gender");
    const school = val("school");
    const gradeLevel = val("gradeLevel");

    const msg = document.getElementById("infoMsg");


    // Check student information

    if (!seat || !name || !gender || !school) {

        msg.textContent =
            "សូមបំពេញព័ត៌មានសិស្សទាំងអស់។";

        return;
    }


    // Check grade

    if (!gradeLevel) {

        msg.textContent =
            "សូមជ្រើសរើសកម្រិតថ្នាក់។";

        return;
    }


    selectedLevel = gradeLevel;


    // Check seat in Supabase

    await checkSeat(seat);
}


// =====================================================
// CHECK SEAT
// =====================================================

async function checkSeat(seat) {

    const msg =
        document.getElementById("infoMsg");


    msg.textContent =
        "កំពុងពិនិត្យលេខតុ...";


    try {

        const result =
            await supabaseClient
                .from("exam_submissions")
                .select("id")
                .eq("seat_number", seat)
                .maybeSingle();


        const data = result.data;
        const error = result.error;


        if (error) {

            console.error(error);

            msg.textContent =
                "មានបញ្ហាក្នុងការតភ្ជាប់ Database: " +
                error.message;

            return;
        }


        // Seat already used

        if (data) {

            msg.textContent =
                "លេខតុនេះបានប្រឡង និង Submit រួចហើយ។ " +
                "មិនអាចប្រឡងម្ដងទៀតបានទេ។";

            return;
        }


        // =================================================
        // CREATE QUESTION SET
        // =================================================

        currentQuestions =
            shuffleArray(QUESTIONS).slice(
                0,
                TOTAL_QUESTIONS
            );


        if (
            currentQuestions.length <
            TOTAL_QUESTIONS
        ) {

            msg.textContent =
                "មានសំណួរមិនគ្រប់ 50 សំណួរ។";

            return;
        }


        // =================================================
        // SHOW EXAM
        // =================================================

        renderQuestions();


        document
            .getElementById("info")
            .classList
            .add("hidden");


        document
            .getElementById("exam")
            .classList
            .remove("hidden");


        // =================================================
        // START TIMER
        // =================================================

        timeLeft = EXAM_TIME;

        submitted = false;

        startTimer();


    } catch (error) {

        console.error(error);

        msg.textContent =
            "មានបញ្ហា។ សូមពិនិត្យ Internet និង Supabase។";
    }
}


// =====================================================
// RENDER QUESTIONS
// =====================================================

function renderQuestions() {

    const container =
        document.getElementById("questions");


    container.innerHTML =
        currentQuestions.map((question, index) => {

            return `
                <div class="question">

                    <h3>
                        ${index + 1}. ${escapeHTML(question.q)}
                    </h3>

                    ${question.a.map((answer, optionIndex) => {

                        return `
                            <label class="option">

                                <input
                                    type="radio"
                                    name="q${index}"
                                    value="${optionIndex}"
                                >

                                ${String.fromCharCode(65 + optionIndex)}.
                                ${escapeHTML(answer)}

                            </label>
                        `;

                    }).join("")}

                </div>
            `;

        }).join("");


    updateProgress();


    container.onchange =
        updateProgress;
}


// =====================================================
// UPDATE PROGRESS
// =====================================================

function updateProgress() {

    let answered = 0;


    currentQuestions.forEach((question, index) => {

        const selected =
            document.querySelector(
                `input[name="q${index}"]:checked`
            );


        if (selected) {

            answered++;
        }

    });


    const progress =
        document.getElementById("progress");


    if (progress) {

        progress.textContent =
            ` • ${answered}/${TOTAL_QUESTIONS} បានឆ្លើយ`;
    }
}


// =====================================================
// TIMER
// =====================================================

function startTimer() {

    clearInterval(timerId);


    updateTimer();


    timerId =
        setInterval(() => {

            timeLeft--;

            updateTimer();


            if (timeLeft <= 0) {

                clearInterval(timerId);

                submitExam(true);
            }

        }, 1000);
}


// =====================================================
// UPDATE TIMER
// =====================================================

function updateTimer() {

    const timer =
        document.getElementById("timer");


    if (!timer) return;


    timer.textContent =
        formatTime(timeLeft);
}


// =====================================================
// FORMAT TIME
// =====================================================

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secondsLeft =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secondsLeft).padStart(2, "0")
    );
}


// =====================================================
// SUBMIT EXAM
// =====================================================

async function submitExam(autoSubmit = false) {

    if (submitted) return;


    if (!autoSubmit) {

        const confirmSubmit =
            confirm(
                "តើអ្នកប្រាកដថាចង់ Submit ប្រឡងមែនទេ?"
            );


        if (!confirmSubmit) {

            return;
        }
    }


    // =================================================
    // CALCULATE SCORE
    // =================================================

    let score = 0;

    const answers = [];


    currentQuestions.forEach((question, index) => {

        const selected =
            document.querySelector(
                `input[name="q${index}"]:checked`
            );


        const answer =
            selected
                ? Number(selected.value)
                : null;


        answers.push(answer);


        if (answer === question.c) {

            score++;
        }
    });


    // =================================================
    // STUDENT INFORMATION
    // =================================================

    const seat =
        val("seat");

    const name =
        val("name");

    const gender =
        val("gender");

    const school =
        val("school");


    // =================================================
    // DATA TO SUPABASE
    // =================================================

    const payload = {

        seat_number: seat,

        student_name: name,

        gender: gender,

        school_name: school,

        grade_level: selectedLevel,

        score: score,

        total_questions: TOTAL_QUESTIONS,

        answers: answers,

        submitted_at:
            new Date().toISOString()
    };


    try {

        const result =
            await supabaseClient
                .from("exam_submissions")
                .insert(payload);


        const error =
            result.error;


        if (error) {

            console.error(error);


            if (error.code === "23505") {

                alert(
                    "លេខតុនេះបាន Submit រួចហើយ។ " +
                    "មិនអាចប្រឡងម្ដងទៀតបានទេ។"
                );

            } else {

                alert(
                    "Submit មិនជោគជ័យ:\n" +
                    error.message
                );
            }


            return;
        }


        // =================================================
        // SUCCESS
        // =================================================

        submitted = true;

        clearInterval(timerId);


        document
            .getElementById("exam")
            .classList
            .add("hidden");


        document
            .getElementById("done")
            .classList
            .remove("hidden");


        document
            .getElementById("doneText")
            .textContent =
            `លេខតុ ${seat} — ${name} បាន Submit រួចរាល់។ ` +
            `កម្រិត ${LEVEL_NAMES[selectedLevel]} ` +
            `។ ពិន្ទុ ${score}/${TOTAL_QUESTIONS}`;


    } catch (error) {

        console.error(error);

        alert(
            "មានបញ្ហាក្នុងការបញ្ជូនលទ្ធផល។"
        );
    }
}


// =====================================================
// SHUFFLE
// =====================================================

function shuffleArray(array) {

    const result =
        [...array];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];
    }


    return result;
}


// =====================================================
// GET INPUT VALUE
// =====================================================

function val(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return "";
    }


    return element.value.trim();
}


// =====================================================
// SECURITY / HTML ESCAPE
// =====================================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// =====================================================
// PREVENT ACCIDENTAL REFRESH DURING EXAM
// =====================================================

window.addEventListener(
    "beforeunload",
    function (event) {

        const exam =
            document.getElementById("exam");


        if (
            exam &&
            !exam.classList.contains("hidden") &&
            !submitted
        ) {

            event.preventDefault();

            event.returnValue = "";
        }
    }
);
