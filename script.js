function calculateElectromotiveForceAndCurrent(B, v, R, maxTime) {
    let t = [];
    let E = [];
    let I = [];

    for (let i = 0; i <= maxTime; i += 0.0001) {
        t.push(i);
        let w = 2 * Math.PI * v
        let wt = w * i;
        let E_val = w * B * Math.cos(wt);
        let I_val = E_val / R;
        E.push(E_val);
        I.push(I_val);
    }

    return {t, E, I};
}

function updateGraphs() {
    let B = parseFloat(document.getElementById('magnetic-field').value);
    let v = parseFloat(document.getElementById('rotation-frequency').value);
    let R = parseFloat(document.getElementById('circuit-resistance').value);
    const maxTime = 10; // Максимальное время для расчета (в секундах)

    const {t, E, I} = calculateElectromotiveForceAndCurrent(B, v, R, maxTime);

    Plotly.newPlot('graphs', [
        {
            x: t,
            y: E,
            type: 'scatter',
            mode: 'lines',
            name: 'ЭДС (E, В)'
        },
        {
            x: t,
            y: I,
            type: 'scatter',
            mode: 'lines',
            name: 'Ток (I, А)'
        }
    ], {
        title: 'Графики зависимости ЭДС и индукционного тока в зависимости от времени',
        xaxis: { title: 'Время (с)' },
        yaxis: { title: 'Значение' }
    });
}

// Инициализация графиков после полной загрузки DOM
document.addEventListener('DOMContentLoaded', updateGraphs);
