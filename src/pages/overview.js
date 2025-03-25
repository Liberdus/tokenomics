import {useState} from "react";

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


import TPSCalc from "../components/components/TPSCalc";
import {ScalingData} from '../components/charts/data/ScalingData.js';
import ScalingChart from "../components/charts/ScalingChart.js";
import {LinearData} from '../components/charts/data/LinearData.js';
import {EthModelData} from '../components/charts/data/EthModelData.js';
import {AlgoModelData} from '../components/charts/data/AlgoModelData.js';
import SAChart from "../components/charts/SAChart";
import EthChart from "../components/charts/EthChart";

import paramSim1 from "../components/images/param_sim_1.png";
import paramSim2 from "../components/images/param_sim_2.png";
import paramSim3 from "../components/images/param_sim_3.png";
import paramSim4 from "../components/images/param_sim_4.png";
import paramSim5 from "../components/images/param_sim_5.png";
import paramSim6 from "../components/images/param_sim_6.png";
import paramSim7 from "../components/images/param_sim_7.png";
import paramSim8 from "../components/images/param_sim_8.png";
import paramSim11 from "../components/images/param_sim_11.png";
import paramSim12 from "../components/images/param_sim_12.png";
import paramSim13 from "../components/images/param_sim_13.png";
import paramSim14 from "../components/images/param_sim_14.png";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



export default function Overview() {

    const [IssuanceData] = useState({
    labels: ScalingData.map((data) => data.Year),
    datasets: [
 {
        label: 'Reward Scaling',
        data: ScalingData.map((data) => data.Reward),
        yAxisID: 'y',
      }, {

      label: 'Reward Linear',
      data: LinearData.map((data) => data.Reward),
      yAxisID: 'y',
    }


    ]
  });


     const [chartData5] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [
 {
        label: 'Ethereum Model APR %',
        data: EthModelData.map((data) => data.APR_Multi),
        yAxisID: 'y',
      }


    ]
  });


  const [chartData7] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [

      {
             label: 'Algorand Model APR %',
             data: AlgoModelData.map((data) => data.APR_Multi),
             yAxisID: 'y',
           },

    ]
  });




  const [chartData6] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [
 {
        label: 'Ethereum Model Max S:A Ratio',
        data: EthModelData.map((data) => data.Max_SA_Ratio),
        yAxisID: 'y',
      },





    ]
  });



  const [chartData8] = useState({
    labels: EthModelData.map((data) => data.Day),
    datasets: [


      {
             label: 'Algorand Model Max S:A Ratio',
             data: AlgoModelData.map((data) => data.Max_SA_Ratio),
             yAxisID: 'y',
           },



    ]
  });


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl  lg:px-8">
        <div className="mx-auto mt-6 max-w-2xl lg:mx-0 lg:max-w-none lg:mt-0">
          <h1 className="text-2xl font-semibold text-purple">Liberdus Tokenomics Overview</h1>

