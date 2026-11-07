// Alternativas das perguntas
const labels = [
    "Sempre",
    "Frequentemente",
    "Às vezes",
    "Raramente",
    "Nunca"
];

// Cores dos gráficos
const palette = [
    "#8B5CF6",
    "#F973A7",
    "#F59E0B",
    "#22C55E",
    "#38BDF8"
];

// Resultados dos gráficos enviados
const surveyData = {
    q1: [11.4, 31.4, 20.0, 17.1, 20.0],

    q3: [20.0, 28.6, 37.1, 5.7, 8.6]
};

// Elemento do filtro
const questionFilter = document.getElementById("questionFilter");

// Cartões dos gráficos
const chartCards = [
    ...document.querySelectorAll(".chart-card")
];

// Armazena os gráficos
const chartInstances = {};

// Função para criar os gráficos
function makeChart(canvasId, key) {

    const ctx = document.getElementById(canvasId);

    chartInstances[key] = new Chart(ctx, {

        type: "doughnut",

        data: {
            labels: labels,

            datasets: [{
                label: "Percentual de respostas",

                data: surveyData[key],

                backgroundColor: palette,

                borderColor: "#ffffff",

                borderWidth: 3,

                hoverOffset: 8
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "62%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {
                        usePointStyle: true,

                        pointStyle: "circle",

                        padding: 16,

                        color: "#675b78",

                        font: {
                            family: "Inter",
                            size: 10
                        }
                    }
                },

                tooltip: {

                    backgroundColor: "#2e2140",

                    padding: 12,

                    callbacks: {

                        label: function(context) {

                            const valor = Number(context.raw)
                                .toLocaleString("pt-BR", {
                                    maximumFractionDigits: 1
                                });

                            return ` ${context.label}: ${valor}%`;
                        }
                    }
                }
            }
        }
    });
}

// Cria os dois gráficos
makeChart("chart1", "q1");

makeChart("chart3", "q3");

// FILTRO DOS GRÁFICOS
questionFilter.addEventListener("change", function() {

    const selected = questionFilter.value;

    chartCards.forEach(function(card) {

        if (
            selected === "all" ||
            card.dataset.question === selected
        ) {
            card.hidden = false;
        } else {
            card.hidden = true;
        }

    });

});

// Ajusta os gráficos ao redimensionar a tela
window.addEventListener("resize", function() {

    Object.values(chartInstances).forEach(function(chart) {

        chart.resize();

    });

});