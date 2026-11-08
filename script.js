// ======================================
// DADOS DA PESQUISA
// ======================================

const labels = [
    "Sempre",
    "Frequentemente",
    "Às vezes",
    "Raramente",
    "Nunca"
];

const palette = [
    "#8B5CF6",
    "#F973A7",
    "#F59E0B",
    "#22C55E",
    "#38BDF8"
];

const surveyData = {
    q1: [11.4, 31.4, 20.0, 17.1, 20.0],
    q3: [20.0, 28.6, 37.1, 5.7, 8.6]
};


// ======================================
// CONFIGURAÇÃO DOS GRÁFICOS
// ======================================

const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: "bottom",

            labels: {
                padding: 15,
                usePointStyle: true
            }
        },

        tooltip: {
            callbacks: {
                label: function(context) {
                    return `${context.label}: ${context.raw}%`;
                }
            }
        }
    }
};


// ======================================
// CRIAÇÃO DOS GRÁFICOS
// ======================================

function createChart(canvasId, data) {

    const canvas = document.getElementById(canvasId);

    return new Chart(canvas, {
        type: "doughnut",

        data: {
            labels: labels,

            datasets: [{
                data: data,
                backgroundColor: palette,
                borderWidth: 2,
                borderColor: "#ffffff",
                hoverOffset: 8
            }]
        },

        options: {
            ...chartOptions,

            cutout: "58%"
        }
    });
}


// Inicialização

const chart1 = createChart("chart1", surveyData.q1);

const chart3 = createChart("chart3", surveyData.q3);


// ======================================
// FILTROS INDIVIDUAIS DOS GRÁFICOS
// ======================================

function applyIndividualFilter(chart, question, filterValue) {

    if (filterValue === "all") {

        chart.data.labels = labels;

        chart.data.datasets[0].data = surveyData[question];

        chart.data.datasets[0].backgroundColor = palette;

    } else {

        let relevantPercentage;
        let relevantLabel;

        if (question === "q1") {

            // Frequentemente + Às vezes = 51,4%

            relevantPercentage = 51.4;

            relevantLabel = "Frequentemente ou às vezes";

        } else {

            // Às vezes + Frequentemente = 65,7%

            relevantPercentage = 65.7;

            relevantLabel = "Às vezes ou frequentemente";
        }

        const remainingPercentage = Number(
            (100 - relevantPercentage).toFixed(1)
        );

        chart.data.labels = [
            `${relevantLabel} (${relevantPercentage}%)`,
            `Demais respostas (${remainingPercentage}%)`
        ];

        chart.data.datasets[0].data = [
            relevantPercentage,
            remainingPercentage
        ];

        chart.data.datasets[0].backgroundColor = [
            "#F973A7",
            "#D9D9D9"
        ];
    }

    chart.update();
}


// Filtro do gráfico 1

document
    .getElementById("filterQ1")
    .addEventListener("change", function() {

        applyIndividualFilter(
            chart1,
            "q1",
            this.value
        );

    });


// Filtro do gráfico 2

document
    .getElementById("filterQ3")
    .addEventListener("change", function() {

        applyIndividualFilter(
            chart3,
            "q3",
            this.value
        );

    });


// ======================================
// FILTRO GERAL DAS PERGUNTAS
// ======================================

const questionFilter = document.getElementById("questionFilter");

const chartCards = document.querySelectorAll(".chart-card");

questionFilter.addEventListener("change", function() {

    const selectedQuestion = this.value;

    chartCards.forEach(card => {

        const cardQuestion = card.dataset.question;

        if (
            selectedQuestion === "all" ||
            selectedQuestion === cardQuestion
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});