{/* LIB Coin Fundamentals - Full Width H2 */}
<div className="mt-10 max-w-xl lg:max-w-none border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6">

  {/* H2 Spanning Both Columns */}
  <h2 className="text-xl font-semibold text-purple w-full mb-4">LIB Coin Fundamentals</h2>

  <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 text-base/7 text-lightGrey">
    
    {/* Left Column */}
    <div>
      <p>
        The native token of the Liberdus network is LIB, which also serves as its token ticker. LIB functions as the central unit of value in the Liberdus ecosystem, underpinning a wide spectrum of network activities. LIB adheres to a standard commonly used by many other tokens within the Ethereum ecosystem, with each token being divisible to 18 decimal places.
      </p>
    

      <p className="text-lg font-semibold mt-6">Token Utility</p>
      <ul className="list-decimal space-y-2 list-inside mt-4">
        <li><span className="font-semibold">Gas:</span> LIB acts as a gas token for transactions, including messaging and token transfers.</li>
         <li><span className="font-semibold">Fee Burning:</span> All transaction fees in LIB are burnt, supporting a capped elastic supply model.</li>
        <li><span className="font-semibold">Validator Staking:</span> Required to run a validator node to secure the network and earn LIB.</li>
         <li><span className="font-semibold">Toll:</span> Users can enable a toll mechanism requiring LIB payments for communication.</li>
         <li><span className="font-semibold">Liquidity Staking:</span> Adds LIB to an AMM to allow users to swap between LIB and other assets and earns LIB in addition to swap fees.</li>
        <li><span className="font-semibold">Governance:</span> LIB can be used for voting; these tokens are locked and burned.</li>
        <li><span className="font-semibold">Rewards:</span> LIB is distributed as a reward through airdrops and ecosystem incentives.</li>
        
       
       
      </ul>

      <p className="text-lg font-semibold mt-6">Monetary Policy</p>
      <p className="mt-4">
        The monetary policy of LIB is designed for stability and sustainability, drawing inspiration from the Shardeum tokenomics model.
      </p>
     <p className="mt-2">
        The maximum supply of LIB is <span className="font-semibold">210 million (210,000,000) coins</span>, inspired by Bitcoin’s capped model while ensuring sufficient availability for scalability.
      </p>
    </div>

    {/* Right Column */}
    <div>
      <p className="text-lg font-semibold mt-0">Scarcity Mechanisms</p>
      <p className="mt-4">LIB employs multiple scarcity mechanisms:</p>

      <ul className="list-decimal space-y-2 list-inside mt-2">
        <li>LIB has a capped elastic supply model, adjusting for inflationary or deflationary pressures.</li>
        <li>The 210 million LIB cap is immutable and cannot be altered.</li>
        <li>Transaction fees are burnt, increasing scarcity.</li>
        <li>Tokens <a href="/faq#faq-10" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">slashed</a> from misbehaving validators are permanently removed.</li>
        <li>Governance requires token burning, reducing supply.</li>
        <li>Growing transaction volumes increase deflationary pressure.</li>
      </ul>

      <p className="my-2">
        As adoption increases, LIB is designed to become more scarce, potentially leading to ultra-deflationary trends.
      </p>

      <p className="text-lg font-semibold mt-6">LIB Token Allocation</p>
      <p className="mt-4">Max Supply: <span className="font-semibold">210 million coins.</span></p>
      <p className="font-semibold">Distribution:</p>

      <ul className="list-disc space-y-2 list-inside">
        <li><span className="font-semibold">25%</span> - Direct contributors over 2 years (52.5M coins).</li>
        <li><span className="font-semibold">10%</span> - Operating expenses over 2 years (21M coins).</li>
        <li><span className="font-semibold">10%</span> - Distributed to Shardus (ULT) holders (21M coins).</li>
        <li><span className="font-semibold">25%</span> - Other communities (52.5M coins).</li>
        <li><span className="font-semibold">30%</span> - Network expenses (63M coins) for validators and LP providers.</li>
      </ul>

      <p className="mt-2">
        <span className="font-semibold">Note:</span> The max supply will never be reached as governance voting and transaction fees continuously burn coins.
      </p>
        {/* Link to  emissons */}
  <div className="mt-6 text-center">
    <a 
      href="/emissions" 
      className="text-purple font-semibold hover:underline"
    >
      See full emissons here →
    </a>
  </div>
    </div>

  </div>
</div>

