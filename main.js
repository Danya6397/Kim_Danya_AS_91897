const nav = document.querySelector('nav');
window.addEventListener("scroll",function(){
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("sticky");
    }
    else {
        nav.classList.remove("sticky");
    }
})


function revealFunction() {
    const sr = ScrollReveal({duration:1300, distance:'100px', easing:'ease-out'});
    sr.reveal('.reveal_left', {origin:'left', reset:'false'});
    sr.reveal('.reveal_top', {origin:'top',reset:'false' });
    sr.reveal('.reveal_right', {origin:'right', reset:'false'});
}

document.addEventListener('DOMContentLoaded', revealFunction)


const questions = [
    {
        text:"How does your skin feel after a hot shower?",
        options: [
            {text: "It can sting a little", value: 1},
            { text: "It feels tight and dry", value: 2 },
            { text: "It feels fine", value: 3 },
            { text: "Tight in some places but mostly fine", value: 4}
        ]
    },
    {
        text: "How often do you feel the need to use moisturiser?",
        options: [
            { text: "Always, my skin doesn't feel comfortable without it", value: 1 },
            { text: "Often, I like the feel of it", value: 2 },
            { text: "Rarely, I don't think my skin needs it", value: 3},
            { text: "Never, my skin feels hydrated without", value: 4}
        ]
    },
    {
        text: "How often do you expereince acne?",
        options: [
            { text: "Only when I use an unfamiliar product", value: 1 },
            { text: "Never", value: 2 },
            { text: "Occasionally, in small amounts", value: 3},
            { text: "Always", value: 4}
        ]
    },
    {
        text: "Does the weather effect your skin?",
        options: [
            { text: "Yes, my skin feels worse in the peaks of summer and winter", value: 1 },
            { text: "Only in winter", value: 2 },
            { text: "I haven't noticed ", value: 3},
            { text: "Only in summer", value: 4}
        ]
    },
    {
        text: "How do you know when you've found a product that works well for you?",
        options: [
            { text: "It makes my skin smooth and soft", value: 1 },
            { text: "It hydrates my skin", value: 2 },
            { text: "Evens out my complexion", value: 3},
            { text: "It gets rid of my acne", value: 4}
        ]
    },
    {
        text: "How does your skin react to new products?",
        options: [
            { text: "I can have a severe reaction if I use cheap products", value: 1 },
            { text: "Most products feel okay but don't have any real affect", value: 2 },
            { text: "Half of the products are fine, half of them make me break out", value: 3},
            { text: "Most products make me break out", value: 4}
        ]
    },
    {
        text: "What does your skin look like at the worst of times?",
        options: [
            { text: "Red and irritated", value: 1 },
            { text: "Flaky and dull", value: 2 },
            { text: "Both congested and thin", value: 3},
            { text: "Skiny and oily", value: 4}
        ]
    },
    {
        text: "What does your skin look like if you don't apply skincare?",
        options: [
            { text: "Irritated and uncomfortable", value: 1 },
            { text: "Dry and tight", value: 2 },
            { text: "I feel fine even without skincare", value: 3},
            { text: "I prefer not to use any skincare", value: 4}
        ]
    },
    {
        text: "How visible are your pores?",
        options: [
            { text: "Tight and enclosed", value: 1 },
            { text: "I have to look quite close to see", value: 2 },
            { text: "More prominent on areas such as my forehead and nose", value: 3},
            { text: "Very open and visible", value: 4}
        ]
    }
    
    
];

let currentQuestion = 0;
let userAnswers = [];

function renderQuestion() {
    console.log("Rendering Question:", currentQuestion, questions[currentQuestion]);
    const questionBox = document.getElementById("question_box");
    const q = questions[currentQuestion];

    let html = `<div class="question">
        <p>${currentQuestion + 1}. ${q.text}</p>`;

    q.options.forEach((opt, index) => {
        const checked = userAnswers[currentQuestion] == opt.value ? "checked" : "";
        html += `<label><input type="radio" name="option" value="${opt.value}" ${checked}> ${opt.text}</label>`;
    });

    html += `</div>`;
    questionBox.innerHTML = html;

    const progress = document.getElementById("progress_fill");
    progress.style.width = `${(currentQuestion + 1) / questions.length * 100}%`;

    document.getElementById("backBtn").disabled = currentQuestion === 0;
    document.getElementById("nextBtn").textContent =
        currentQuestion === questions.length - 1 ? "Submit" : "Next";


}

function nextQuestion() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert("Please select an answer before continuing.");
        return;
    }

    userAnswers[currentQuestion] = parseInt(selected.value);

    if (currentQuestion === questions.length - 1) {
        calculateResult();
        return;
    }

    currentQuestion++;
    renderQuestion();
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function restartTest() {
    location.reload();
}





function calculateResult() {
    const total = userAnswers.reduce((sum, val) => sum + val, 0);
    let skinType = "";

    if (total <= 13) {
        skinType = "sensitive";
    } else if (total <= 22) {
        skinType = "dry";
    } else if (total <= 31) {
        skinType = "combination";
    } else {
        skinType = "oily";
    }
    
    

    document.getElementById("question_box").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".progress_bar").style.display = "none";
    
    

    document.getElementById("result").innerHTML = `
        <h3>You have <strong>${skinType}</strong> skin.</h3>
        <a href="${skinType}.html">Learn more about ${skinType} skin</a> 
    `;

    document.getElementById("restartBtn").style.display = "block";
}

window.onload = function () {
    renderQuestion();
};