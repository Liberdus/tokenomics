import React from "react";
import {jsPDF} from "jspdf";
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import EthereumPrice from ".././components/SimData/eth-price.txt";
import EthereumTX from ".././components/SimData/eth-tx-vol.txt";
import BSCPrice from ".././components/SimData/bnb-price.txt";
import BSCTX from ".././components/SimData/bsc-tx-vol.txt";
import AvaxPrice from ".././components/SimData/avax-price.txt";
import AvaxTX from ".././components/SimData/avax-tx-vol.txt";
import SuiPrice from ".././components/SimData/sui-price.txt";
import SuiTX from ".././components/SimData/sui-tx-vol.txt";
import NearPrice from ".././components/SimData/near-price.txt";
import NearTX from ".././components/SimData/near-tx-vol.txt";
import SolanaPrice from ".././components/SimData/sol-price.txt";
import SolanaTX from ".././components/SimData/sol-tx-vol.txt";
import CardanoPrice from ".././components/SimData/car-price.txt";
import CardanoTX from ".././components/SimData/car-tx-vol.txt";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default class Simulations extends React.Component {
  state = {
    NodeTPS: 2,
    Nodes: 600,
    NodesPerShard: 120,
    NetworkTPS: 20,
    TXfees: 0.01,
    NodeRewardPerHour: 1,
    Stake: 1000,
    StabilityFactor: 1,
    LIBValue: 1,
    AvgTxFee: 0,
    ActiveNodes: 0,
    SeverRentPerHour: 0.2,
    TPSPerNode: 2,
    LIBSupply: 63000000,
    StandbyRatio: 0,
    RevenuePerDay: 0,
    ExpensePerDay: 0,
    IncomePerDay: 0,
    APYPerYear: 0,
    MarketAPY: 10,
    NetworkRevenuePerDay: 0,
    NetworkExpensePerDay: 0,
    NetworkIncomePerDay: 0,
    NetworkDeltaPerDay: 0,
    MinNodes: 600,
    CustomTXChecked: false,
    CustomDisabled: true,
    CustomPriceFileChecked: false,
    CustomTXFileChecked: false,
    CustomPriceFileDisabled: false,
    CustomTXFileDisabled: false,
    priceData: [],
    txvolData: [],
    MaxLIBReached: 0,
    isSimulationRunning: false,
  };

  onRunSimulation = () => {

        if (this.state.priceData.length === 0) {

      alert('Please upload a valid price file.');
      return;
    }
    if (this.state.txvolData.length === 0) {
      alert('Please upload a valid tx volume file.');
      return;
    }
    this.setState({ isSimulationRunning: true });
    // Call your simulation logic here, e.g., this.onDrawChart()
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For a smooth scrolling effect
    });
    this.onDrawChart();
  };