{/* Full-Width: Design Considerations */}
<div className="mt-10 lg:col-span-2 border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6 text-base/7 text-lightGrey">
  
  <h2 className="text-xl font-semibold text-purple">Design Considerations</h2>

  {/* Full-Width Introductory Content */}
  <p className="mt-4">
    The first step in understanding why a unique issuance model is necessary is to examine how Liberdus scales from a hardware perspective. 
    Unlike traditional networks, Liberdus increases its network throughput (TPS) by expanding the number of active validator nodes.
  </p>
  <p className="mt-4">
    To achieve this, the network requires a pool of <a href="/faq#faq-11" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">standby nodes</a> that are ready to join as demand increases. 
    However, since <a href="/faq#faq-11" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">standby nodes</a> do not earn rewards, the incentives for active validator nodes must be sufficient to offset standby periods and ensure profitability.
  </p>
  <p className="mt-4">
    If the standby pool is insufficient, active validators can become overloaded, leading the network to reject transactions due to excessive traffic. To prevent this, the network needs the ability to adjust validator rewards to maintain a steady supply of <a href="/faq#faq-11" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">standby nodes</a>, ensuring scalability.
  </p>

  {/* Full-Width: Horizontal vs Vertical Scalability */}
  <div className="mt-8">
    <h2 className="text-lg font-semibold">Horizontal vs Vertical Scalability</h2>
    <p className="mt-4">
      The examples below compare two distinct methods of increasing network throughput (TPS): horizontal scaling and vertical scaling. 
      Each approach has its own advantages and limitations, impacting factors such as decentralization, scalability, and hardware requirements.
    </p>
  </div>

  {/* Two-column layout for Scaling Comparisons */}
  <div className="mt-6 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 text-base/7 text-lightGrey">
    
    {/* Left Column - Horizontal Scaling */}
    <div className="flex flex-col">
      <p className="text-lg font-semibold">Horizontal Scaling by Example</p>
      <p className="mt-4">
        Liberdus utilizes horizontal scaling to expand network throughput (TPS). 
        This method increases capacity by adding more validator nodes with consistent hardware requirements while utilizing parallel processing.
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2 flex-grow">
        <li>Enables near-unlimited scalability as long as new nodes can be added.</li>
        <li>Maintains a low hardware cost, allowing for broader participation.</li>
        <li>Encourages decentralization by lowering barriers to entry.</li>
        <li>Network scales by increasing validator nodes rather than upgrading hardware, making it a cost-efficient and inclusive model.</li>
      </ul>
      <p className="mt-4 text-purple font-semibold">Interact below to demonstrate ↓</p>
    </div>

    {/* Right Column - Vertical Scaling */}
    <div className="flex flex-col">
      <p className="text-lg font-semibold">Vertical Scaling by Example</p>
      <p className="mt-4">
        In contrast, non-sharded networks rely on vertical scaling to increase their throughput (TPS). 
        Instead of adding new nodes, this method enhances the CPU, RAM, and network capacity of each existing node to handle more transactions.
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2 flex-grow">
        <li>Network throughput is constrained by the lowest-performing node.</li>
        <li>Even if high-end nodes join, the slowest node determines overall TPS.</li>
        <li>Requires expensive, specialized hardware to sustain network performance.</li>
        <li>Higher costs reduce validator participation and decentralization.</li>
        <li>Scaling by increasing node hardware has diminishing returns over time.</li>
      </ul>
      <p className="mt-4 text-purple font-semibold">Interact below to demonstrate ↓</p>
    </div>
  </div>

  {/* Full-Width TPS Calculator */}
  <div className="mt-4">
    <TPSCalc />
  </div>

  {/* Full-Width: Validator Stability Risks */}
  <div className="mt-10">
    <h2 className="text-lg font-semibold">Validator Stability Risks</h2>

    <p className="mt-4">
      Unstable validator numbers pose a significantly higher risk for a sharded horizontally scaling network like Liberdus. 
      If the network becomes unprofitable for node operators and the number of validators decreases, the network's throughput (TPS) also declines. 
      This could lead to probabilistic transaction rejections due to reduced TPS or even trigger network safety mode, temporarily halting transactions.
    </p>
    <p className="mt-4">
      These risks do not apply to non-sharded, vertically scaling networks. In such networks, throughput (TPS) is determined by the lowest-performing node rather than the number of active validators. Even if validator numbers drop, TPS remains unchanged. However, these networks are prone to high throughput risk: as transaction throughput approaches the network's maximum capacity, transaction fees increase, making the network unusable for low-value transactions.
    </p>
  </div>
</div>




