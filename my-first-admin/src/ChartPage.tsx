import React from 'react';
import { ListBase, WithListContext, Title as ReactTitle } from 'react-admin'; // Important to rename reacttitle during import because it conflicts with chart.js
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // ADD THIS IS IMPORTANT§
import { Grid } from '@mui/material';

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export const ChartPage = () => (
    <ListBase resource="titanic" disableSyncWithLocation perPage={100}>
        <ReactTitle title="My custom title" />
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array
                const dataArray = data ? Object.values(data) : [];

                // Chart data and options
                const lineChartData = {
                    labels: dataArray.map((item: any) => item.id), // X-axis labels
                    datasets: [
                        {
                            label: 'Age',
                            data: dataArray.map((item: any) => parseFloat(item.Age) || 0), // Age data
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'Fare',
                            data: dataArray.map((item: any) => parseFloat(item.Fare) || 0), // Fare data
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            tension: 0.4,
                        },
                    ],
                };
                console.log(lineChartData)
                const lineChartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: 'Titanic Dataset Analysis',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Passenger ID',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Values',
                            },
                        },
                    },
                };

                // Pie chart data
                const pieChartData = {
                    labels: ['Male survived', 'Female Survived', 'Male dead', 'Female dead'], // Pie part labels
                    datasets: [
                        {
                            data: dataArray.reduce(
                                (acc, curr) => {
                                    if (curr.Survived === 1 && curr.Sex === 'male') acc[0]++; // Male survived
                                    if (curr.Survived === 1 && curr.Sex === 'female') acc[1]++; // Female survived
                                    if (curr.Survived === 0 && curr.Sex === 'male') acc[2]++; // Male dead
                                    if (curr.Survived === 0 && curr.Sex === 'female') acc[3]++; // Female dead
                                    return acc;
                                },
                                [0, 0, 0, 0] // Initial counts
                            ),
                            tension: 0.4,
                        },
                    ],
                };


                return (
                    <Grid container spacing={2}>
                        <Grid item md={8} xs={12}>
                            <h2>Titanic Data Chart</h2>
                            {/* Height and width is fixed but maxwidth allows to be responsive */}
                            <Line data={lineChartData} options={lineChartOptions} id={'line_chart_unique'} />
                        </Grid >
                        <Grid item md={4} xs={12}>
                            <h2>Gender survival rate</h2>
                            <Pie data={pieChartData} id={'pie_chart_unique'} />
                        </Grid >
                    </Grid>

                );
            }}
        />
    </ListBase>
);