onEditSimulation = () => {
  this.setState({ isSimulationRunning: false }, () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For a smooth scrolling effect
    });

    // Call your simulation logic
    this.onDrawChart();
  });
};

  onCustomPriceFileCheckedChange = (event) => {
    this.setState({
      CustomPriceFileChecked: !this.state.CustomPriceFileChecked,
      CustomPriceFileDisabled: !this.state.CustomPriceFileDisabled
    });
    document.querySelector("#priceFile").classList.toggle('FileShown');
    document.querySelector("#priceFile").classList.toggle('FileHidden');

    document.querySelector(".FileSelect").selectedIndex = 0;
  };

  onCustomTXFileCheckedChange = (event) => {
    this.setState({
      CustomTXFileChecked: !this.state.CustomTXFileChecked,
      CustomTXFileDisabled: !this.state.CustomTXFileDisabled
    });
    document.querySelector("#txvolData").classList.toggle('FileShown');
    document.querySelector("#txvolData").classList.toggle('FileHidden');
    document.querySelector(".TXSelect").selectedIndex = 0;

  };

  onDrawChart = (event) => {

    // the amount of data points for price and tx volume may be different.
    // we assume the most current data point is for the same day.
    // select only the part where both have data points
    const minData = Math.min(this.state.priceData.length, this.state.txvolData.length)

    if (this.state.priceData.length === 0) {

      alert('Please upload a valid price file.');
      return;
    }
    if (this.state.txvolData.length === 0) {
      alert('Please upload a valid tx volume file.');
      return;
    }

     let priceData = [...this.state.priceData].splice(0, minData) 
    let txvolData = [...this.state.txvolData].splice(0, minData)




    const canvas = document.getElementById('simChart');
    const ctx = canvas.getContext('2d');

    if (window.myChart) {
      window.myChart.destroy();
    }

    const priceDataset = priceData.map((value, index) => {
      return {x: index, y: value};

    });
    const txvolDataset = txvolData.map((value, index) => {
      return {x: index, y: value};
    });

    const activeDataset = txvolData.map((value, index) => {
      return {
        x: index,
        y: Math.max(this.state.MinNodes, value / 86400 / this.state.TPSPerNode * this.state.NodesPerShard)
      };
    });

    const netrevDataset = txvolData.map((value, index) => {
      return {
        x: index,
        y: value * this.state.AvgTxFee
      };
    });
    const netexpDataset = activeDataset.map((value, index) => {
      return {
        x: index,
        y: value.y * this.state.NodeRewardPerHour * 24
      };
    });
    const netincDataset = netrevDataset.map((value, index) => {
      return {
        x: index,
        y: value.y - netexpDataset[index].y
      };
    });
    const libdelDataset = netincDataset.map((value, index) => {
      return {
        x: index,
        y: value.y / priceDataset[index].y
      };

    });
    let libsup = 0
    const libsupDataset = libdelDataset.map((value, index) => {
      libsup -= value.y
      return {x: index, y: libsup};

    });

    this.setState({
      MaxLIBReached: Math.max(...libsupDataset.map(o => o.y))

    })

    document.querySelector(".chartBox").style.display = "block";

    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Tx Volume',
            data: txvolDataset,
            borderColor: 'rgb(75, 192, 192)',
            tension: 1,
            yAxisID: 'y-txvol'
          }, {
            label: 'Price Data',
            data: priceDataset,
            borderColor: 'rgb(255, 99, 132)',
            tension: 1,
            yAxisID: 'y-price'
          }, {
            label: 'Active Nodes',
            data: activeDataset,
            borderColor: 'rgb(200, 99, 200)',
            tension: 1,
            yAxisID: 'y-active'
          }, {
            label: 'Supply Data',
            data: libsupDataset,
            borderColor: 'rgb(132, 99, 255)',
            tension: 1,
            yAxisID: 'y-libsup'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: "Node Reward Simulation"
          },
          legend: {
            display: true
          },
          colors: {
            enabled: true
          }
        },
        scales: {
          x: {
            display: true,
            type: 'linear',
            title: {
              display: true,
              text: 'Days Since Genesis'
            },
            min: 0,
            max: minData ,
            ticks: {
              callback: (value, index, values) => {
                return value.toFixed(0);
              }
            }
          },
          'y-price': {
            display: false
          },
          'y-txvol': {
            display: false,
            type: 'logarithmic',
            position: 'right',
            title: {
              display: true,
              text: 'Tx Volume'
            },
            min: 0,
            max: Math.max(...txvolData)
          },

          'y-libsup': {
            display: true,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'LIB Supply'
            },
            min: 0
          },
          'y-active': {
            display: false,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Active Nodes'
            },
            min: Math.min.apply(null, activeDataset.map(function(a) {
              return a.y;
            })),
            max: Math.max.apply(null, activeDataset.map(function(a) {
              return a.y;
            })),
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
    document.querySelector(".paramChange").classList.remove('FileShown');
  };

  onPriceFileChange = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split('\n');
      this.setState({
        priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

      })
    };

    reader.readAsText(file);
    document.querySelector(".paramChange").classList.add('FileShown');

  }

  onPriceFileSelect = (event) => {

    async function getFile(fileURL) {
      let fileContent = await fetch(fileURL);
      fileContent = await fileContent.text();
      return fileContent;
    }
    console.log(document.querySelector(".FileSelect").value);

    if (document.querySelector(".FileSelect").value === "Ethereum") {

      // Passing file url
      getFile(EthereumPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".FileSelect").value === "Solana") {

      getFile(SolanaPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } 


    else if (document.querySelector(".FileSelect").value === "Cardano") {

      getFile(CardanoPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".FileSelect").value === "BNB Smart Chain") {

      getFile(BSCPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".FileSelect").value === "Sui") {

      getFile(SuiPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });
       } else if (document.querySelector(".FileSelect").value === "Avalanche") {

      getFile(AvaxPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });
        } else if (document.querySelector(".FileSelect").value === "Near") {

      getFile(NearPrice).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          priceData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    }
    document.querySelector(".paramChange").classList.add('FileShown');
  }

  onTXFileSelect = (event) => {

    async function getFile(fileURL) {
      let fileContent = await fetch(fileURL);
      fileContent = await fileContent.text();
      return fileContent;
    }

    if (document.querySelector(".TXSelect").value === "Ethereum") {

      // Passing file url
      getFile(EthereumTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".TXSelect").value === "Solana") {

      getFile(SolanaTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".TXSelect").value === "BNB Smart Chain") {

      getFile(BSCTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });

    } else if (document.querySelector(".TXSelect").value === "Sui") {

      getFile(SuiTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });
        } 
        else if (document.querySelector(".TXSelect").value === "Avalanche") {

      getFile(AvaxTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });
    }


            else if (document.querySelector(".TXSelect").value === "Cardano") {

      getFile(CardanoTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });
    }
     else if (document.querySelector(".TXSelect").value === "Near") {

      getFile(NearTX).then(content => {
        // Using split method and passing "\n" as parameter for splitting
        let lines = content.trim().split("\n");
        this.setState({
          txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))

        })
      }).catch(error => {
        console.log(error);
      });
    }
    document.querySelector(".paramChange").classList.add('FileShown');
  }

  onTxFileChange = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split('\n');
      this.setState({
        txvolData: lines.map(line => parseFloat(line)).filter(value => !isNaN(value))
      })
    };

    reader.readAsText(file);
    document.querySelector(".paramChange").classList.add('FileShown');
  }

  componentDidMount() {
    this.setState({
      AvgTxFee: this.state.TXfees * 2,
      ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
      StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
    }, () => this.updateIncome());
  };

  onCustomTXCheckedChange = (event) => {
    this.setState({
      CustomTXChecked: !this.state.CustomTXChecked,
      CustomDisabled: !this.state.CustomDisabled
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');
  };

  onNodesPerShardChange = (event) => {
    this.setState({
      NodesPerShard: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');
  };

  onTXfeesChange = (event) => {
    this.setState({
      TXfees: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onNodeRewardPerHourChange = (event) => {
    this.setState({
      NodeRewardPerHour: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onStakeChange = (event) => {
    this.setState({
      Stake: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onStabilityFactorChange = (event) => {
    this.setState({
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onMinNodesChange = (event) => {
    this.setState({
      MinNodes: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  updateMonitoring = (event) => {
    if (this.state.CustomTXChecked === true) {
      if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.AvgTxFee,
          ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      } else {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.AvgTxFee,
          ActiveNodes: this.state.MinNodes,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      }
    } else {
      if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.TXfees * 2,
          ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      } else {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.TXfees * 2,
          ActiveNodes: this.state.MinNodes,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      }

    }

  };

  onLIBValueChange = (event) => {
    this.setState({
      LIBValue: event.target.value,
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onAvgTxFeeChange = (event) => {
    this.setState({
      AvgTxFee: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onNetworkTPSChange = (event) => {
    this.setState({
      NetworkTPS: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onActiveNodesChange = (event) => {
    this.setState({
      ActiveNodes: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onSeverRentPerHourChange = (event) => {
    this.setState({
      SeverRentPerHour: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onTPSPerNodeChange = (event) => {
    this.setState({
      TPSPerNode: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onLIBSupplyChange = (event) => {
    this.setState({
      LIBSupply: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  onMarketAPYChange = (event) => {
    this.setState({
      MarketAPY: event.target.value
    }, () => this.updateMonitoring());
    document.querySelector(".paramChange").classList.add('FileShown');

  };

  updateIncome = (event) => {
    this.setState({
      RevenuePerDay: this.state.NodeRewardPerHour * 24 / (this.state.StandbyRatio + 1),
      ExpensePerDay: this.state.SeverRentPerHour * 24,
      NetworkRevenuePerDay: this.state.NetworkTPS * 86400 * this.state.AvgTxFee,
      NetworkExpensePerDay: this.state.ActiveNodes * this.state.NodeRewardPerHour * 24,
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor
    }, () => this.updateIncomeDay());
  };

  updateIncomeDay = (event) => {
    this.setState({
      NetworkIncomePerDay: this.state.NetworkRevenuePerDay - this.state.NetworkExpensePerDay,
      IncomePerDay: this.state.RevenuePerDay - this.state.ExpensePerDay
    }, () => this.updateAPY());
  };

  updateAPY = (event) => {
    this.setState({
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor,
      APYPerYear: 100 * this.state.IncomePerDay * 365 / this.state.Stake
    })
  };

  onToggleChart = (event, myChart) => {
    const chartBox = document.querySelector(".chartBox");
    chartBox.classList.toggle("fullScreen");

    console.log(window.myChart.config._config.options.maintainAspectRatio);

    if (window.myChart.config._config.options.maintainAspectRatio === true) {
      window.myChart.config._config.options.maintainAspectRatio = false;
    } else {
      window.myChart.config._config.options.maintainAspectRatio = true;
    }

    document.querySelector(".holder").classList.toggle('open');
    window.myChart.update()

  }

onDownloadPDF = (event) => {
  const canvas = document.querySelector("#simChart");
  const canvasCopy = document.createElement("canvas");
  const context = canvasCopy.getContext("2d");

  // Set the canvas size to match the original canvas
  canvasCopy.width = canvas.width;
  canvasCopy.height = canvas.height;

  // Fill the canvas with a white background
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the original canvas on top of the white background
  context.drawImage(canvas, 0, 0);

  // Get the image data from the modified canvas
  const canvasImage = canvasCopy.toDataURL("image/jpeg", 1.0);

  // Create the PDF and add the image
  let pdf = new jsPDF("landscape");
  pdf.setFontSize(20);
  pdf.addImage(canvasImage, 'JPEG', 10, 25, 280, 150);
  pdf.text("Liberdus Simulation Download", 10, 15);
  pdf.save("Liberdus_Simulation.pdf");
};


  getNumber = (labelValue) => {

    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

          : Math.abs(Number(labelValue));

  }

  render() {

    return (<>



<div className="bg-white min-h-screen w-full">

            <div
            className={`container mx-auto lg:px-4 flex flex-col lg:flex-row gap-4 transition-all duration-300 ${
              this.state.isSimulationRunning ? "hidden" : "block"
            }`}
          >

  
    {/* First Column */}

             <div className='bg-white  rounded-lg py-4 lg:py-0 flex-grow'>

        <div
  aria-current="step"
  className="flex flex-col border-l-4 border-purple py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
>
  <div className="tooltip tooltip-bottom" data-tip="Configure the Network, DAO, and Monitoring variables below to define the desired network scenario.">
    <span className="text-md font-semibold text-purple flex items-center text-left">
      Step 1 - Input Network Parameters
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 ml-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    </span>
  </div>

      {/* Split into Two Sections */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section: Network and FDAO Controls */}
        <div className="flex-1">
          {/* Network Form */}
          


          {/* Network Section */}
<div className="p-4 rounded-lg shadow">
  <h3 className="font-semibold text-darkGrey mb-4">Network</h3>

  {/* Nodes per Shard */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text text-darkGrey">Nodes per Shard</span>
    </label>
    <div className="tooltip" data-tip="Determines security and redundancy of the network">
      <label className="input-group text-darkGrey">
        <input
          type="text"
          value={this.state.NodesPerShard}
          className="input input-bordered"
          onChange={this.onNodesPerShardChange}
        />
        <span>Nodes</span>
      </label>
    </div>
  </div>

  {/* Min Nodes */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Min Nodes</span>
    </label>
    <div className="tooltip" data-tip="This is the minimum number of nodes the network must have regardless of how low the TPS is. This is needed in order to maintain a certain level of decentralization.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.MinNodes}
          className="input input-bordered"
          onChange={this.onMinNodesChange}
        />
        <span>Nodes</span>
      </label>
    </div>
  </div>
</div>

        
      
    

{/* FDAO Controls */}
<div className="p-4 rounded-lg mt-4 shadow">
  <h3 className="font-semibold mb-4">FDAO Controls</h3>

  {/* Tx Fee */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Tx Fee $</span>
    </label>
    <div className="tooltip" data-tip="This is the target fee for a token transfer transaction. LIB transfer will be less; AMM txs will be more.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.TXfees}
          className="input input-bordered"
          onChange={this.onTXfeesChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Node Reward */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Node Reward $/hr</span>
    </label>
    <div className="tooltip" data-tip="This defines how much each active node in the network receives as dollars per hour. Although it is specified in $, it is paid out in LIB.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.NodeRewardPerHour}
          className="input input-bordered"
          onChange={this.onNodeRewardPerHourChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Stake Amount */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Stake Amount $</span>
    </label>
    <div className="tooltip" data-tip="The amount of LIB a node must stake in order to join the network. Specified in $ but staked in LIB based on price set by Stability factor. Some or all of the stake can be lost if node misbehaves or falls behind in processing. This ensures that operators run nodes on good hardware.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.Stake}
          className="input input-bordered"
          onChange={this.onStakeChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Stable Price */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Stable Price $/LIB</span>
    </label>
    <div className="tooltip" data-tip="Same as LIB price, but set by FDAO into the network. Updated about once a day. Used by the network to determine the LIB amount for target Tx Fee, Node reward, and Stake amount.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.LIBValue}
          className="input input-bordered"
          disabled
          onChange={this.onStabilityFactorChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>
</div>
    </div>



        {/* Right Section: FDAO Monitoring and Continued */}
        <div className="flex-1">
  {/* FDAO Monitoring */}
  <div className="p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-4">FDAO Monitoring</h3>

    {/* LIB Price */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">LIB Price $</span>
      </label>
      <div className="tooltip" data-tip="FDAO uses this to set the Stability Factor. Stability factor changed about once a day.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.LIBValue}
            className="input input-bordered"
            onChange={this.onLIBValueChange}
          />
          <span>USD</span>
        </label>
      </div>
    </div>

    {/* Average Tx Fee */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">Average Tx Fee $</span>
      </label>
      <div className="tooltip" data-tip="This is the actual average tx fees on the network. Typically will be more than the target Tx Fee set by FDAO. Maybe about 2x the target Tx Fee.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.AvgTxFee}
            className="input input-bordered"
            disabled={this.state.CustomDisabled}
            onChange={this.onAvgTxFeeChange}
          />
          <span>USD</span>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text customLabel">Use custom TX Fee</span>
            <input
              type="checkbox"
              checked={this.state.CustomTXChecked}
              className="checkbox checkbox-purple"
              onChange={this.onCustomTXCheckedChange}
            />
          </label>
        </div>
      </div>
    </div>

    {/* Network TPS */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">Network TPS</span>
      </label>
      <div className="tooltip" data-tip="This is the actual TPS of the network. On BSC and Polygon this is about 40 TPS.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.NetworkTPS}
            className="input input-bordered"
            onChange={this.onNetworkTPSChange}
          />
          <span>TPS</span>
        </label>
      </div>
    </div>

    {/* Active Nodes */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">Active Nodes</span>
      </label>
      <div className="tooltip" data-tip="This is the actual number of nodes the network needs to process the Network TPS. There is a minimum number of nodes the network must have. Network TPS / Node TPS * Nodes/shard or min of 600 nodes.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.ActiveNodes}
            className="input input-bordered"
            disabled
          />
          <span>Nodes</span>
        </label>
      </div>
    </div>
    {/* Market APY */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Market APY</span>
    </label>
    <div className="tooltip" data-tip="This represents what current market APY is for other investment options. For example, putting money into a CD or bond. Node operators will look at this and compare it to the APY they can earn by running a node. The number of nodes in standby will adjust so that the APY for running a node will get close to this market APY.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.MarketAPY}
          className="input input-bordered"
          onChange={this.onMarketAPYChange}
        />
        <span>%</span>
      </label>
    </div>
  </div>

  {/* Standby Ratio */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Standby Ratio #</span>
    </label>
    <div className="tooltip" data-tip="Standby / Active ratio. Increasing the node reward will increase this. Will probably increase until the APY is close to Market APY. Standby ratio = Node reward x 24 / (Market APY x Stake amount / 365 x 100 + Server rent x 24). If Standby ratio < 1 then set it to 1.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.StandbyRatio.toFixed(2)}
          className="input input-bordered"
          disabled
          onChange={this.onStandbyRatioChange}
        />
        <span>S:A</span>
      </label>
    </div>
  </div>

  {/* Server Rent */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Server Rent $/hr</span>
    </label>
    <div className="tooltip" data-tip="On Linode.com $0.20/hr gets 8 cores, 16 GB RAM, 320 GB SSD, 6 TB/mo transfer, 40 Gbps download / 6 Gbps upload.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.SeverRentPerHour}
          className="input input-bordered"
          onChange={this.onSeverRentPerHourChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Node TPS */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Node TPS #/s</span>
    </label>
    <div className="tooltip" data-tip="Cool TPS per node; about 20% of Max TPS; a node can easily handle this TPS.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.TPSPerNode}
          className="input input-bordered"
          onChange={this.onTPSPerNodeChange}
        />
        <span>TPS</span>
      </label>
    </div>
  </div>

  {/* LIB Supply */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">LIB Supply #</span>
    </label>
    <div className="tooltip" data-tip="Supply is used to guide decisions on the parameters the FDAO sets. Must keep this below 63,000,000 LIB. It can go up and down based on Network Income. LIB Supply = LIB Supply - LIB Delta.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.LIBSupply}
          className="input input-bordered"
          disabled
          onChange={this.onLIBSupplyChange}
        />
        <span>LIB</span>
      </label>
    </div>
  </div>
  </div>
</div>




      
        </div>

      </div>

    </div>

{/* Second Column (Sticky) */}
<div className="bg-white rounded-lg lg:sticky top-4 h-fit lg:w-[28%]">

  
  {/* Price File Selection */}
<div
  aria-current="step"
  className="flex flex-col border-l-4 border-purple py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
>
  <div className="tooltip" data-tip="Select a price and transaction file. This data, combined with the parameters set in Step 1, will be used to simulate the LIB supply.">
    <span className="text-md font-semibold text-purple flex items-center text-left">
      Step 2 - Select Data
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 ml-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    </span>
  </div>

  <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Pick a price file</span>
    </label>
    <select
      className="select select-bordered FileSelect"
      disabled={this.state.CustomPriceFileDisabled}
      onChange={this.onPriceFileSelect}
    >
      <option disabled selected>Pick one</option>
      <option>Avalanche</option>
      <option>BNB Smart Chain</option>
      <option>Cardano</option>
         <option>Ethereum</option>
       <option>Near</option>
          
       <option>Solana</option>
       <option>Sui</option>
   
    </select>

    <div className="form-control mt-2">
      <label className="label cursor-pointer">
        <span className="label-text">Upload custom price file</span>
        <input
          type="checkbox"
          checked={this.state.CustomPriceFileChecked}
          className="checkbox checkbox-purple"
          onChange={this.onCustomPriceFileCheckedChange}
        />
      </label>
    </div>

    <input
      type="file"
      className="file-input file-input-bordered w-full max-w-xs mt-2 FileHidden"
      id="priceFile"
      name="priceFile"
      accept=".txt"
      onChange={this.onPriceFileChange}
    />
  </div>

  {/* Transaction File Selection */}
  <div className="form-control w-full max-w-xs mt-4">
    <label className="label">
      <span className="label-text">Pick a transaction file</span>
    </label>
    <select
      className="select select-bordered TXSelect"
      disabled={this.state.CustomTXFileDisabled}
      onChange={this.onTXFileSelect}
    >
      <option disabled selected>Pick one</option>
      <option>Avalanche</option>
      <option>BNB Smart Chain</option>
      <option>Cardano</option>
         <option>Ethereum</option>
       <option>Near</option>
        
       <option>Solana</option>
       <option>Sui</option>
    </select>

    <div className="form-control mt-2">
      <label className="label cursor-pointer">
        <span className="label-text">Upload custom transaction file</span>
        <input
          type="checkbox"
          checked={this.state.CustomTXFileChecked}
          className="checkbox checkbox-purple"
          onChange={this.onCustomTXFileCheckedChange}
        />
      </label>
    </div>

    <input
      type="file"
      className="file-input file-input-bordered w-full max-w-xs mt-2 FileHidden"
      id="txvolData"
      name="txvolData"
      accept=".txt"
      onChange={this.onTxFileChange}
    />
  </div>
  </div>

  {/* Simulation Button */}
<div
  aria-current="step"
  className="flex flex-col border-l-4 border-purple py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 mt-4"
>
  <div className="tooltip" data-tip="Run the simulation to observe how the LIB supply changes based on LIB issued to node operators. If the supply exceeds the maximum limit of 63 million LIB, adjust the network parameters to achieve equilibrium.">
    <span className="text-md font-semibold text-purple flex items-center text-left">
      Step 3 - Run Simulation
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 ml-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    </span>
  </div>
</div>
  <button className="btn mt-5 w-full" onClick={this.onRunSimulation}>Run Simulation</button>
<div className="label-text customLabel pt-5 paramChange FileHidden FileShown">*Parameters updated please re-run simulation</div>
</div>



  </div>
          <div className="flex flex-wrap">

      <div
            className={`flex-1 chart w-100  ${
              this.state.isSimulationRunning ? "block" : "hidden"
            }`}
          >

      <div className="chartCard">
<div className="chartCard w-full max-w-full">
  <div className="chartBox">
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 auto-rows-auto">
      {/* Revenue/day */}
      <div className="stats shadow rounded-lg bg-white">
        <div className="stat">
          <div className="stat-title text-sm font-medium text-gray-500">Revenue/day</div>
          <div className="stat-value lg:text-3xl font-semibold text-gray-900">
            {"$" + this.state.RevenuePerDay.toFixed(2)}
          </div>
          <div className="stat-desc text-sm text-gray-500 whitespace-normal">
            Node reward * 24 / Standby ratio
          </div>
        </div>
      </div>

      {/* Expense/day */}
      <div className="stats shadow rounded-lg bg-white">
        <div className="stat">
          <div className="stat-title text-sm font-medium text-gray-500">Expense/day</div>
          <div className="stat-value lg:text-3xl font-semibold text-gray-900">
            {"$" + this.state.ExpensePerDay.toFixed(2)}
          </div>
          <div className="stat-desc text-sm text-gray-500 whitespace-normal">
            Expense $/day
          </div>
        </div>
      </div>

      {/* Income/day */}
      <div className="stats shadow rounded-lg bg-white">
        <div className="stat">
          <div className="stat-title text-sm font-medium text-gray-500">Income/day</div>
          <div className="stat-value lg:text-3xl font-semibold text-gray-900">
            {"$" + this.state.IncomePerDay.toFixed(2)}
          </div>
          <div className="stat-desc text-sm text-gray-500 whitespace-normal">
            Income = Revenue - Expense
          </div>
        </div>
      </div>

      {/* APY/year */}
      <div className="stats shadow rounded-lg bg-white">
        <div className="stat">
          <div className="stat-title text-sm font-medium text-gray-500">APY/year</div>
          <div className="stat-value lg:text-3xl font-semibold text-gray-900">
            {this.state.APYPerYear.toFixed(0) + "%"}
          </div>
          <div className="stat-desc text-sm text-gray-500 whitespace-normal">
            100 * Income * 365 / Stake
          </div>
        </div>
      </div>

      {/* Peak LIB Supply */}
      <div className="stats shadow rounded-lg bg-white">
        <div className="stat">
          <div className="stat-title text-sm font-medium text-gray-500">Peak LIB Supply</div>
          <div className="stat-value lg:text-3xl font-semibold text-gray-900">
            {this.getNumber(this.state.MaxLIBReached)}
          </div>
          <div className="stat-desc text-sm text-gray-500 whitespace-normal">
            Max(all daily supply)
          </div>
        </div>
      </div>
    </div>
  </div>










          <div className="holder"   style={{ position: "relative", height: "60vh" }}>
            <span id="info"/>
            <canvas id="simChart"/>
          </div>
          <button className="btn side mt-5 w-full" onClick={this.onEditSimulation}>Edit Simulation</button>
          <button className="btn side secondary" onClick={this.onDownloadPDF}>Download PDF</button>
        </div>
      </div>

    </div>

    < /div>


</div>




      

</ >);
  }
}