{/* Full-Width: Analysis of Monetary Policies for Liberdus */}
<div className="mt-10 lg:col-span-2 border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6">
  <h2 className="text-xl font-semibold text-purple">Analysis of Monetary Policies for Liberdus</h2>

  {/* Two-column layout for introductory text */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 text-base/7 text-lightGrey">
    
    {/* Left Column */}
    <div>
      <p className="mb-4">
        Firstly, we analyzed pre-existing monetary policies of various Layer 1 networks to determine whether their issuance schedules were broadly applicable to Liberdus. We identified two prominent types of issuance schedules: scaled and linear issuance schedules.
      </p>

      <ScalingChart chartData={IssuanceData}/>
    </div>

    {/* Right Column */}
    <div>
     <h3 className="text-lg font-semibold">Scaled vs. Linear Issuance</h3>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>
          <span className="font-semibold">Scaled Issuance:</span> Reduces reward percentages through disinflation at different points. Bitcoin follows a halving mechanism (~4 years), while Solana reduces issuance annually with a 1.5% disinflation rate.
        </li>
        <li>
          <span className="font-semibold">Linear Issuance:</span> Mints a fixed amount of the network’s native asset over a period (e.g., Algorand).
        </li>
      </ul>

      <p className="mt-4">
        Neither of these issuance schedules were suitable for Liberdus, as they introduced inefficiencies, network unpredictability, unprofitability, or excessively high APY rates, all of which hinder long-term sustainability.
      </p>
      <h3 className="text-lg font-semibold mt-4">Testing Pre-existing Tokenomics Models</h3>
      <p className="mt-2">
        To further validate this, we conducted simulations to test how these pre-existing tokenomics models would impact LIB. The results confirmed that these models were not applicable due to inefficiencies. The optimal issuance model for LIB would always need to be adaptive, capable of adjusting to reach supply equilibrium based on network conditions.
      </p>
    </div>
  </div>

  {/* Full-Width: Impact of Issuance Schedules on Scaling Networks */}
  <div className="mt-10">
    <h3 className="text-lg font-semibold">Impact of Issuance Schedules on Scaling Networks</h3>
    <p className="mt-2">
      The graphs below illustrate how predefined issuance schedules can cause major APY% fluctuations in a horizontally scaling network:
    </p>

    <ul className="list-disc space-y-2 list-inside mt-2">
      <li>
        <span className="font-semibold">Bull Market Scenario (Ethereum-Like Case):</span> High token value leads to excessive node rewards and inefficiencies.
      </li>
      <li>
        <span className="font-semibold">Bear Market Scenario (Algorand-Like Case):</span> Declining asset prices make node operation unprofitable, reducing scalability.
      </li>
    </ul>

    <p className="mt-2">
      For a horizontally scaling network like Liberdus, these risks are amplified. A sudden decline in node operators could severely limit the network’s ability to process transactions, reducing scalability and network security.
    </p>
  </div>

  {/* APY & S:A Charts - First Row */}
  <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
    <EthChart chartData={chartData5} title={"Ethereum APY% Model (with scaling)"}/>
    <EthChart chartData={chartData7} title={"Algorand APY% Model (with scaling)"}/>
  </div>

  {/* Middle Text Section - Equilibrium Explanation */}
  <div className="mt-8">
    <p className="mb-4">
      In the Liberdus network, APY% is expected to naturally find equilibrium over time. When the network is highly profitable, the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> would increase, ensuring a surplus of <a href="/faq#faq-11" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">standby nodes</a>. Conversely, if profitability declines, the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> would decrease as fewer validators remain in standby.
    </p>

    <p>
      The graphs below illustrate how native token price fluctuations impact the network's scalability and efficiency. In a <span className="font-semibold">bull case scenario</span> (similar to Ethereum), the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> may become excessively high, leading to unnecessary computational waste. On the other hand, in a <span className="font-semibold">bear case scenario</span> (similar to Algorand), a low <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> could threaten network security and hinder scalability, potentially reducing transaction throughput (TPS).
    </p>
  </div>

  {/* APY & S:A Charts - Second Row */}
  <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
    <SAChart chartData={chartData6} title={"Ethereum S:A Ratio Model (with scaling)"}/>
    <SAChart chartData={chartData8} title={"Algorand S:A Ratio Model (with scaling)"}/>
  </div>

  {/* Conclusion */}
  <div className="mt-10">
    <h3 className="text-lg font-semibold">Conclusion</h3>
    <p className="mt-2">
      To maintain stability, decentralization, and scalability, Liberdus requires an adaptive monetary policy tailored for horizontally scaling architectures. This ensures validator profitability, flexible issuance, and sustainable network growth.
    </p>

    <p className="mt-4">
      Through our analysis, we deduced that the ideal issuance approach must be adaptable enough to:
    </p>

    <ul className="list-disc space-y-2 list-inside mt-2">
      <li>Ensure running a validator node on Liberdus is profitable while keeping hardware costs reasonable.</li>
      <li>Ensure the LIB supply always trends toward equilibrium (LIB burned = LIB issued), allowing the network to reward node operators indefinitely.</li>
      <li>Maintain the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> at a level that preserves Liberdus’s ability to scale without compromising security.</li>
      <li>Prevent excessive LIB issuance by keeping the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> optimized, avoiding unnecessary waste of computational and natural resources.</li>
      <li>Actively promote network efficiency by dynamically adjusting validator node rewards, ensuring operators receive just enough APY% to remain competitive with market rates.</li>
    </ul>

    <p className="mt-4">
      Existing monetary policies only addressed some of these factors. As a result, we developed a bespoke approach known as the capped elastic supply model, designed to meet all these criteria while supporting Liberdus’s long-term scalability and economic sustainability.
    </p>
  </div>
</div>




{/* Full-Width: Capped Elastic Supply Model */}
<div className="mt-10 lg:col-span-2 border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6">
  <h2 className="text-xl font-semibold text-purple">Capped Elastic Supply Model</h2>
  <p className="mt-4">
    A capped elastic supply model is a tokenomics framework in which the token issuance schedule remains elastic rather than predefined. Token issuance can be inflationary, deflationary, or disinflationary, depending on what is optimal in the current micro or macroeconomic environment.
  </p>
  <p className="mt-4">
    This model allows for optimal token issuance based on economic conditions while ensuring that total issuance never exceeds the maximum supply of 210 million LIB.
  </p>

  {/* Full-width: Adjustable Parameters within the Capped Elastic Supply Model */}
  <h3 className="text-xl font-semibold text-purple mt-6">Adjustable Parameters</h3>
  <p className="mt-2">
    The research above highlights that controlling the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> and maintaining supply equilibrium are critical for ensuring an efficient and stable network. Since it is impossible to predict every variable to create a predefined issuance schedule, Liberdus introduces a small set of adjustable network parameters overseen by the <a href="/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a>:
  </p>

  {/* Two-column layout for Adjustable Parameters */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 text-base/7 text-lightGrey">
    
    {/* Left Column */}
    <div>
      <h3 className="text-lg font-semibold">Transaction Fee ($)</h3>
      <p className="mt-2">
        This is the target fee for a token transfer transaction. The complexity of the transaction determines the actual fee paid.
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>Simple transactions (e.g., basic LIB transfers) cost less.</li>
        <li>More complex transactions (e.g., AMM interactions) cost more.</li>
        <li>Since all transaction fees are burned, adjusting this parameter can increase or decrease network income.</li>
        <li>This directly impacts whether the supply is inflationary, deflationary, or in equilibrium.</li>
      </ul>
            <h3 className="text-lg font-semibold mt-4">Node Reward ($/hr)</h3>
      <p className="mt-2">
        Defines the hourly earnings for each active validator node in the network, specified in USD but paid in LIB.
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>This parameter directly controls new LIB issuance, making the supply inflationary or deflationary.</li>
        <li>Increasing the node reward per hour allows the network to sustain more validator nodes, increasing the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a>.</li>
        <li>Decreasing the node reward per hour reduces the number of active nodes, decreasing the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a>.</li>
      </ul>
    </div>

    {/* Right Column */}
    <div>
      <h3 className="text-lg font-semibold ">Stake Amount ($)</h3>
      <p className="mt-2">
        The amount of LIB a node must stake to join the network. While specified in USD, it is staked in LIB at the stable price.
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>Some or all of the stake can be <a href="/faq#faq-10" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">slashed</a> if the node misbehaves or fails to process transactions efficiently.</li>
        <li>Adjusting this parameter impacts the APY% for node operators, making running a node more or less profitable.</li>
        <li>If running a node becomes more profitable, more nodes will join, increasing the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a>.</li>
        <li>If running a node becomes less profitable, fewer nodes will participate, reducing the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a>.</li>
      </ul>
    </div>
  </div>

  {/* Full-width: Effects on Supply within Capped Elastic Supply Model */}
  <h3 className="text-xl font-semibold text-purple mt-10">Effects on Supply</h3>
  <p className="mt-4">
    Understanding the relationship between transaction fees ($) and node rewards ($/hr) is essential to seeing how the capped elastic supply model enables token issuance to be flexible.
  </p>

  {/* Three States of Supply */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 text-base/7 text-lightGrey">
    
    {/* Inflation */}
    <div>
      <h3 className="text-lg font-semibold">Supply Inflation</h3>
      <p className="mt-2">
        <strong>Condition:</strong> Network Revenue &lt; Network Expenses
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>The network’s daily revenue from transaction fees is lower than its daily expenses.</li>
        <li>Not enough income is generated to cover the cost of operating validator nodes.</li>
        <li>The network issues more LIB than it burns, increasing the total circulating supply.</li>
      </ul>
    </div>

    {/* Deflation */}
    <div>
      <h3 className="text-lg font-semibold">Supply Deflation</h3>
      <p className="mt-2">
        <strong>Condition:</strong> Network Revenue &gt; Network Expenses
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>The network generates more income from transaction fees than needed to pay validators.</li>
        <li>Since all transaction fees are burned, the network becomes deflationary.</li>
        <li>The circulating LIB supply decreases over time.</li>
      </ul>
    </div>

    {/* Equilibrium */}
    <div>
      <h3 className="text-lg font-semibold">Supply Equilibrium</h3>
      <p className="mt-2">
        <strong>Condition:</strong> Network Revenue = Network Expenses
      </p>
      <ul className="list-disc space-y-2 list-inside mt-2">
        <li>The network operates in a balanced state where LIB issuance equals LIB burning.</li>
        <li>No inflation or deflation occurs; the supply remains stable.</li>
      </ul>
    </div>
  </div>
  </div>



{/* Model Simulations */}
<div className="mt-10 lg:col-span-2 border-l-4 border-purple py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
  <h2 className="text-xl font-semibold text-purple">Model Simulations</h2>
  <p className="mt-4">
    Simulations illustrate how these parameters influence network sustainability.
  </p>

  {/* First Row of Simulations */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 text-base/7 text-lightGrey items-stretch">
    
    {/* Left Column - Deflationary Scenario */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Deflationary Scenario</h3>
        <p className="mt-2">
          This simulation illustrates a scenario where the network generates more revenue from transaction fees than it spends on validator rewards. This creates a positive income delta, meaning more LIB is burned than issued.
        </p>
        <p className="mt-2">
          As a result, the LIB supply decreases over time, making the network deflationary. This outcome typically occurs when transaction volumes are high, leading to sustained deflationary pressure on the total supply.
        </p>
      </div>
      {/* Image container with fixed height on desktop */}
      <div className="mt-4 h-auto lg:h-[520px]">
        <img 
          src={paramSim1} 
          alt="Deflationary Scenario Simulation"
          className="w-full h-full object-fill rounded-lg shadow-md"
        />
      </div>
    </div>

    {/* Right Column - Equilibrium Scenario */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Supply Equilibrium Adjustments</h3>
        <p className="mt-2">
          This simulation demonstrates how adjusting a single <a href="/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a>-governed parameter can help the network maintain economic balance.
        </p>
        <p className="mt-2">
          For example, increasing the node reward from $1 to $1.20 per hour ensures that validator incentives remain sustainable while aligning issuance with network revenue. When transaction fees and validator expenses are balanced, the network reaches supply equilibrium, where the amount of LIB burned matches the amount issued.
        </p>
      </div>
      {/* Image container with fixed height on desktop */}
      <div className="mt-4 h-auto lg:h-[520px]">
        <img 
          src={paramSim2}
          alt="Equilibrium Scenario Simulation"
          className="w-full h-full object-fill rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>

  {/* Second Row of Simulations */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 text-base/7 text-lightGrey items-stretch">
    
    {/* Left Column - Inflationary Scenario */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Inflationary Scenario</h3>
        <p className="mt-2">
          This simulation explores how small changes to transaction fees ($) can shift the network into an inflationary state.
        </p>
        <p className="mt-2">
          If the transaction fee ($) is lowered, the network earns less revenue, requiring it to issue more LIB to sustain validator rewards. Over time, this causes the LIB supply to increase, leading to inflation. This highlights how careful fee adjustments are necessary to prevent excess token issuance.
        </p>
      </div>
      {/* Image container with fixed height on desktop */}
      <div className="mt-4 h-auto lg:h-[520px]">
        <img 
          src={paramSim3} 
          alt="Inflationary Scenario Simulation"
          className="w-full h-full object-fill rounded-lg shadow-md"
        />
      </div>
    </div>

    {/* Right Column - Supply Equilibrium Adjustments */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Supply Equilibrium Adjustments</h3>
        <p className="mt-2">
          This simulation demonstrates how the <a href="/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a> can restore network balance by fine-tuning transaction fee ($) and node reward ($/hr) parameters.
        </p>
        <p className="mt-2">
          By adjusting these values, the network can ensure that issuance does not exceed burning, keeping the LIB supply stable and sustainable. These dynamic adjustments help maintain long-term economic equilibrium, preventing uncontrolled inflation or deflation.
        </p>
      </div>
      {/* Image container with fixed height on desktop */}
      <div className="mt-4 h-auto lg:h-[520px]">
        <img 
          src={paramSim4}
          alt="Supply Equilibrium Adjustment"
          className="w-full h-full object-fill rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>

  {/* Link to Parameter Scenarios */}
  <div className="mt-6 text-center">
    <a 
      href="/parameters" 
      className="text-purple font-semibold hover:underline"
    >
      Run more parameter scenarios here →
    </a>
  </div>
</div>



{/* Full-width: Dynamic Simulations */}
<div className="mt-10 lg:col-span-2 border-l-4 border-purple py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
  <h2 className="text-xl font-semibold text-purple">Dynamic Simulations</h2>
  <p className="mt-4">
    To ensure the reliability of the capped elastic supply model, we conducted extensive simulations using historical price action and transaction volumes of various well-known Layer 1 networks.
  </p>
  <p className="mt-2">
    In every scenario, the model naturally found equilibrium (LIB burned = LIB issued) or required only minor adjustments to <a href="/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a>-overseen parameters to stabilize.
  </p>

  {/* Two-column layout for Simulation Results */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 text-base/7 text-lightGrey items-stretch">
    
    {/* Ethereum-Based Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Ethereum-Based Simulation</h3>
        <p className="mt-2">
          The figure below shows how Liberdus’s capped elastic supply model would have reacted if it followed Ethereum’s price action and transaction volumes.
        </p>
        <p className="mt-2">In the first 180 days, supply is highly inflationary as transaction volumes are low.</p>
        <p className="mt-2">From 180 to 600 days, network transactions steadily increase, slowing supply inflation.</p>
        <p className="mt-2">By 600 to 3000+ days, the supply naturally reaches equilibrium as the network matures.</p>
      </div>
      <div className="h-auto mt-4">
        <img src={paramSim5} alt="Ethereum-Based Simulation" className="w-full h-full object-cover rounded-lg shadow-md" />
      </div>
    </div>

    {/* BNB-Based Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">BNB-Based Simulation</h3>
        <p className="mt-2">
          The figure below shows how Liberdus’s capped elastic supply model would have reacted if it followed BNB’s price action and transaction volumes.
        </p>
        <p className="mt-2">In the first 150 days, the supply is highly inflationary as transaction volumes remain low.</p>
        <p className="mt-2">From 150 days to beyond 1600 days, the model gradually finds natural supply equilibrium.</p>
      </div>
      <div className="h-auto mt-4">
        <img src={paramSim6} alt="BNB-Based Simulation" className="w-full h-full object-cover rounded-lg shadow-md" />
      </div>
    </div>

    {/* Avalanche-Based Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Avalanche-Based Simulation</h3>
        <p className="mt-2">
          The figure below shows how Liberdus’s capped elastic supply model would have reacted if it followed Avalanche’s price action and transaction volumes.
        </p>
        <p className="mt-2">In the first 300 days, the supply is inflationary as transaction volumes remain low.</p>
        <p className="mt-2">From 300 to 650 days, as the price and transaction volumes increase, the supply finds natural equilibrium.</p>
        <p className="mt-2">From 650+ days, as the price decreases while transaction volumes increase, the supply becomes deflationary.</p>
      </div>
      <div className="h-auto mt-4">
        <img src={paramSim8} alt="Avalanche-Based Simulation" className="w-full h-full object-cover rounded-lg shadow-md" />
      </div>
    </div>

    {/* Avalanche Adjusted Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Avalanche Adjusted Simulation</h3>
        <p className="mt-2">
          The figure below shows how Liberdus’s capped elastic supply model reacts when the Node Reward ($/hr) is adjusted from $1 to $1.15.
        </p>
        <p className="mt-2">In this simulation, the first 600 days behave similarly to the non-adjusted simulation.</p>
        <p className="mt-2">After 600 days, due to the adjustment, the network avoids becoming deflationary and instead finds supply equilibrium.</p>
      </div>
      <div className="h-auto mt-4">
        <img src={paramSim7} alt="Avalanche Adjusted Simulation" className="w-full h-full object-cover rounded-lg shadow-md" />
      </div>
    </div>

     {/* Left Column - Cardano vs Near Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
       <h3 className="text-lg font-semibold">Cardano vs Near Simulation</h3>
        <p className="mt-2">
          The figure below shows how Liberdus’s capped elastic supply model reacts when it follows the price action of Cardano and transaction volumes of Near.
        </p>
        <p className="mt-2">
          Initially, from 0 to 600 days—as the price and transactions are low—the network is highly inflationary.
        </p>
        <p className="mt-2">
          From 600 to 1500+ days, the network finds supply equilibrium.
        </p>
        <p className="mt-2">
          The issue with this simulation is that the peak supply would exceed the 62m LIB max supply allocated to node operators.
        </p>
      </div>
      <div className="h-auto mt-4">
        <img 
          src={paramSim11} 
          alt="Cardano vs Near Simulation"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
    </div>

    {/* Right Column - Cardano vs Near Adjusted */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
         <h3 className="text-lg font-semibold">Cardano vs Near Simulation Adjusted</h3>
          <p className="mt-2">
            In this simulation, we adjusted the Tx Fee ($) from $0.01 to $0.005 and the Node Reward ($/hr) from $1 to $0.5.
          </p>
          <p className="mt-2">
            This change meant the max supply now only reached 61.83m and therefore does not exceed the 62m max supply allocated to node operators.
          </p>
      </div>
      <div className="h-auto mt-4">
        <img 
          src={paramSim12}
          alt="Cardano vs Near Simulation Adjusted"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
    </div>

    {/* Solana vs Sui Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Solana vs Sui Simulation</h3>
        <p className="mt-2">
          The figure below shows how Liberdus’s capped elastic supply model reacts when it follows the price action of Solana and the transaction volumes of Sui.
        </p>
        <p className="mt-2">For the first 60 days, the network is highly inflationary.</p>
        <p className="mt-2">After 60 days, transaction volumes explode, causing the network to become highly deflationary.</p>
        <p className="mt-2">By day 75, the supply would theoretically reach 0, as all the LIB would have been burned to operate the network.</p>
      </div>
      <div className="h-auto mt-4">
        <img src={paramSim13} alt="Solana vs Sui Simulation" className="w-full h-full object-cover rounded-lg shadow-md" />
      </div>
    </div>

    {/* Solana vs Sui Adjusted Simulation */}
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Solana vs Sui Simulation Adjusted</h3>
        <p className="mt-2">In this simulation, we adjusted the Node Reward ($/hr) from $1 to $1.5.</p>
        <p className="mt-2">This adjustment meant that as the network experienced higher transaction volumes after day 60, it issued more LIB, and therefore the network once again found supply equilibrium.</p>
      </div>
      <div className="h-auto mt-4">
        <img src={paramSim14} alt="Solana vs Sui Simulation Adjusted" className="w-full h-full object-cover rounded-lg shadow-md" />
      </div>
    </div>
  </div>

  {/* Link to Simulation Scenarios */}
  <div className="mt-6 text-center">
    <a href="/simulations" className="text-purple font-semibold hover:underline">
      Run more simulation scenarios here →
    </a>
  </div>
</div>



{/* Full-width: Conclusion and Key Findings */}
<div className="mt-10 lg:col-span-2 border-l-4 border-purple py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
  <h2 className="text-xl font-semibold text-purple">Key Findings and Conclusion</h2>
  <p className="mt-4">
    Through extensive simulations, we have validated that maintaining validator profitability, achieving supply equilibrium, and optimizing the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> are crucial for the long-term sustainability of Liberdus.
  </p>
  <p className="mt-2">
    The capped elastic supply model ensures dynamic adjustments to keep the network stable, scalable, and efficient.
  </p>

  {/* Two-column layout for key findings */}
  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 text-base/7 text-lightGrey">
    
    {/* Left Column */}
    <div>
      <h3 className="text-lg font-semibold">Ensuring Validator Profitability</h3>
      <p className="mt-2">
        Simulations confirm that validator profitability is essential for network stability. When profitability declines, the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a>(Standby-to-Active Nodes) drops, leading to fewer validators and reduced scalability.
      </p>
      <p className="mt-2">
        If profitability falls too low, increasing the node reward ($/hr) effectively restores participation and secures network operations.
      </p>

      <h3 className="text-lg font-semibold mt-6">Achieving Supply Equilibrium</h3>
      <p className="mt-2">
        The capped elastic supply model allows Liberdus to adjust issuance dynamically, ensuring supply remains balanced.
      </p>
      <p className="mt-2">
        Simulations demonstrated that modifying transaction fees ($) and node rewards ($/hr) can effectively correct imbalances between LIB issuance and burning, preventing inflationary or deflationary trends.
      </p>

      <h3 className="text-lg font-semibold mt-6">Maintaining a High S:A Ratio</h3>
      <p className="mt-2">
        A high <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> ensures decentralization and network robustness, but excessive standby validators can result in unnecessary token issuance.
      </p>
      <p className="mt-2">
        Our simulations demonstrated that reducing node rewards ($/hr) in such scenarios prevents excessive validator participation, keeping the network cost-efficient and optimized.
      </p>
    </div>

    {/* Right Column */}
    <div>
      <h3 className="text-lg font-semibold">Preventing Excessive Issuance</h3>
      <p className="mt-2">
        If the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> is too high, excess LIB issuance occurs, leading to resource inefficiencies.
      </p>
      <p className="mt-2">
        Simulations confirm that lowering the node reward ($/hr) in such cases prevents overspending and ensures token issuance remains sustainable.
      </p>

      <h3 className="text-lg font-semibold mt-6">Promoting Network Efficiency</h3>
      <p className="mt-2">
        The simulations highlight how adjusting the <a href="/faq#faq-12" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">S:A ratio</a> helps maintain validator efficiency under different market conditions.
      </p>
      <p className="mt-2">
        When transaction volumes spiked, the network risked excessive deflation. Increasing the node reward ($/hr) prevented extreme contraction, ensuring validator participation remained stable.
      </p>
      <p className="mt-2">
        Likewise, in inflationary conditions, adjusting transaction fees ($) stabilized LIB issuance, preventing excess token creation.
      </p>
      <p className="mt-2">
        These dynamic adjustments ensure that Liberdus remains scalable, cost-effective, and resistant to market volatility.
      </p>
    </div>
  </div>
</div>







        </div>
      </div>
    </div>
  );
}
