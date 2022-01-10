import React from 'react'
import  { useEffect, useState } from "react";
import { Line, Pie } from 'react-chartjs-2'
import 'chart.js/auto';
import { useParams } from 'react-router';


//defaults.global.tooltips.enabled = false
//defaults.global.legend.position = 'bottom'

const Charts = () => {
  const projectid=useParams().pid;
  var completed=0;
  var uncompleted=0;
  var planned=0;
  const[listaZadataka, setListaZadataka] = useState('');
  const[listaBurndown, setListaBurndown] = useState('');
// __________________________---DOHVACANJE SVIH ZADATAKA---______________________________________________
  const getZadatci = async projectid => {
    try {       
            const response = await fetch(
                `http://localhost:5000/task/allprojecttasks/${projectid}`,
            {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-type": "application/json"
              },
              
            }
        );
        const jsonData = await response.json();

        setListaZadataka(jsonData);
        
    } catch (err) {
        console.error(err.message);
        
    }
}

const getBurndown = async projectid => {
  try {       
          const response = await fetch(
              `http://localhost:5000/project/getProjectStatistics/${projectid}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            
          }
      );
      const jsonData = await response.json();

      setListaBurndown(jsonData);
      
      console.log(listaBurndown)
  } catch (err) {
      console.error(err.message);
      
  }
}

useEffect(() => {
  getZadatci(projectid);
  getBurndown(projectid);
}, []);

if(listaZadataka !== ''){
Object.values(listaZadataka)
  .filter(zadatak => zadatak.idstatusa === 2)
  .map((zadatak) => {uncompleted+=1})
Object.values(listaZadataka)
  .filter(zadatak => zadatak.idstatusa === 3)
  .map((zadatak) => {completed+=1})
Object.values(listaZadataka)
  .filter(zadatak => zadatak.idstatusa === 1)
  .map((zadatak) => {planned+=1})
}


//__________________BURNDOWN CHART FUNKCIJE I VARIJABLE___________________________________
const burndownData=[200, 160, 160, 140, 90, 90, 80, 50, 30, 8];
const scopeChange=[0, 0, 0, 0, 0, 32, 0, 0, 0, 0]

//defaults.global.defaultFontFamily = "Arial";
//Chart.defaults.global.defaultFontSize = 14;

const brojDovrsenihZadataka = burndownData[0];
const idealniBrojZadataka = brojDovrsenihZadataka / 9;
var i = 0;

function sumArrayUpTo(arrData, index) {
  var total = 0;
  for (var i = 0; i <= index; i++) {
    if (arrData.length > i) {
      total += arrData[i];
        }
  }
  return total;
}
//______________________________________________________________________________________________
  return (
    <div>
      <div>
      <Pie style={ { fontsize:"30" }}
        data={{
          labels: ['Završeni', 'U tijeku','Planirani'],
          datasets: [
            {
              label: '# zadataka',
              data: [completed, uncompleted, planned],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
                
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
                
              ],
              borderWidth: 1,
            },
            
          ],
        }}
        height={400}
        width={600}
        options={{
          title:{
            display:true
          },
        
          legend: {
            labels: {
              font: {
                size: 25
            }
            },
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          }
          
        }}
      />
      </div>

      <div>
      <Line
      data={{
        labels:[ "Prvi dan",	"Drugi dan",	"Treći dan",	"Četvrti dan",	"Peti dan",	"Šesti dan",	"Sedmi dan",	"Osmi dan",	"Deveti dan", "Deseti dan"],
        datasets: [
          {
            label: "Burndown",
            data: burndownData,
            fill: false,
            borderColor: "#EE6868",
            backgroundColor: "#EE6868",
            lineTension: 0,
          },
          {
            label: "Idealno",
            borderColor: "#6C8893",
            backgroundColor: "#6C8893",
            lineTension: 0,
            borderDash: [5, 5],
            fill: false,
            data: [
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 0)), // 1
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 1)), // 2
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 2)), // 3
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 3)), // 4
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 4)), // 5
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 5)), // 6
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 6)), // 7
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 7)), // 8
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 8)), // 9
              Math.round(brojDovrsenihZadataka - (idealniBrojZadataka * i++) + sumArrayUpTo(scopeChange, 9))  // 10
            ]
          }
        ],
      }}
      height={400}
      width={800}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min:0,
                max: Math.round(burndownData[0]+1.1),
              },
            },
          ],
        },
        legend: {
          display:true,
          position:'top',
          labels:{
            fontSize:25,
            boxWidth:80,
            fontColor:'black'
          }
        },
        
      }}
    />
    </div>

    </div>
   
  )
}

export default Charts