import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const WineConsumptionChart = () => {
    useEffect(() => {
        // 获取数据并创建图表
        const getData = async () => {
            try {
                const response = await fetch('/Consumption of alcoholic beverages 2017-2023 (Pivot table).csv');
                const csvText = await response.text();
                const data = csvJSON(csvText);
                
                createCharts(data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        getData();
    }, []);

    const csvJSON = (csv: string) => {
        const lines = csv.split("\n");
        const result = [];
        const headers = lines[0].split(",");
        
        for (let i = 1; i < lines.length; i++) {
            if(!lines[i]) continue;
            const obj: any = {};
            const currentline = lines[i].split(",");
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    };

    const createCharts = (data: any[]) => {
        const regions = data.map(d => d.Region);
        const totalConsumption = data.map(d => parseFloat(d["Consumption of alcoholic beverages (thousands of decaliters)"]));
        const perCapitaConsumption = data.map(d => parseFloat(d["Consumption of alcoholic beverages (in liters per capita)"]));
        const pureAlcoholConsumption = data.map(d => parseFloat(d["Consumption of alcoholic beverages (in liters of pure alcohol per capita)"]));

        // Bar Chart
        new Chart(
            document.getElementById('barChart') as HTMLCanvasElement,
            {
                type: 'bar',
                data: {
                    labels: regions.slice(0, 20),
                    datasets: [{
                        label: 'Total Consumption (Thousand Decaliters)',
                        data: totalConsumption.slice(0, 20),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Thousand Decaliters'
                            }
                        }
                    }
                }
            }
        );

        // Line Chart
        new Chart(
            document.getElementById('lineChart') as HTMLCanvasElement,
            {
                type: 'line',
                data: {
                    labels: regions.slice(0, 20),
                    datasets: [{
                        label: 'Per Capita Consumption (Liters)',
                        data: perCapitaConsumption.slice(0, 20),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.1
                    }]
                }
            }
        );

        // Pie Chart
        const top10Data = data
            .sort((a, b) => parseFloat(b["Consumption of alcoholic beverages (thousands of decaliters)"]) - 
                          parseFloat(a["Consumption of alcoholic beverages (thousands of decaliters)"]))
            .slice(0, 10);

        new Chart(
            document.getElementById('pieChart') as HTMLCanvasElement,
            {
                type: 'pie',
                data: {
                    labels: top10Data.map(d => d.Region),
                    datasets: [{
                        data: top10Data.map(d => parseFloat(d["Consumption of alcoholic beverages (thousands of decaliters)"])),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ]
                    }]
                }
            }
        );

        // Scatter Chart
        new Chart(
            document.getElementById('scatterChart') as HTMLCanvasElement,
            {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Total vs Per Capita Consumption',
                        data: data.map(d => ({
                            x: parseFloat(d["Consumption of alcoholic beverages (thousands of decaliters)"]),
                            y: parseFloat(d["Consumption of alcoholic beverages (in liters per capita)"])
                        })),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    }]
                }
            }
        );

        // Polar Area Chart
        new Chart(
            document.getElementById('polarAreaChart') as HTMLCanvasElement,
            {
                type: 'polarArea',
                data: {
                    labels: regions.slice(0, 10),
                    datasets: [{
                        data: pureAlcoholConsumption.slice(0, 10),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)'
                        ]
                    }]
                }
            }
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Total Wine Consumption by Region</h2>
            <canvas id="barChart"></canvas>

            <h2>Per Capita Wine Consumption</h2>
            <canvas id="lineChart"></canvas>

            <h2>Top 10 Consuming Regions</h2>
            <canvas id="pieChart"></canvas>

            <h2>Total vs Per Capita Consumption</h2>
            <canvas id="scatterChart"></canvas>

            <h2>Pure Alcohol Consumption per Capita</h2>
            <canvas id="polarAreaChart"></canvas>
        </div>
    );
};

export default WineConsumptionChart;